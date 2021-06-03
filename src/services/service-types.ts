// models
export type User = {
  pk: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
};

export type Owner = {
  id: number;
  username: string;
};

export type HandsonListItem = {
  id: number;
  owner: Owner;
  title: string;
  start_at: string;
  end_at: string;
  is_public: boolean;
};

export type HandsonDetailItem = {
  id: number;
  owner: Owner;
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

export type HandsonContent = {
  id: number;
  handsonId: number;
  content: string;
};

// Authorization
export type SignInRequest = {
  username: string;
  email: string;
  password: string;
};

export type SignInResponse = {
  access_token: string;
  refresh_token: string;
  user: User;
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
  user: User;
};

export type GetCurrentUserResponse = {
  user: User;
};

// Handson
export type CreateHandsonRequest = {
  owner: Omit<Owner, 'id'>;
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

export type CreateHandsonResponse = {
  handson: HandsonListItem;
};

export type GetHandsonRequest = {
  id: number;
};

export type GetHandsonResponse = {
  handson: HandsonDetailItem;
};

export type UpdateHandsonRequest = {
  id: number;
  owner: Owner;
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

export type UpdateHandsonResponse = {
  handson: HandsonDetailItem;
};
