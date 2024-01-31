import { useEffect, useState } from 'react'
import useSWR from 'swr'
import axios from 'axios'

const fetcher = (...args : [key: any]) =>
  fetch(...args).then((res) => res.json());

function ProfileUseSWR() {
  const {
    data,
    isValidating,
    error,
    mutate
  } = useSWR('api/allassets', fetcher);

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
  
  return (
    <div>
      {data.map((asset: any) => (
        <p key={asset.id}>{asset.name}</p>
      ))}
    </div>
  );
}
function ProfileUseEffect() {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('/api/profile-data')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setIsLoading(false)
      })
  }, []) //

  // use like suspense
  if (isLoading) return <p>Loading..</p>
  if (!data) return <p>No profile data</p>

  return (
    <div>
      {/*<h1>{data.name}</h1>*/}
      {/*<h1>{data.bio}</h1>*/}
    </div>
  )
}