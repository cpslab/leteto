import { AuthenticatedUser } from '../auth/AuthProvider';
import {
  Handson,
  HandsonDetail,
  HandsonDetailWrite,
  HandsonMember,
  HandsonContent,
  HandsonContentWrite,
  PassedContentMember,
  PassedContentMemberWrite,
} from '../entity';

/**
 * Auth
 */
export type SignInRequest = {
  username: string;
  email?: string;
  password: string;
};

export type SignInResponse = {
  access_token: string;
  refresh_token: string;
  user: AuthenticatedUser;
};

export type SignUpRequest = {
  username: string;
  email: string;
  password: string;
  repassword: string;
};

export type SignUpResponse = {
  access_token: string;
  refresh_token: string;
  user: AuthenticatedUser;
};

export type GetCurrentUserResponse = {
  user: AuthenticatedUser;
};

/**
 * Handson
 */
export type GetHandsonsRequest = {
  status?: 'future' | 'past' | 'open';
  owner?: string;
  join?: string;
};

export type GetHandsonsResponse = Handson[];

export type GetHandsonPageRequest = {
  id: number;
};

export type GetHandsonPageResponse = HandsonDetail;

export type CreateHandsonRequest = {
  title: string;
  headline?: string;
  detail?: string;
  require?: string;
  document_url?: string;
  meeting_url: string;
  movie_url?: string;
  start_at: string;
  end_at: string;
  is_public: boolean;
};

export type CreateHandsonResponse = Omit<HandsonDetailWrite, 'owner'>;

export type UpdateHandsonRequest = {
  id: number;
  title: string;
  headline: string;
  detail: string;
  require: string;
  document_url: string;
  meeting_url: string;
  movie_url: string;
  start_at: string;
  end_at: string;
  is_public: boolean;
};

export type UpdateHandsonResponse = Omit<HandsonDetailWrite, 'owner'>;

export type DeleteHandsonRequest = {
  id: number;
};

/**
 * Handson Member
 */
export type GetHandsonMembersRequest = {
  handson: number;
};

export type GetHandsonMembersResponse = HandsonMember[];

export type AddHandsonMemberRequest = {
  handson: number;
};

export type AddHandsonMemberResponse = Omit<HandsonMember, 'member'>;

export type DeleteHandsonMemberRequest = {
  handson: number;
  id: number;
};

/**
 * Handson Content
 */
export type GetHandsonContentsRequest = {
  handson: number;
};

export type GetHandsonContentsResponse = HandsonContent[];

export type CreateHandsonContentRequest = {
  handson: number;
  content: string;
};

export type CreateHandsonContentResponse = HandsonContentWrite;

export type UpdateHandsonContentRequest = {
  id: number;
  handson: number;
  content: string;
};

export type UpdateHandsonContentResponse = HandsonContentWrite;

export type DeleteHandsonContentRequest = {
  handson: number;
  id: number;
};

/**
 * Content Pass Member
 */
export type GetContentPassMembersRequest = {
  handson: number;
  content: number;
};

export type GetContentPassMemberResponse = PassedContentMember[];

export type AddContentPassMemberRequest = {
  handson: number;
  content: number;
};

export type AddContentPassMemberResponse = PassedContentMemberWrite;

export type DeleteContentPassMemberRequest = {
  handson: number;
  content: number;
  id: number;
};
