import axiosInstance from '../axios/axios';

export function getChatFunnelData() {
    return axiosInstance.get('/chatFunnel/clients');
}

