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
query Query {
  salons {
    _id
    salonAddress
    salonName
    salonHours
  }
}
`

export const QUERY_SINGLE_SALON = gql`
query Query($salonId: ID!) {
  salon(salonId: $salonId) {
    _id
    salonAddress
    salonName
    salonHours
    appointments {
      _id
      datetime
      service {
        _id
        serviceType
      }
    }
  }
}
`

export const QUERY_SINGLE_THOUGHT = gql`
  query getSingleThought($thoughtId: ID!) {
    thought(thoughtId: $thoughtId) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`


// export const QUERY_ME = gql`
//   query me {
//     me {
//       _id
//       username
//       email
//       thoughts {
//         _id
//         thoughtText
//         thoughtAuthor
//         createdAt
//       }
//     }
//   }
