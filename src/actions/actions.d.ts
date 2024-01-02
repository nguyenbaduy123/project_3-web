export interface LoginSuccessPayload {
  access_token: string
}

export interface Category {
  categoryId: number
  categoryName: string
  parentCategory: string
}
