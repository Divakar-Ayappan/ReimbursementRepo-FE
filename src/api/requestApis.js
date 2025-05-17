import http from './httpClient';

export const getAllRequestsByEmployee = (employeeId, params = {}) =>
    http.get(`/request/employee/${employeeId}`, {params});

export const getAllRules = (params = {}) =>
    http.get(`/rules`, { params });

export const createReimbursementRequest = (formData) =>
    http.post('/request', formData);

export const getAllEmployees = () =>
    http.get(`/employee`)