import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'

import { ADD_SALON } from '../../utils/mutations'
import { QUERY_SALONS } from '../../utils/queries'

import Auth from '../../utils/auth'

const SalonForm = ({ salonId }) => {
  const [salonName, setSalonName] = useState('')
  const [salonAddress, setSalonAddress] = useState('')
  //const [artist, setArtist] = useState('')
  const [salonHours, setSalonHours] = useState('')
  const [error, setError] = useState('')

  const [addSalon, { error: addSalonError }] = useMutation(ADD_SALON)

  const handleFormSubmit = async (event) => {
    event.preventDefault()

    const handleChange = (event) => {
      const { name, value } = event.target
      // if (name === 'salonName' && value.length <= 280) {
      setSalonName(value)
      //   }
    }

    try {
      const { data } = await addSalon({
        variables: {
          salonId,
          salonName,
          salonAddress,
          // //artist,
          salonHours,
        },
      })

      setSalonName('')
      setSalonAddress('')
      // //setArtist('')
      setSalonHours('')
      setError('')
    } catch (err) {
      setError(err.message)
    }
  }
  // cloudinary
  var openWidget = (e) => {
    e.preventDefault()
    myWidget.open()
  }
  var myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: 'do6kan0iu',
      uploadPreset: 'etiquette',
    },
    (error, result) => {
      if (!error && result && result.event === 'success') {
        console.log('Done! Here is the image info: ', result.info)
      }
    },
  )

  return (
    <div className="card">
      <h4 className="card-header text-center bg-dark text-light p-1">
        Please add your Salon!
      </h4>
      <p className=" text-center text-black p-2">
        If it's not on the list above
      </p>

      {Auth.loggedIn() ? (
        <>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <textarea
              name="salonName"
              placeholder="Add Salon Name"
              value={salonName}
              className="form-input w-100"
              style={{ lineHeight: '1.5', resize: 'vertical' }}
              onChange={(event) => setSalonName(event.target.value)}
            ></textarea>

            <textarea
              name="salonAddress"
              placeholder="Add Salon Address"
              value={salonAddress}
              className="form-input w-100"
              style={{ lineHeight: '1.5', resize: 'vertical' }}
              onChange={(event) => setSalonAddress(event.target.value)}
            ></textarea>

            <textarea
              name="salonHours"
              placeholder="Add Salon Hours"
              value={salonHours}
              className="form-input w-100"
              style={{ lineHeight: '1.5', resize: 'vertical' }}
              onChange={(event) => setSalonHours(event.target.value)}
            ></textarea>
            <div>
              <button
                id="upload_widget"
                class="cloudinary-button btn btn-light btn-lg py-3"
                onClick={openWidget}
              >
                Upload salon images
              </button>
            </div>
            <div class="btn btn-block btn-dark m-4">
              <button class="btn btn-block btn-dark" type="submit">
                Add Salon
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
        <p class="bold">
          You need to be logged in as an Admin to add a Salon. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  )
}

export default SalonForm
