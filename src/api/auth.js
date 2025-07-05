import axiosClient from './axios';

export const signup = (data) => {
  return axiosClient.post('/api/auth/signup', data);
};

export const verifyOtp = (email, otp) => {
  return axiosClient.post('/api/auth/verify', null, {
    params: { email, otp },
  });
};
export const login = (data) => {
  return axiosClient.post('/api/auth/login', data);
};
