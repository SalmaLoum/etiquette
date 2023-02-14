//For artists to add their services, prices, and galleries.

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'

import { ADD_SALON } from '../../utils/mutations'
import { QUERY_SALONS, QUERY_ME } from '../../utils/queries'

import Auth from '../../utils/auth'

const ServiceForm = () => {
  const [serviceType, setServiceType] = useState('')
  const [price, setPrice] = useState('')
  const [duration, setDuration] = useState('')
  // const [gallery, setGallery] = useState('')
  const [characterCount, setCharacterCount] = useState(0)

  const [addSalon, { error }] = useMutation(ADD_SALON, {
    update(cache, { data: { addSalon } }) {
      try {
        const { salons } = cache.readQuery({ query: QUERY_SALONS })

        cache.writeQuery({
          query: QUERY_SALONS,
          data: { salons: [addSalon, ...salons] },
        })
      } catch (e) {
        console.error(e)
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME })
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, salons: [...me.salons, addSalon] } },
      })
    },
  })

  const handleFormSubmit = async (event) => {
    event.preventDefault()

    try {
      const { data } = await addSalon({
        variables: {
          serviceType,
          price,
          duration,
          // gallery,
          // salonName: Auth.getProfile().data.username,
        },
      })
      // setThoughtText('');
      // from google maps api
      // GET salonName and salonAddress
      setPrice('')
    } catch (err) {
      console.error(err)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    if (name === 'manicure' && value.length <= 280) {
      setServiceType(value)
      setCharacterCount(value.length)
    }
  }

  return (
    <div>
      <h3>Want to add an artist?</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="serviceType"
                placeholder="Type a new salon name..."
                value={serviceType}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add comment for this artist
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to make an appointment. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  )
}

export default ServiceForm
