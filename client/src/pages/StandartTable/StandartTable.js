import React, {useState} from 'react'

import {propDict} from '../propDict'

import './StandartTable.css'

import {Select} from '../../uicomponents/Select'
import {PTable} from '../../uicomponents/PTable'
import {ShowHoverElement} from './ShowHoverElement'
import {BBoard} from './BBoard'
import {FBoard} from './FBoard'
import {Element} from './Element'

export const StandartTable = (props) => {
	const [vNumber, setVNumber] = useState(true)
	const [vSymbol, setVSymbol] = useState(true)
	const [selectOne, setSelectOne] = useState('name')
	const [selectTwo, setSelectTwo] = useState('null')
	const [selectThree, setSelectThree] = useState('null')
	const [selectFour, setSelectFour] = useState('null')
	const [selectFive, setSelectFive] = useState('null')
	const [vState, setVState] = useState(false)
	const [vFamily, setVFamily] = useState(false)

	const [hoverElementId, setHoverElementId] = useState(null)

	const viewprop = {vNumber, vSymbol, selectOne, selectTwo, selectThree, selectFour, selectFive, vState, vFamily}

	return (
		<div className='page'>
			<div className={`prop-btn-group`}>
				<button className={vNumber ? 'active': ''} onClick={() => setVNumber(!vNumber)}>№</button>
				<button className={vSymbol ? 'active': ''} onClick={() => setVSymbol(!vSymbol)}>Символ</button>
				<button className={!vFamily ? 'active': ''} onClick={() => setVFamily(false)}>Блок</button>
				<button className={vFamily ? 'active': ''} onClick={() => setVFamily(true)}>Семейство</button>
				<button className={vState ? 'active': ''} onClick={() => setVState(!vState)}>Состояние вещества</button>
				<Select
					values={{
						'name': propDict['name'],
						'latinName': propDict['latinName'],
						'discoverer': propDict['discoverer'],
						'year': propDict['year'],
						'CASnumber': propDict['CASnumber']
					}}
					default={selectOne}
					setValue={setSelectOne}/>
				<Select
					values={{
						'null': 'Не выбрано',
						'mass': propDict['mass'],
						'radius': propDict['radius'],
						'covradius': propDict['covradius'],
						'VDWradius': propDict['VDWradius'],
						'density': propDict['density'],
						'liquidDensity': propDict['liquidDensity'],
						'mohsHardness': propDict['mohsHardness'],
						'bulkModulus': propDict['bulkModulus'],
						'shearModulus': propDict['shearModulus'],
						'youngModulusElasticity': propDict['youngModulusElasticity']
					}}
					default={selectTwo}
					setValue={setSelectTwo}/>
				<Select
					values={{
						'null': 'Не выбрано',
						'oxidationStates': propDict['oxidationStates'],
						'boiling': propDict['boiling'],
						'melting': propDict['melting'],
						'molarHeatFusion': propDict['molarHeatFusion'],
						'specificHeat': propDict['specificHeat'],
						'thermalExpansionCoefficient': propDict['thermalExpansionCoefficient'],
						'molarHeatVaporization': propDict['molarHeatVaporization'],
						'molarVolume': propDict['molarVolume'],
						'refractiveIndex': propDict['refractiveIndex'],
						'soundSpeed': propDict['soundSpeed'],
						'coefficientThermalConductivity': propDict['coefficientThermalConductivity']
					}}
					default={selectThree}
					setValue={setSelectThree}/>
				<Select
					values={{
						'null': 'Не выбрано',
						'electricType': propDict['electricType'],
						'specificElectricalConductivity': propDict['specificElectricalConductivity'],
						'bulkMagneticSusceptibility': propDict['bulkMagneticSusceptibility'],
						'magneticType': propDict['magneticType'],
						'specificMagneticSusceptibility': propDict['specificMagneticSusceptibility'],
						'molarMagneticSusceptibility': propDict['molarMagneticSusceptibility'],
						'resistivity': propDict['resistivity'],
						'electronegativity': propDict['electronegativity'],
						'valence': propDict['valence'],
						'energyAffinityAtomElectron': propDict['energyAffinityAtomElectron'],
						'firstIonizationEnergy': propDict['firstIonizationEnergy'],
						'ionCharge': propDict['ionCharge']
					}}
					default={selectFour}
					setValue={setSelectFour}/>
				<Select
					values={{
						'null': 'Не выбрано',
						'radioactive': propDict['radioactive'],
						'halfLife': propDict['halfLife'],
						'lifetime': propDict['lifetime'],
						'nuclearEffectiveCrossSection': propDict['nuclearEffectiveCrossSection'],
						'decayType': propDict['decayType']
					}}
					default={selectFive}
					setValue={setSelectFive}/>
			</div>
			<div className='st-table'>
				<PTable
					th={true}
					elements={props.elements}
					banner={() => {
						return <ShowHoverElement
									element={hoverElementId ? props.elements[hoverElementId - 1]:null} />
					}}
					board={() => {
						return vFamily ? <FBoard />: <BBoard />
					}}
					render={((element) => {
						return <Element
							setHoverElementId={setHoverElementId}
							viewpprop={viewprop}
							element={element} />
					})} />
			</div>
		</div>
	)
}