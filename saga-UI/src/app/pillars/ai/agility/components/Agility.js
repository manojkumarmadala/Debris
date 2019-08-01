import React from 'react';
import AgilityCore from '../../../../agility/containers/Agility';

export default function Agility(){
	let teams = [
		{
			'id': 9,
			'name': 'SpeechPlatformCentral'
		}, {
			'id': 10,
			'name': 'SpeechAnalytics'
		}, {
			'id': 11,
			'name': 'VividSpeech'
		}, {
			'id': 12,
			'name': 'SpeechPods'
		}, {
			'id': 13,
			'name': 'SpeechWeb'
		}, {
			'id': 14,
			'name': 'AivaVPA'
		}, {
			'id': 15,
			'name': 'Messaging'
		}, {
			'id': 16,
			'name': 'Mobile'
		},
		{
			'id': 17,
			'name': 'UDE'
		},
		{
			'id': 18,
			'name': 'SpectrumVA'
		},
		{
			'id': 19,
			'name': 'GoldVA'
		},
		{
			'id': 20,
			'name': 'LogExplorer'
		},
		{
			'id': 21,
			'name': 'AIVATools'
		}, {
			'id': 22,
			'name': 'NLTools'
		}
	];
	let numberOfRecords = 5;
	teams = teams.sort(function(a, b){
		if(a.name < b.name) { return -1; }
		if(a.name > b.name) { return 1; }
		return 0;
	});
	let selectedTeam = teams[0];
	return <AgilityCore selectedTeam={selectedTeam} numberOfRecords={numberOfRecords} teams={teams}></AgilityCore>;
}