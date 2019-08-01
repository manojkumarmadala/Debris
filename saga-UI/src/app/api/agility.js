import axiosInstance from '../axios/axios';

export default function getAgilityData(teamId, numberOfRecords){
	if(teamId === undefined)
		teamId = 1;
	if(numberOfRecords === undefined){
		numberOfRecords = 5;
	}
	return axiosInstance.get(`/agility?teamId=${teamId}&numberOfRecords=${numberOfRecords}`);
}