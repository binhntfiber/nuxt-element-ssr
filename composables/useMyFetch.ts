import type { UseFetchOptions } from '#app'
import { replaceUrlLastSlash } from '~/utils'

export const useMyFetch = <R>(url: string, options: UseFetchOptions<R>) => {
  const config = useRuntimeConfig()
  const baseUrl = replaceUrlLastSlash(config.public.API_BASE_URL)

  return useFetch(url, {
    baseURL: baseUrl,
    // Interceptors
    onResponse({ response }) {
      // Process the response data
      if (response._data) return response._data
      return response
    },
    ...options,

    // onResponseError({ error }) {
    //   // Handle the response errors
    //   error
    // },
  })
}
