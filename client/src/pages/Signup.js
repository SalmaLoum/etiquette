import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { useMutation } from '@apollo/client'
import { ADD_USER } from '../utils/mutations'

import Auth from '../utils/auth'

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    isAdmin: false
  })
  const [addUser, { data }] = useMutation(ADD_USER)
  const [userAlert, setUserAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormState({
      ...formState,
      [name]: value,
    })
  }

  const handleClick = (event) => {
    const { name, value } = event.target 

    if (name === "isAdmin") {
      setFormState({
        ...formState,
        isAdmin: true,
      })
    }
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault()

    if (!formState.username) {
      setAlertMessage('Please Enter a Username')
      setUserAlert(true)
      return
    }

    if (!formState.email) {
      setAlertMessage('Please Enter an Email')
      setUserAlert(true)
      return
    }

    if (!formState.password) {
      setAlertMessage('Please Enter a password')
      setUserAlert(true)
      return
    }

    try {
      const { data } = await addUser({
        variables: { ...formState },
      })

      Auth.login(data.addUser.token)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2 m-0">Sign Up</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Your username"
                  name="username"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <div className="form-group">
  <label htmlFor="role">Select your role:</label>
  <div className="form-check">
    <input
      className="form-check-input"
      type="radio"
      name="isClient"
      id="client"
      value="client"
      onChange={handleChange}
    />
    <label className="form-check-label" htmlFor="client">
      Client
    </label>
  </div>
  <div className="form-check">
    <input
      className="form-check-input"
      type="radio"
      name="isAdmin"
      id="isAdmin"
      value={formState.isAdmin}
      onChange={handleClick}
    />
    <label className="form-check-label" htmlFor="isAdmin">
      Admin
    </label>
  </div>
  <div className="form-check">
    <input
      className="form-check-input"
      type="radio"
      name="isArtist"
      id="artist"
      value="artist"
      onChange={handleChange}
    />
    <label className="form-check-label" htmlFor="artist">
      Artist
    </label>
  </div>
</div>

                <button
                  className="btn btn-block btn-dark"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {userAlert && (
              <div className="my-3 p-3 bg-danger text-white error block">
                {alertMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Signup
