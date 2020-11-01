import React from 'react'

import './Boards.css'

export const BBoard = (props) => {
	return (
		<div className='boards'>
			<div>
				<span className='s'></span> S элементы
			</div>
			<div>
				<span className='p'></span> P элементы
			</div>
			<div>
				<span className='d'></span> D элементы
			</div>
			<div>
				<span className='f'></span> F элементы
			</div>
		</div>
	)
}