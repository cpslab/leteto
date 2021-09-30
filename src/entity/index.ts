export type User = {
  id: number;
  username: string;
};

export type Handson = {
  id: number;
  owner: User;
  title: string;
  start_at: string;
  end_at: string;
};

export type HandsonDetail = {
  id: number;
  owner: User;
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
  members: HandsonMember[];
  contents: HandsonContent[];
};

export type HandsonDetailWrite = {
  id: number;
  owner: User;
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

export type HandsonMember = {
  id: number;
  handson: number;
  member: User;
};

export type HandsonContent = {
  id: number;
  handson: number;
  content: string;
  passed_members: PassedContentMember[];
};

export type HandsonContentWrite = {
  id: number;
  handson: number;
  content: string;
};

export type PassedContentMember = {
  id: number;
  content: number;
  member: User;
};

export type PassedContentMemberWrite = {
  id: number;
  content: number;
  member: number;
};
