import React, {useState, useContext} from 'react'

import './MainPage.css'

import {AuthContext} from '../../contexts/AuthContext'
import {useRequest} from '../../hooks/request.hook.js'

import {Loading} from '../../uicomponents/Loading'
import {Keyboard} from './Keyboard'

export const MainPage = (props) => {
	const auth = useContext(AuthContext)
	const [srcVal, setSrcVal] = useState("")
	const {loading, request, error, clearError} = useRequest()
	const [recMode, setRecMode] = useState(false)
	const [keyboard, setKeyboard] = useState(false)
	const [reactions, setReactions] = useState([])

	async function getReactions(e) {
		e.preventDefault()
		try {
			let result = await request(`/search?reagents=${encodeURIComponent(srcVal.replace(/\s/g, ''))}`)
			setReactions(result)
		}
		catch (e) {}
	}

	function parseReaction(val) {
		let [reagents, products] = val.split('=')
		reagents = reagents.split('+').map((elem) => {
			let index = elem.search(/[a-zA-Z]/)
			return {
				count: elem.slice(0, index).trim(),
				reagent: elem.slice(index).trim()
			}
		})
		products = products.split('+').map((elem) => {
			let index = elem.search(/[a-zA-Z]/)
			return {
				count: elem.slice(0, index).trim(),
				reagent: elem.slice(index).trim()
			}
		})
		return {reagents, products}
	}

	function unparseReaction(val) {
		let {reagents, products} = val
		reagents = reagents.map((elem) => {
			return elem.count + elem.reagent
		}).join("+")
		products = products.map((elem) => {
			return elem.count + elem.reagent
		}).join("+")
		return `${reagents}=${products}`
	}

	async function recReaction(e) {
		e.preventDefault()
		try {
			await request("/record", "POST", parseReaction(srcVal))
		}
		catch (e) {}
	}

	return (
		<div className="page">
			<div className="search-wrap">
				<div className="search">
					<input
						className={srcVal ? 'active': ''}
						type="text"
						value={srcVal}
						onChange={(e) => {setSrcVal(e.target.value)}}/>
					<label>Введите реагенты:</label>
					{srcVal && <span className="backspace" onClick={() => {setSrcVal(srcVal.split("").slice(0, -1).join(""))}}><i className="fa fa-arrow-left"></i></span>}
					{srcVal && <span className="clear" onClick={() => {setSrcVal("")}}><i className="fa fa-times"></i></span>}
				</div>
				{
					error ? (
						<div className="error">
							<button className="close-error" onClick={clearError}><i className="fa fa-times"></i></button>
							{error}
						</div>
					) : ""
				}
				<div className="btns">
					{
						auth.isAuthenticated ? (
							<button
								className={`btn res-mod-btn ${recMode ? 'active': ''}`}
								onClick={() => {setRecMode(!recMode)}}>
									<span className="alt">Режим записи</span>
								</button>
						) : ""
					}
					<button
						className="btn search-btn"
						onClick={recMode ? recReaction: getReactions}>{recMode ? "Записать" :"Поиск"}</button>
					<button
						className={`btn keyboard-btn ${keyboard ? 'active': ''}`}
						onClick={() => {setKeyboard(!keyboard)}}>
							<span className="alt">Клавиатура</span>
							<i className="fa fa-table"></i>
						</button>
				</div>
			</div>
			<div>
				{loading ? <Loading /> : (
					reactions.map((elem) => {
						return (
							<span key={elem._id} className="reactions">
								{
									unparseReaction(elem)
								}
							</span>
						)
					})
				)}
			</div>
			<Keyboard keyboard={keyboard} elements={props.elements} srcVal={srcVal} setSrcVal={setSrcVal} />
		</div>
	)
}