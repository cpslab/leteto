import axios from 'axios';
import Cookies from 'js-cookie';
import { AuthenticatedUser } from '../auth/AuthProvider';
import * as entity from '../entity';
import * as serviceTypes from './service-types';

// create http instance
const service_url =
  process.env.NODE_ENV === 'production'
    ? 'https://leteto.herokuapp.com/'
    : 'http://127.0.0.1:8000/';
const csrfToken = Cookies.get('csrftoken');
const http = axios.create({
  baseURL: service_url,
  headers: {
    'content-type': 'application/json;charset=utf-8',
    'x-csrftoken': csrfToken,
  },
  withCredentials: true,
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
}: serviceTypes.SignInRequest): Promise<AuthenticatedUser> => {
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
}: serviceTypes.SignUpRequest): Promise<AuthenticatedUser> => {
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
export const signout = async (): Promise<boolean> => {
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
export const getCurrentUser = async (): Promise<AuthenticatedUser> => {
  const result = await http.get<AuthenticatedUser>('api/v1/auth/user/');
  if ('data' in result && result.data) {
    const data = result.data;
    return data;
  }
  throw new Error('No User');
};

// Handson Service
/**
 * Get handsonlist
 * api/v1/handsons
 */
export const getHandsons = async (
  request?: serviceTypes.GetHandsonsRequest
): Promise<entity.Handson[]> => {
  const result = await http.get<serviceTypes.GetHandsonsResponse>(
    'api/v1/handsons/'
  );
  if ('data' in result && result.data) {
    const data = result.data;
    return data;
  }
  throw new Error('Invalid');
};

/**
 * Create handson
 * api/v1/handsons
 */
export const createHandson = async (
  request: serviceTypes.CreateHandsonRequest
): Promise<Omit<entity.HandsonDetailWrite, 'owner'>> => {
  const result = await http.post<serviceTypes.CreateHandsonResponse>(
    'api/v1/handsons/',
    request
  );
  if ('data' in result && result.data) {
    const data = result.data as serviceTypes.CreateHandsonResponse;
    return data;
  }
  throw new Error('Invalid');
};

/**
 * Get handson Detail
 * api/v1/handsons/:id
 */
export const getHandson = async (
  request: serviceTypes.GetHandsonPageRequest
): Promise<entity.HandsonDetail> => {
  const result = await http.get<serviceTypes.GetHandsonPageResponse>(
    'api/v1/handsons/' + request.id
  );
  if ('data' in result && result.data) {
    const data = result.data as serviceTypes.GetHandsonPageResponse;
    return data;
  }
  throw new Error('Invalid');
};

/**
 * Update handson
 * api/v1/handsons/:id
 */
export const updateHandson = async (
  request: serviceTypes.UpdateHandsonRequest
): Promise<Omit<entity.HandsonDetailWrite, 'owner'>> => {
  const result = await http.put<serviceTypes.UpdateHandsonResponse>(
    'api/v1/handsons/' + request.id,
    request
  );
  if ('data' in result && result.data) {
    const data = result.data as serviceTypes.UpdateHandsonResponse;
    return data;
  }
  throw new Error('Invalid');
};

/**
 * Delete handson
 * api/v1/handsons/:id
 */
export const deleteHandson = async (
  request: serviceTypes.DeleteHandsonRequest
): Promise<boolean> => {
  const result = await http.delete('api/v1/handsons/' + request.id);
  if ('status' in result && result.status === 200) {
    return true;
  }
  return false;
};

// Handson Member Service
/**
 * Get handson member
 * api/v1/handsons/:handsonId/members
 */
export const getHandsonMembers = async (
  request: serviceTypes.GetHandsonMembersRequest
): Promise<entity.HandsonMember[]> => {
  const result = await http.get<serviceTypes.GetHandsonMembersResponse>(
    'api/v1/handsons/' + request.handson + '/members'
  );
  if ('data' in result && result.data) {
    const data = result.data as serviceTypes.GetHandsonMembersResponse;
    return data;
  }
  throw new Error('Invalid');
};

/**
 * Add handson member
 * api/v1/handsons/:handsonId/members
 */
export const addHandsonMember = async (
  request: serviceTypes.AddHandsonMemberRequest
): Promise<Omit<entity.HandsonMember, 'member'>> => {
  const result = await http.post<serviceTypes.AddHandsonMemberResponse>(
    'api/v1/handsons/' + request.handson + '/members',
    request
  );
  if ('data' in result && result.data) {
    const data = result.data as serviceTypes.AddHandsonMemberResponse;
    return data;
  }
  throw new Error('Invalid');
};

/**
 * Delete handson member
 * api/v1/handsons/:handsonId/members/:id
 */
export const deleteHandsonMember = async (
  request: serviceTypes.DeleteHandsonMemberRequest
): Promise<boolean> => {
  const result = await http.delete(
    'api/v1/handsons/' + request.handson + '/members/' + request.id
  );
  if ('status' in result && result.status === 200) {
    return true;
  }
  return false;
};

// Handson Content Service
/**
 * Get handson content
 * api/v1/handsons/:handsonId/contents
 */
export const getHandsonContents = async (
  request: serviceTypes.GetHandsonContentsRequest
): Promise<entity.HandsonContent[]> => {
  const result = await http.get<serviceTypes.GetHandsonContentsResponse>(
    'api/v1/handsons/' + request.handson + '/contents'
  );
  if ('data' in result && result.data) {
    const data = result.data as serviceTypes.GetHandsonContentsResponse;
    return data;
  }
  throw new Error('Invalid');
};

/**
 * Create handson content
 * api/v1/handsons/:handsonId/contents
 */
export const createHandsonContent = async (
  request: serviceTypes.CreateHandsonContentRequest
): Promise<entity.HandsonContentWrite> => {
  const result = await http.post<serviceTypes.CreateHandsonContentResponse>(
    'api/v1/handsons/' + request.handson + '/contents',
    request
  );
  if ('data' in result && result.data) {
    const data = result.data as serviceTypes.CreateHandsonContentResponse;
    return data;
  }
  throw new Error('Invalid');
};

/**
 * Update handson content
 * api/v1/handsons/:handsonId/contents
 */
export const updateHandsonContent = async (
  request: serviceTypes.UpdateHandsonContentRequest
): Promise<entity.HandsonContentWrite> => {
  const result = await http.put<serviceTypes.UpdateHandsonContentResponse>(
    'api/v1/handsons/' + request.handson + '/contents/' + request.id,
    request
  );
  if ('data' in result && result.data) {
    const data = result.data as serviceTypes.UpdateHandsonContentResponse;
    return data;
  }
  throw new Error('Invalid');
};

/**
 * Delete handson content
 * api/v1/handsons/:handsonId/contents/:id
 */
export const deleteHandsonContent = async (
  request: serviceTypes.DeleteHandsonContentRequest
): Promise<boolean> => {
  const result = await http.delete(
    'api/v1/handsons/' + request.handson + '/contents/' + request.id
  );
  if ('status' in result && result.status === 200) {
    return true;
  }
  return false;
};

// Content Pass Member Service
/**
 * Get content pass members
 * api/v1/handsons/:handsonId/contents/:contentId/completion
 */
export const getContentPassMembers = async (
  request: serviceTypes.GetContentPassMembersRequest
): Promise<entity.PassedContentMember[]> => {
  const result = await http.get<serviceTypes.GetContentPassMemberResponse>(
    'api/v1/handsons/' +
      request.handson +
      '/contents/' +
      request.content +
      '/completion'
  );
  if ('data' in result && result.data) {
    const data = result.data as serviceTypes.GetContentPassMemberResponse;
    return data;
  }
  throw new Error('Invalid');
};

/**
 * Add content pass member
 * api/v1/handsons/:handsonId/contents/:contentId/completion
 */
export const addContentPassMember = async (
  request: serviceTypes.AddContentPassMemberRequest
): Promise<entity.PassedContentMemberWrite> => {
  const result = await http.post<serviceTypes.AddContentPassMemberResponse>(
    'api/v1/handsons/' +
      request.handson +
      '/contents/' +
      request.content +
      '/completion',
    request
  );
  if ('data' in result && result.data) {
    const data = result.data as serviceTypes.AddContentPassMemberResponse;
    return data;
  }
  throw new Error('Invalid');
};

/**
 * Delete handson content
 * api/v1/handsons/:handsonId/contents/:id
 */
export const deleteContentPassMember = async (
  request: serviceTypes.DeleteContentPassMemberRequest
): Promise<boolean> => {
  const result = await http.delete(
    'api/v1/handsons/' +
      request.handson +
      '/contents/' +
      request.content +
      '/completion/' +
      request.id
  );
  if ('status' in result && result.status === 200) {
    return true;
  }
  return false;
};
