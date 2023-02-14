import React from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import Auth from '../../utils/auth'

import { ADD_SERVICE } from '../../utils/mutations'
import { QUERY_SALONS } from '../../utils/queries'

const ServiceList = ({
  username,
  salonName,
  salonHours,
  salonAddress,
  serviceType,
}) => {
  if (!appointments.length) {
    return <h3>No Appointments Yet</h3>
  }

  return (
    <div>
      {showSalonName && <h3>{salonName}</h3>}
      {salons &&
        salons.map((salon) => (
          <div key={salon._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${salon.salonHours}`}
                >
                  {service.serviceType} <br />
                  <span style={{ fontSize: '1rem' }}>
                    This service duriation is {service.duration}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>For ${service.price}</span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{user.username}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/salon/${salon._id}`}
            ></Link>
          </div>
        ))}
    </div>
  )
}

export default ServiceList
