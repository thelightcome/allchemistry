import React, {useState, useEffect} from 'react'

import './LineTable.css'

import {Loading} from '../../uicomponents/Loading'
import {LineTableShow} from './LineTableShow'

export const LineTable = (props) => {
	const [showElement, setShowElement] = useState(0)
	const [autoScrollId, setAutoScrollId] = useState(null)
	let elements = props.elements

	useEffect(() => {
		document.addEventListener('keydown', sliderMove)

		return () => {
			document.removeEventListener('keydown', sliderMove)
		}
	})

	function sliderMove(e) {
		if (e.keyCode === 39) {
			if (showElement < elements.length - 1) {
				setShowElement(showElement + 1)
			}
		}
		else if (e.keyCode === 37) {
			if (showElement) {
				setShowElement(showElement - 1)
			}
		}
	}

	function autoScroll(elem, direction, setAutoScrollId) {
		let a = requestAnimationFrame(function repeat() {
			if (direction < 0 && elem.scrollLeft < 0) {
				return elem.scrollLeft = 0;
			}
			else if (direction > 0 && elem.scrollLeft > elem.scrollWidth - elem.clientWidth) {
				return elem.scrollLeft = elem.scrollWidth - elem.clientWidth;
			}
			else {
				elem.scrollLeft += direction
			}
			a = requestAnimationFrame(repeat)
			setAutoScrollId(a)
		})
	}

	if (elements.length === 0) {
		return <Loading />
	}

	return (
		<div className="page">
			<div className="line-table-top">
				<LineTableShow element={elements[showElement]} />
			</div>
			<div className="line-table-bottom">
				<ul className="line-table-list"
				    onMouseMove={(e) => {
						let coor = e.currentTarget.getBoundingClientRect()
						if (e.clientX < coor.left + 50) {
							if (autoScrollId) return
							autoScroll(e.currentTarget, -5, setAutoScrollId)
						}
						else if (e.clientX > coor.right - 50) {
							if (autoScrollId) return
							autoScroll(e.currentTarget, 5, setAutoScrollId)
						}
						else {
							cancelAnimationFrame(autoScrollId)
							setAutoScrollId(null)
						}
					}}
					onMouseLeave={(e) => {
						cancelAnimationFrame(autoScrollId)
						setAutoScrollId(null)
					}}>
						{elements.map((elem, index) => {
							return (
								<li className={elem.family && elem.family.replace(/ /g, '-')} key={elem.name} data-id={elem.number - 1} onClick={(e) => {setShowElement(e.currentTarget.dataset.id)}}>
									<span>{elem.number}</span>
									<span>{elem.symbol}</span>
									<span>{elem.name}</span>
								</li>
							)
						})}
				</ul>
			</div>
		</div>
	)
}