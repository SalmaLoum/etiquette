import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query Query($username: String!) {
    user(username: $username) {
      _id
      username
      email
      password
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
      datetime
      appointmentService
      service {
        _id
        datetime
        service {
          _id
          serviceType
        }
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
