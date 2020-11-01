import React from 'react'

import './Calc.css'

export const Calc = (props) => {

	return (
		<div className="calc">
			<div>
				<span data-value="0" onClick={(e) => {props.setSrcVal(props.srcVal + e.target.dataset.value)}}>{"0"}</span>
				<span data-value="1" onClick={(e) => {props.setSrcVal(props.srcVal + e.target.dataset.value)}}>{"1"}</span>
				<span data-value="2" onClick={(e) => {props.setSrcVal(props.srcVal + e.target.dataset.value)}}>{"2"}</span>
				<span data-value="3" onClick={(e) => {props.setSrcVal(props.srcVal + e.target.dataset.value)}}>{"3"}</span>
				<span data-value="4" onClick={(e) => {props.setSrcVal(props.srcVal + e.target.dataset.value)}}>{"4"}</span>
				<span data-value="5" onClick={(e) => {props.setSrcVal(props.srcVal + e.target.dataset.value)}}>{"5"}</span>
				<span data-value="6" onClick={(e) => {props.setSrcVal(props.srcVal + e.target.dataset.value)}}>{"6"}</span>
				<span data-value="7" onClick={(e) => {props.setSrcVal(props.srcVal + e.target.dataset.value)}}>{"7"}</span>
				<span data-value="8" onClick={(e) => {props.setSrcVal(props.srcVal + e.target.dataset.value)}}>{"8"}</span>
				<span data-value="9" onClick={(e) => {props.setSrcVal(props.srcVal + e.target.dataset.value)}}>{"9"}</span>
			</div>
			<div>
				<span data-value="(" onClick={(e) => {props.setSrcVal(props.srcVal + e.target.dataset.value)}}>{"("}</span>
				<span data-value=")" onClick={(e) => {props.setSrcVal(props.srcVal + e.target.dataset.value)}}>{")"}</span>
				<span data-value="{" onClick={(e) => {props.setSrcVal(props.srcVal + e.target.dataset.value)}}>{"{"}</span>
				<span data-value="}" onClick={(e) => {props.setSrcVal(props.srcVal + e.target.dataset.value)}}>{"}"}</span>
				<span data-value="[" onClick={(e) => {props.setSrcVal(props.srcVal + e.target.dataset.value)}}>{"["}</span>
				<span data-value="]" onClick={(e) => {props.setSrcVal(props.srcVal + e.target.dataset.value)}}>{"]"}</span>
				<span data-value="+" onClick={(e) => {props.setSrcVal(props.srcVal + e.target.dataset.value)}}>{"+"}</span>
				<span data-value="=" onClick={(e) => {props.setSrcVal(props.srcVal + e.target.dataset.value)}}>{"="}</span>
			</div>
		</div>
	)
}