import React from 'react'

import './LineTableShow.css'

export const LineTableShow = (props) => {
	let element = props.element

	return (
		<div className="line-table-show">
			<h1><span>({element.symbol || ''})</span> {element.name || ''}</h1>
			{element.symbol && <img src={`/images/elements/${element.symbol}.jpg`} alt="Изображение отсутствует"/>}
			<span>{element.colour || ''}</span>
		</div>
	)
}