import React from 'react';
import AgilityCore from '../../../../agility/containers/Agility';
import SideNav from '../../SideNav';

export default function Agility(){
	let teams = [
		{
			'id': 1,
			'name': 'Chat team 1'
		}, {
			'id': 2,
			'name': 'Chat team 2'
		}, {
			'id': 3,
			'name': 'Chat team 3'
		}, {
			'id': 4,
			'name': 'ACS Client Commit'
		}, {
			'id': 5,
			'name': 'Assited Initiatives'
		}, {
			'id': 6,
			'name': 'Assist Ops'
		}, {
			'id': 7,
			'name': 'Central'
		}, {
			'id': 8,
			'name': 'Active Share'
		}
	];
	let selectedTeam = teams[0];
	let numberOfRecords = 5;
	return (
		<div>
			{/* <SideNav /> */}
			<AgilityCore selectedTeam={selectedTeam} numberOfRecords={numberOfRecords} teams={teams}></AgilityCore>
		</div>
	);
}