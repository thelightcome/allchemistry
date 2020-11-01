import React from 'react'

import './Keyboard.css'

import {PTable} from '../../uicomponents/PTable'
import {Calc} from './Calc'
import {Key} from './Key'

export const Keyboard = (props) => {
	return (
		<div className={`keyboard + ${props.keyboard ? "active" : ""}`}>
			<PTable
				th={false}
				elements={props.elements}
				render={((element) => {
					return <Key
						element={element}
						srcVal={props.srcVal}
						setSrcVal={props.setSrcVal} />
				})} />
			<Calc srcVal={props.srcVal} setSrcVal={props.setSrcVal} />
		</div>
	)
}
