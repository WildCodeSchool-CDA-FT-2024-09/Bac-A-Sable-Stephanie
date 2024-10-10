export type Repo = {
  id: string;
  name: string;
  url: string;
  status: Status;
  languages: Language[];
  comments?: Comment[];
};
export type Status = {
  id: number;
  label: string;
};
export type Language = {
  id: number;
  label: string;
  repos?: Repo[];
};
export type Comment = {
  id: number;
  author: string;
  text: string;
};
