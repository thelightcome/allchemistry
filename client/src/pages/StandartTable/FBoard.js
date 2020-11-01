import React from 'react'

import './Boards.css'

export const FBoard = (props) => {
	return (
		<div className='boards'>
			<div>
				<span className='alkali-metals'></span> Щелочные<br/> металлы
			</div>
			<div>
				<span className='alkaline-earth-metals'></span> Щёлочноземельные<br/> металлы
			</div>
			<div>
				<span className='transition-metals'></span> Переходные<br/> металлы
			</div>
			<div>
				<span className='post-transition-metals'></span> Постпереходные<br/> металлы
			</div>
			<div>
				<span className='semimetals'></span> Полуметаллы<br/> металлоиды
			</div>
			<div>
				<span className='non-metals'></span> Не металлы
			</div>
			<div>
				<span className='halogens'></span> Галогены
			</div>
			<div>
				<span className='inert-gases'></span> Благородные<br/> газы
			</div>
			<div>
				<span className='lanthanides'></span> Лантаноиды
			</div>
			<div>
				<span className='actinides'></span> Актиноиды
			</div>
		</div>
	)
}

								