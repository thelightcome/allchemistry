import React from 'react'

import './ShowHoverElement.css'

import {propDict} from '../propDict'

export const ShowHoverElement = (props) => {
	let element = props.element

	if (!element) {
		return (<div className="show-hover-element"></div>)
	}
	return (
		<div className='show-hover-element'>
			<div className={`h-symbol ${element.family.replace(/ /g, '-')}`}>
				<span>{element.number}</span>
				{element.symbol}
				<span>{element.name}</span>
			</div>
			<div className='properties'>
				{Object.entries(propDict).filter((elem, index) => {
					if (element[elem[0]]) return true
					else return false
				}).map((elem, index) => {
					return (
						<p className="props" key={'elem[1]' + index}>
							<span className="prop-title">{elem[1]}:</span>
							<span className="prop-value">{element[elem[0]]}</span>
						</p>
					)
				})}
			</div>
		</div>
	)
}
