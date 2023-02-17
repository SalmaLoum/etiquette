import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query Query($username: String!) {
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
`;

export const QUERY_SALONS = gql`
  query Query {
    salons {
      _id
      salonAddress
      salonName
      salonHours
    }
  }
`;

export const QUERY_SINGLE_SALON = gql`
query Query($salonId: ID!) {
  salon(salonId: $salonId) {
    _id
    salonAddress
    salonName
    salonImage
    salonHours
    appointments {
      _id
      datetime
      appointmentService
    }
  }
}
`;


export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      password
    }
  }
`;