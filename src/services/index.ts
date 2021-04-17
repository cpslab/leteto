import axios from 'axios';
import Cookies from 'js-cookie';
import * as serviceTypes from './service-types';

// create http instance
const service_url = process.env.SERVICE_URL;
const csrfToken = Cookies.get('csrftoken');
const http = axios.create({
  baseURL: service_url,
  headers: {
    'content-type': 'application/json;charset=utf-8',
    'x-csrftoken': csrfToken,
  },
});

// Authorization Service
/**
 * Sign In
 * api/v1/auth/login/
 */
export const signin = async ({
  username,
  email,
  password,
}: serviceTypes.SignInRequest) => {
  const result = await http.post<serviceTypes.SignInResponse>(
    'api/v1/auth/login/',
    {
      username,
      email,
      password,
    }
  );
  if ('data' in result && result.data) {
    const data = result.data as serviceTypes.SignInResponse;
    return data.user;
  }
  throw new Error('Invalid');
};

/**
 * Sign Up
 * api/v1/auth/registration/
 */
export const signup = async ({
  username,
  email,
  password,
  repassword,
}: serviceTypes.SignUpRequest) => {
  const result = await http.post<serviceTypes.SignUpResponse>(
    'api/v1/auth/registration/',
    {
      username,
      email,
      password1: password,
      password2: repassword,
    }
  );
  if ('data' in result && result.data) {
    const data = result.data as serviceTypes.SignUpResponse;
    return data.user;
  }
  throw new Error('Invalid');
};

/**
 * Sign out
 * api/v1/auth/logout/
 */
export const signout = async () => {
  const result = await http.post('api/v1/auth/logout/');
  if ('status' in result && result.status === 200) {
    return true;
  }
  return false;
};

/**
 * Get Current User
 * api/v1/auth/user/
 */
export const getCurrentUser = async () => {
  const result = await http.get<serviceTypes.User>('api/v1/auth/user/');
  if ('data' in result && result.data) {
    const data = result.data;
    return data;
  }
  throw new Error('No User');
};
