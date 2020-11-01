import React from 'react'

import {propDict} from '../propDict'

import './Table.css'

import {Loading} from '../../uicomponents/Loading'

export const Table = (props) => {
	let elements = props.elements

	if (elements.length === 0) {
		return <Loading />
	}

	return (
		<div className='table-wrap'>
			<table className='table'>
				<thead>
					<tr>
						{Object.keys(elements[0]).slice(1,).map((prop, index) => {
							return (<th key={`${index}-${prop}`}>{propDict[prop]}</th>)
						})}
					</tr>
				</thead>
				<tbody>
					{
						elements.map((elem) => {
							return (<tr key={elem.symbol}>
									{
										Object.entries(elem).slice(1,).map((prop, index) => {
											return (<td key={`${prop[0]} - ${index}`}>{prop[1]}</td>)
										})
									}
								</tr>)
						})
					}
				</tbody>
			</table>
		</div>
	)
}