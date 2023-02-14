import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'

import { ADD_SALON } from '../../utils/mutations'
import { QUERY_SALONS } from '../../utils/queries'

import Auth from '../../utils/auth'

const SalonForm = () => {
  const SalonForm = () => {
    const [salonName, setSalonName] = useState('')
    const [salonAddress, setSalonAddress] = useState('')
    const [artist, setArtist] = useState('')
    const [availability, setAvailability] = useState('')
    const [salonHours, setSalonHours] = useState('')
    const [error, setError] = useState('')

    const [addSalon, { error: addSalonError }] = useMutation(ADD_SALON, {
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

        const { me } = cache.readQuery({ query: QUERY_SALONS })
        cache.writeQuery({
          query: QUERY_SALONS,
          data: { me: { ...me, salons: [...me.salons, addSalon] } },
        })
      },
    })

    const handleFormSubmit = async (event) => {
      event.preventDefault()

      try {
        const { data } = await addSalon({
          variables: {
            salonName,
            salonAddress,
            artist,
            availability,
            salonHours,
          },
        })

        setSalonName('')
        setSalonAddress('')
        setArtist('')
        setAvailability('')
        setSalonHours('')
        setError('')
      } catch (err) {
        setError(err.message)
      }
    }
  }
}
