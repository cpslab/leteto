// models
export type User = {
  pk: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
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
