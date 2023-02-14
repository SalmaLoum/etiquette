import React from 'react'
import { useQuery } from '@apollo/client'

import SalonList from '../components/SalonList'
import SalonFrom from '../components/SalonForm'

import { QUERY_SALONS } from '../utils/queries'

const Home = () => {
  const { loading, data } = useQuery(QUERY_SALONS)

  const salons = data?.SalonList || []

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <SalonList />
        </div>
      </div>
    </main>
  )
}

export default Home
