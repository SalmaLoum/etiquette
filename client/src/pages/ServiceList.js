import React from 'react'

// Import the `useParams()` hook
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'

// import CommentList from '../components/CommentList'
// import CommentForm from '../components/CommentForm'

import { QUERY_SINGLE_SALON } from '../utils/queries'

const SingleSalon = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { salonName } = useParams()
  const { user: userParam } = useParams()

  const { loading, data } = useQuery(QUERY_SINGLE_SALON, {
    // pass URL parameter
    variables: { salonName: salonName, user: userParam },
  })

  const salon = data?.salon || {}

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <div className="my-3">
      <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
        Viewing {userParam ? `${user.username}'s` : 'your'} profile.
      </h2>
      <div>
        <h3 className="card-header bg-dark text-light p-2 m-0">
          {salon.serviceName} <br />
          <span style={{ fontSize: '1rem' }}>
            This service takes {service.duration} minutes for ${service.price}
          </span>
        </h3>
        <div className="bg-light py-4">
          <blockquote
            className="p-4"
            style={{
              fontSize: '1.5rem',
              fontStyle: 'italic',
              border: '2px dotted #1a1a1a',
              lineHeight: '1.5',
            }}
          >
            {salon.user}
          </blockquote>
          <button
            className="btn btn-block btn-primary"
            style={{ cursor: 'pointer' }}
            type="submit"
          >
            Book Appointment
          </button>
        </div>
        {/* 
        <div className="my-5">
          <CommentList comments={thought.comments} />
        </div>
        <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
          <CommentForm thoughtId={thought._id} />
        </div> */}
      </div>
    </div>
  )
}

export default SingleSalon
