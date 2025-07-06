import http from './httpClient';

export const getAllRequestsByEmployee = ( params = {}) =>
    http.get(`/request/employee`);

export const getAllRules = (params = {}) =>
    http.get(`/rules`, { params });

export const createReimbursementRequest = (formData) =>
    http.post('/request', formData);

export const editReimbursementRequest = (requestId, formData) =>
    http.put(`/request/${requestId}`, formData)

export const getAllEmployees = () =>
    http.get(`/employee`)

export const cancelRequest = (requestId) =>
    http.delete(`/request/${requestId}`)

export const loginUser = (loginRequest) =>
    http.post(`/auth/login`, loginRequest)

export const getRequestsForActioner = (params = {}) =>
    http.get('/request/actioner', {params})

export const rejectRequest = (requestId, actionData) =>
    http.post(`request/actions/${requestId}`, actionData)