import React, {useState} from 'react'

import './Key.css'

export const Key = (props) => {
	const [color, setColor] = useState(false)
	return (
		<div
			className={`key ${color ? props.element.family.replace(/ /g, '-') : ''}`}
			onMouseOver={() => {setColor(true)}}
			onMouseOut={() => {setColor(false)}}
			id={props.element.id}
			data-value={props.element.symbol}
			onClick={(e) => {props.setSrcVal(props.srcVal + e.target.dataset.value)}}>
				{props.element.symbol}
		</div>
	)
}