import axios, { AxiosInstance } from 'axios'

export type RequestParams = Record<string, string | number | boolean | string[]>

class Api {
  protected readonly instance: AxiosInstance
  constructor(baseURL: string) {
    this.instance = axios.create({ baseURL })
  }

  public get = (endpoint: string, params?: RequestParams) =>
    this.instance.get(endpoint, {
      params: { ...params },
    })

  public post = (endpoint: string, params: RequestParams) =>
    this.instance.post(endpoint, params)
}

const recommendationApi = new Api('http://localhost:5000')
const api = new Api('http://localhost:8080')

export { recommendationApi, api }
