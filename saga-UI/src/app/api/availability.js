import axiosInstance from '../axios/axios';

export default function getAvailabilityData(){
    // let data = {
    //     months : ['jan', 'feb', 'march', 'april', 'may', 'june', 'july', 'august', 'sep'],
    //     availability : [95, 96, 92, 99, 99.8, 97, 93, 99.9, 95],
    //     expected : [99.9, 99.9, 99.9, 99.9, 99.9, 99.9, 99.9, 99.9, 99.9]
    // }

    // return new Promise(function(resolve){
	// 	return setTimeout(() => resolve(data), 100);
	// });
	return	axiosInstance.get('/availability?platform=Chat');
}