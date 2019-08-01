import axiosInstance from '../axios/axios';

export function getPersonweeksData(pillar) {
	return axiosInstance.get('/personweeks?pillar='+pillar);
}

export function postPersonweeksData(data){
	return axiosInstance.post('/personweeks',data);
}