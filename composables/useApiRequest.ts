import { SearchParameters } from 'ofetch'
import { FetchMethod } from '@/types'
import { useMyFetch } from './useMyFetch'

export const useApiRequest = () => {
  const get = <P extends SearchParameters, R>(url: string, params?: P) => {
    return useMyFetch<R>(url, {
      params,
      method: FetchMethod.GET,
    })
  }
  const post = <P extends Record<string, any>, R>(url: string, payload: P) => {
    return useMyFetch<R>(url, {
      body: payload,
      method: FetchMethod.POST,
    })
  }
  const put = <P extends Record<string, any>, R>(url: string, payload: P) => {
    return useMyFetch<R>(url, {
      body: payload,
      method: FetchMethod.PUT,
    })
  }
  const deleteFunc = <R>(url: string) => {
    return useMyFetch<R>(url, {
      method: FetchMethod.DELETE,
    })
  }
  return {
    get,
    post,
    put,
    delete: deleteFunc,
  }
}
