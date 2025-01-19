export interface QueryResult<QueryObject> {
  data: QueryObject[];
  total: number;
  page: number;
  limit: number;
}