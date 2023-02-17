import React from 'react'

// Import the `useParams()` hook
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'

// import { QUERY_APPOINTMENTS } from '../utils/queries'
import AppointmentList from '../components/AppointmentList'

import AppointmentForm from '../components/AppointmentForm'

import { QUERY_SINGLE_SALON } from '../utils/queries'

const SingleSalon = () => {
  const { salonId } = useParams()

  const { loading, data } = useQuery(QUERY_SINGLE_SALON, {
    variables: { salonId: salonId },
  })
  const salon = data?.salon || {}

  if (loading) {
    return <div> loading... </div>
  }
  return (
    <div className="flex-row  justify-center mb-10">
      <div className="col-12 col-lg-12">
        <div className="card">
          <h4 className="card-header text-center bg-dark text-light p-2">
            <div className="jusitfy-start">
              {salon.salonImage ? (
                <img
                  src={salon.salonImage}
                  alt="Nails"
                  class="image-height"
                  width="100px"
                />
              ) : (
                <div></div>
              )}
            </div>
            {salon.salonName}
            <br />
            <span style={{ fontSize: '1rem' }}> {salon.salonAddress}</span>
          </h4>

          {/* For loop 5 times */}

          <div className="m-3 p-4 border">
            <AppointmentForm salonId={salon._id} />
          </div>

          <div className="my-5">
            <AppointmentList
              appointments={salon.appointments}
              service="mani/pedi"
              time="8am"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleSalon
