import React from 'react'
import { useQuery } from '@apollo/client'

import SalonList from '../components/SalonList'
import SalonForm from '../components/SalonForm'

import { QUERY_SALONS } from '../utils/queries'
// import MapContainer from '../components/MapContainer'

const Home = () => {
  const { loading, data } = useQuery(QUERY_SALONS)
  console.log(data)
  const salons = data?.salons || []

  return (
    <main>
      {/* <MapContainer /> */}
      <div className="flex-row justify-center border mb-3">
        <div className="col-12 col-md-8 mb-3 align-center ">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <SalonList salons={salons} title="Available Salons" />
          )}
        </div>
      </div>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 mb-3 p-3"></div>
        <SalonForm />
      </div>
    </main>
    
  )
}

export default Home
