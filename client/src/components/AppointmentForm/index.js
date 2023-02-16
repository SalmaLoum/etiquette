import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'

import { ADD_APPOINTMENT } from '../../utils/mutations'
import { QUERY_SALONS } from '../../utils/queries'

import Auth from '../../utils/auth'

const AppointmentForm = ({ salonId }) => {
  const [datetime, setdatetime] = useState('')
  const [service, setService] = useState('')
  const [userAlert, setUserAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const [addAppointment, { error: addSalonError }] = useMutation(
    ADD_APPOINTMENT,
  )

  const handleChange = (event) => {
    const { name, value } = event.target
    setdatetime(value)
  }
  const handleFormSubmit = async (event) => {
    event.preventDefault()
    if (!datetime) {
      setAlertMessage(
        'You need to add a service date to resigster an appointment',
      )
      setUserAlert(true)
      return
    }

    if (!service) {
      setAlertMessage(
        'You need to add a service type to register an appointment',
      )
      setUserAlert(true)
      return
    }

    try {
      const { data } = await addAppointment({
        variables: {
          salonId,
          datetime,
          service,
        },
      })

      setdatetime('')
      setService('')
    } catch (err) {}
  }

  return (
    <div>
      <h3> Book your appointment</h3>

      {Auth.loggedIn() ? (
        <>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-12">
              <textarea
                name="datetime"
                placeholder="Add Appointment Date & Time"
                value={datetime}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={(event) => setdatetime(event.target.value)}
              ></textarea>

              <textarea
                name="service"
                placeholder="Add Services Here"
                value={service}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={(event) => setService(event.target.value)}
              ></textarea>

              <button className="btn btn-dark btn-lg py-3" type="submit">
                Add Appointment
              </button>
              {userAlert && (
                <div className="my-3 p-3 bg-danger text-white block error">
                  {alertMessage}
                </div>
              )}
            </div>
          </form>
        </>
      ) : (
        <p>
          You need to be logged in as an Admin or Artist to add an Appointment.
          Please <Link to="/login">login</Link> or{' '}
          <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  )
}

export default AppointmentForm
