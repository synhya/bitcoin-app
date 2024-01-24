
export const paths = {

  // {query}?page={number}   ? -> 인코딩필요
  search: (query: string) => `${process.env.NEXT_PUBLIC_SEARCH_API_PATH}${encodeURIComponent(query)}`,
  // {id}
  info: (id: string) => `${process.env.NEXT_PUBLIC_INFO_API_PATH}${id}`,

}

