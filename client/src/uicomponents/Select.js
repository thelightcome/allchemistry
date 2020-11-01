import React, {useState} from 'react'

import './Select.css'

export const Select = (props) => {
	const [active, setActive] = useState(false)

	return (
		<div className={`select ${active ? 'active': ''}`} onMouseOver={() => setActive(true)} onMouseOut={() => setActive(false)}>
			<span className='selected'>{props.values[props.default]} {active ? <i className="fa fa-caret-up"></i>: <i className="fa fa-caret-down"></i>}</span>
			<div className='items'>
				{
					Object.entries(props.values).map((value) => {
						return <span key={value[0]} onClick={() => {props.setValue(value[0])}}>{value[1]}</span>
					})
				}
			</div>
		</div>
	)
}