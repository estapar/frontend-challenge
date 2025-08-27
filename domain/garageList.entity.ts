export interface GaragePaginatedListRoot {
    countRecords: number
    currentPage: number
    pageSize: number
    hasNextPage: number
    hasPreviousPage: number
    data: Daum[]
  }
  
  export interface Daum {
    code: string
    name: string
    address: string
    city: string
    state: string
    region: string
    subsidiary: string
  }
  