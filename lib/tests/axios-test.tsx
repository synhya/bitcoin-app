// see how to control params

import React from 'react'
import axios from 'axios'

interface User {
  id: string,
}

const fetchUser = async <T = User>():Promise<T> => {
  const response = await axios.get<T>('/user', {
    params: {
      ID: 12345
    }
  })

  const response2 = await axios.get<T>(
    '/user?ID=12345'
  )

  return response.data;
}
const MyComponent = async () => {
  const data = await fetchUser()
    .then(resolve => console.log(resolve));


  return (
    <div>

    </div>
  )
}

const axiosInstance = axios.create({
  baseURL: 'https://example.com',
})

export default MyComponent

