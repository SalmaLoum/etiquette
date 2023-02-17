import { useQuery } from '@apollo/client'
import React from 'react'
// import { Link } from 'react-router-dom'
import { QUERY_ME } from '../../utils/queries'

const Profile = () => {
  const { loading, data } = useQuery(QUERY_ME)

  let user = data?.me || {}

  if (loading) {
    return <div> loading... </div>
  }
  return (
    <div className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2 m-0">
            {' '}
            {user.username}'s profile
          </h4>
          <br />
          <p>
            <strong> Your email is:</strong> {user.email}
          </p>

          <div></div>
        </div>
      </div>
    </div>
  )
}

export default Profile
