export type Repo = {
  id: string;
  name: string;
  url: string;
  status: Status;
  languages: Language[];
};
export type Status = {
  id: number;
  label: string;
};
export type Language = {
  id: number;
  label: string;
  repos: Repo[];
};
