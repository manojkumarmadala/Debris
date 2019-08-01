import axiosInstance from '../axios/axios';

export function getRevenueData(){
	return	axiosInstance.get('/revenue?Month=august,september,october');
}