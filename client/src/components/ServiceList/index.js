import React from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import Auth from '../../utils/auth'

import { ADD_SERVICE} from '../../utils/mutations'  
import { QUERY_SALONS} from '../../utils/queries'

utils/queries

const ServiceList ({ 

  username,
  salonName,
  salonHours,
  salonAddress,
  appointments
}) => { 
  
  if (!appointments.length) {
    return <h3>No Appointments Yet</h3>
  }

  return (
    <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-light" to="/">
            <h1 className="m-0">Etiquette</h1>
          </Link>

          <p className="m-0">Book your nail salon appointments today!</p>
        </div>
        <div>
           {/* bring logged in back on when ready  ` {Auth.loggedIn() ? ( /{true?(   ` */}
      {true? (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/me">
                {Auth.getProfile().data.user}'s profile
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default ServiceList
