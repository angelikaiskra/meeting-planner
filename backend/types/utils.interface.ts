export interface QueryResult<QueryObject> {
  data: QueryObject[];
  total: number;
  page: number;
  limit: number;
}

export interface NewUser {
  email: string;
  password: string;
}