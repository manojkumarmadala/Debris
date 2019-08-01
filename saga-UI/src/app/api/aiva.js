import axiosInstance from '../axios/axios';

export function getAivaFunnelData() {
	return axiosInstance.get('/aivaFunnel/clients');
}