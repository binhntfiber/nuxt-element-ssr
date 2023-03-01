export enum SORT_TYPE {
  ASC = 'ASC',
  DESC = 'DESC',
}
export enum FetchMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
export type SendTxOptions = {
  call: Function
  params: any
  txConfirmContent: string
  txSuccessContent: string
}
export type DropdownItemType = {
  title: string
  value: string
  additionalValues?: Record<string, any>
}
