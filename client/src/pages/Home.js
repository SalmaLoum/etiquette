import React from 'react'
import { useQuery } from '@apollo/client'

import MainList from '../components/MainList'
import SalonForm from '../components/SalonForm'
// import ServiceForm from '../components/ServiceForm'

import { QUERY_SALONS } from '../utils/queries'

const Home = () => {
  const { loading, data } = useQuery(QUERY_SALONS)

  const thoughts = data?.thoughts || []

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <MainList />
        </div>

        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <SalonForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <MainList thoughts={thoughts} title="Some Feed for Thought(s)..." />
          )}
        </div>
      </div>
    </main>
  )
}

export default Home
