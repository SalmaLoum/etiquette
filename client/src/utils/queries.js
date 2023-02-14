import { gql } from '@apollo/client'

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
      }
    }
  }
`

export const QUERY_SALONS = gql`
  query getThoughts {
    thoughts {
      _id
      thoughtText
      thoughtAuthor
      createdAt
    }
  }
`

export const QUERY_SINGLE_SALON = gql`
  query getSingleSalon($salonId: ID!) {
    service(salonId: $salonId) {
      _id
      salonName
      salonAddress
      createdAt
      appointments
      services {
        _id
        serviceType
        price
        duration
        createdAt
        user
      }
    }
  }
`

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        thoughtAuthor
        createdAt
      }
    }
  }
`
