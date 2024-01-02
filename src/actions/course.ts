import { GET_CATEGORY, GET_CATEGORY_SUCCESS } from '@/constants'
import { Category } from './actions'

export const getCategory = () => ({
  type: GET_CATEGORY,
})

export const getCategorySuccess = (payload: Category[]) => ({
  type: GET_CATEGORY_SUCCESS,
  payload: payload,
})
