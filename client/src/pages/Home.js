import React from 'react'
import { useQuery } from '@apollo/client'

import SalonList from '../components/SalonList'

import SalonForm from '../components/SalonForm'


import { QUERY_SALONS } from '../utils/queries'

const Home = () => {
  const { loading, data } = useQuery(QUERY_SALONS)
  console.log(data)
  const salons = data?.salons || []

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <div className="col-12 col-md-8 mb-3">
            {loading ? (
              <div>Loading...</div>
            ) : (

              <SalonList
                salons={salons}
                title="Available Salons" />
            )}
          </div>
        </div>

        <div className="flex-row justify-center">
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: '1px dotted #1a1a1a' }}
          ></div>
          <SalonForm />
        </div>

      </div>
    </main>
  )
}

export default Home;
