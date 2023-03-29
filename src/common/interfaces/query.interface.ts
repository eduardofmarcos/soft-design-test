export interface QueryFilter {
  filter: Function;
  sort: Function;
  limitFields: Function;
  paginate: Function;
}
