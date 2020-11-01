import React from 'react'

import './Element.css'

export const Element = (props) => {
	let element = props.element
	let viewpprop = props.viewpprop
	let setHoverElementId = props.setHoverElementId

	return (
		<div
			className={`element ${viewpprop.vFamily ? element.family.replace(/ /g, '-'):element.block}`}
			data-id={element.number}
			onClick={(e) => {setHoverElementId(element.number)}}>
			<p>
				{viewpprop.vNumber && <span className='number'>{element.number}</span>}
				{viewpprop.vSymbol && <span className='symbol'>{element.symbol}</span>}
			</p>
			{viewpprop.selectFive && (viewpprop.selectFive === 'radioactive' ? (element[viewpprop.selectFive] === 'true' && <i className="fas fa-radiation"></i>): <span className='selectFive'>{element[viewpprop.selectFive]}</span>)}
			{viewpprop.selectTwo && <span className='selectTwo'>{element[viewpprop.selectTwo]}</span>}
			{viewpprop.selectThree && <span className='selectThree'>{element[viewpprop.selectThree]}</span>}
			{viewpprop.selectFour && <span className='selectFour'>{element[viewpprop.selectFour]}</span>}
			{viewpprop.selectOne && <span className='selectOne'>{element[viewpprop.selectOne]}</span>}
		</div>
	)
}
