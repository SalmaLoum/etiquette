import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'

import { ADD_SALON } from '../../utils/mutations'
import { QUERY_SALONS } from '../../utils/queries'

import Auth from '../../utils/auth'

const SalonForm = ({ salonId }) => {
  const [salonName, setSalonName] = useState('')
  const [salonAddress, setSalonAddress] = useState('')
 
  const [salonHours, setSalonHours] = useState('')
  const [salonImage, setSalonImage] = useState('')
  const [userAlert, setUserAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const [addSalon, { error: addSalonError }] = useMutation(ADD_SALON)
  const handleChange = (event) => {
    const { name, value } = event.target
    
    setSalonName(value)
  
  }
  const handleFormSubmit = async (event) => {
    event.preventDefault()

    if (!salonAddress) {
      setAlertMessage('You need to add a salon address to resigster a salon')
      setUserAlert(true)
      return
    }

    if (!salonName) {
      setAlertMessage('You need to add a salon name to register a salon')
      setUserAlert(true)
      return
    }

    if (!salonHours) {
      setAlertMessage('You need to add the salon hours to register a salon')
      setUserAlert(true)
      return
    }
    try {
      const { data } = await addSalon({
        variables: {
          salonId,
          salonName,
          salonAddress,
          // //artist,
          salonHours,
          salonImage,
        },
      })

      setSalonName('')
      setSalonAddress('')
      // //setArtist('')
      setSalonHours('')
    } catch (err) {}
  }
  // cloudinary

  var myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: 'do6kan0iu',
      uploadPreset: 'etiquette',
    },
    (error, result) => {
      if (!error && result && result.event === 'success') {
        console.log('Done! Here is the image info: ', result.info)
        setSalonImage(result.info.secure_url)
      }
    },
  )

  var openWidget = (e) => {
    e.preventDefault()
    myWidget.open()
  }


  return (
    <div className="card">
      <h4 className="card-header text-center bg-dark text-light p-1">
        Please add your Salon!
      </h4>
      <p className=" text-center text-black p-2">
        If it's not on the list above
      </p>

      {Auth.loggedIn() && Auth.isAdmin(Auth.getToken()) ? (
        <>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="m-1">
              <button
                id="upload_widget"
                class="cloudinary-button btn btn-light btn-lg py-3"
                onClick={openWidget}
              >
                Upload salon images
              </button>
            </div>
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

            {userAlert && (
              <div className="my-3 p-3 bg-danger text-white block">
                {alertMessage}
              </div>
            )}
            <br></br>
            <div>
              <button className="btn btn-dark btn-lg py-3" type="submit">
                Add Salon
              </button>
            </div>
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
