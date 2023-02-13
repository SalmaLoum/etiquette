import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
// import Widget from '../Cloudinary/Widget'

import { ADD_SALON } from '../../utils/mutations'
import { QUERY_SALONS, QUERY_ME } from '../../utils/queries'

import Auth from '../../utils/auth'

const ThoughtForm = () => {
  const [salonName, setSalonName] = useState('')
  const [salonAddress, setSalonAddress] = useState('')

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
          salonAddress,
          salonName,
          // salonName: Auth.getProfile().data.username,
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
      setCharacterCount(value.length)
    }
  }

  return (
    <div>
      <h3>What's on your techy mind?</h3>

      {/* bring logged in back on when ready */}
      {true ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form className="flex-row justify-center justify-space-between-md align-center">
            <div className="col-12 col-lg-9">
              <textarea
                name="Salon Name"
                placeholder="Here's a new thought..."
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

            <div className="col-12 col-lg-3"></div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
          <button className="btn btn-primary btn-block py-3" type="submit">
            Add Thought
          </button>
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  )
}

export default ThoughtForm
