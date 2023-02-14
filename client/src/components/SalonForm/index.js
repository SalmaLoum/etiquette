//for admins to add artist's name, salon name, salon address, salon hours, artist's availability
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'

import { ADD_SALON } from '../../utils/mutations'
import { QUERY_SALONS, QUERY_ME } from '../../utils/queries'

import Auth from '../../utils/auth'

const SalonForm = () => {
  const [salonName, setSalonName] = useState('')
  const [salonAddress, setSalonAddress] = useState('')
  const [salonHours, setSalonHours] = useState('')

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

  // document.getElementById('upload_widget').addEventListener(
  //   'click',
  //   function () {
  //     myWidget.open()
  //   },
  //   false,
  // )

  const handleFormSubmit = async (event) => {
    event.preventDefault()

    try {
      const { data } = await addSalon({
        variables: {
          user: Auth.getProfile().data.username,
          salonAddress,
          salonName,
          salonHours,
        },
      })
      // setThoughtText('');
      // from google maps api
      // GET salonName and salonAddress
      setSalonAddress('')
    } catch (err) {
      console.error(err)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    if (name === 'salon' && value.length <= 280) {
      setSalonName(value)
      setSalonHours(value)

      setCharacterCount(value.length)
    }
  }

  return (
    <div>
      <h3>Booking a nail salon appointment?</h3>
      <h3>Viewing an nail artist's page?</h3>

      {/* bring logged in back on when ready  ` {Auth.loggedIn() ? ( /{true?(   ` */}
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
                name="Salon Name"
                placeholder="Add any specifics or requests for your visit..."
                value={salonName}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>
            <button
              id="upload_widget"
              class="cloudinary-button"
              onClick={openWidget}
            >
              Upload files
            </button>
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

export default SalonForm
