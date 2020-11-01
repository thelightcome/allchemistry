import React from 'react'

import'./PTable.css'

import {Loading} from './Loading'

export const PTable = (props) => {
	let render = props.render
	let banner = props.banner || (() => {return ""})
	let board = props.board || (() => {return ""})
	let elements = props.elements

	if (!props.elements.length) {
		return <Loading />
	}

	return (
		<table className="p-table">
			<tbody>
				{props.th && 
					<tr>
						<td></td>
						<td>1</td>
						<td>2</td>
						<td>3</td>
						<td>4</td>
						<td>5</td>
						<td>6</td>
						<td>7</td>
						<td>8</td>
						<td>9</td>
						<td>10</td>
						<td>11</td>
						<td>12</td>
						<td>13</td>
						<td>14</td>
						<td>15</td>
						<td>16</td>
						<td>17</td>
						<td>18</td>
					</tr>
				}
				<tr>
					{props.th && <td>1</td>}
					<td>{render(elements[0])}</td>
					<td></td>
					<td colSpan="10" rowSpan="3">{banner()}</td>
					<td colSpan="5"></td>
					<td>{render(elements[1])}</td>
				</tr>
				<tr>
					{props.th && <td>2</td>}
					<td>{render(elements[2])}</td>
					<td>{render(elements[3])}</td>
					<td>{render(elements[4])}</td>
					<td>{render(elements[5])}</td>
					<td>{render(elements[6])}</td>
					<td>{render(elements[7])}</td>
					<td>{render(elements[8])}</td>
					<td>{render(elements[9])}</td>
				</tr>
				<tr>
					{props.th && <td>3</td>}
					<td>{render(elements[10])}</td>
					<td>{render(elements[11])}</td>
					<td>{render(elements[12])}</td>
					<td>{render(elements[13])}</td>
					<td>{render(elements[14])}</td>
					<td>{render(elements[15])}</td>
					<td>{render(elements[16])}</td>
					<td>{render(elements[17])}</td>
				</tr>
				<tr>
					{props.th && <td>4</td>}
					<td>{render(elements[18])}</td>
					<td>{render(elements[19])}</td>
					<td>{render(elements[20])}</td>
					<td>{render(elements[21])}</td>
					<td>{render(elements[22])}</td>
					<td>{render(elements[23])}</td>
					<td>{render(elements[24])}</td>
					<td>{render(elements[25])}</td>
					<td>{render(elements[26])}</td>
					<td>{render(elements[27])}</td>
					<td>{render(elements[28])}</td>
					<td>{render(elements[29])}</td>
					<td>{render(elements[30])}</td>
					<td>{render(elements[31])}</td>
					<td>{render(elements[32])}</td>
					<td>{render(elements[33])}</td>
					<td>{render(elements[34])}</td>
					<td>{render(elements[35])}</td>
				</tr>
				<tr>
					{props.th && <td>5</td>}
					<td>{render(elements[36])}</td>
					<td>{render(elements[37])}</td>
					<td>{render(elements[38])}</td>
					<td>{render(elements[39])}</td>
					<td>{render(elements[40])}</td>
					<td>{render(elements[41])}</td>
					<td>{render(elements[42])}</td>
					<td>{render(elements[43])}</td>
					<td>{render(elements[44])}</td>
					<td>{render(elements[45])}</td>
					<td>{render(elements[46])}</td>
					<td>{render(elements[47])}</td>
					<td>{render(elements[48])}</td>
					<td>{render(elements[49])}</td>
					<td>{render(elements[50])}</td>
					<td>{render(elements[51])}</td>
					<td>{render(elements[52])}</td>
					<td>{render(elements[53])}</td>
				</tr>
				<tr>
					{props.th && <td>6</td>}
					<td>{render(elements[54])}</td>
					<td>{render(elements[55])}</td>
					<td></td>
					<td>{render(elements[71])}</td>
					<td>{render(elements[72])}</td>
					<td>{render(elements[73])}</td>
					<td>{render(elements[74])}</td>
					<td>{render(elements[75])}</td>
					<td>{render(elements[76])}</td>
					<td>{render(elements[77])}</td>
					<td>{render(elements[78])}</td>
					<td>{render(elements[79])}</td>
					<td>{render(elements[80])}</td>
					<td>{render(elements[81])}</td>
					<td>{render(elements[82])}</td>
					<td>{render(elements[83])}</td>
					<td>{render(elements[84])}</td>
					<td>{render(elements[85])}</td>
				</tr>
				<tr>
					{props.th && <td>7</td>}
					<td>{render(elements[86])}</td>
					<td>{render(elements[87])}</td>
					<td></td>
					<td>{render(elements[103])}</td>
					<td>{render(elements[104])}</td>
					<td>{render(elements[105])}</td>
					<td>{render(elements[106])}</td>
					<td>{render(elements[107])}</td>
					<td>{render(elements[108])}</td>
					<td>{render(elements[109])}</td>
					<td>{render(elements[110])}</td>
					<td>{render(elements[111])}</td>
					<td>{render(elements[112])}</td>
					<td>{render(elements[113])}</td>
					<td>{render(elements[114])}</td>
					<td>{render(elements[115])}</td>
					<td>{render(elements[116])}</td>
					<td>{render(elements[117])}</td>
				</tr>
				<tr className="table-board">
					{props.th && <td></td>}
					<td colSpan="18">{board()}</td>
				</tr>
				<tr>
					{props.th && <td></td>}
					<td colSpan="3" rowSpan="2"></td>
					<td>{render(elements[56])}</td>
					<td>{render(elements[57])}</td>
					<td>{render(elements[58])}</td>
					<td>{render(elements[59])}</td>
					<td>{render(elements[60])}</td>
					<td>{render(elements[61])}</td>
					<td>{render(elements[62])}</td>
					<td>{render(elements[63])}</td>
					<td>{render(elements[64])}</td>
					<td>{render(elements[65])}</td>
					<td>{render(elements[66])}</td>
					<td>{render(elements[67])}</td>
					<td>{render(elements[68])}</td>
					<td>{render(elements[69])}</td>
					<td>{render(elements[70])}</td>
				</tr>
				<tr>
					{props.th && <td></td>}
					<td>{render(elements[88])}</td>
					<td>{render(elements[89])}</td>
					<td>{render(elements[90])}</td>
					<td>{render(elements[91])}</td>
					<td>{render(elements[92])}</td>
					<td>{render(elements[93])}</td>
					<td>{render(elements[94])}</td>
					<td>{render(elements[95])}</td>
					<td>{render(elements[96])}</td>
					<td>{render(elements[97])}</td>
					<td>{render(elements[98])}</td>
					<td>{render(elements[99])}</td>
					<td>{render(elements[100])}</td>
					<td>{render(elements[101])}</td>
					<td>{render(elements[102])}</td>
				</tr>
			</tbody>
		</table>
	)
}