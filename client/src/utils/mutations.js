import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`

  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {

      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_SALON = gql`
  mutation AddSalon(
    $salonName: String
    $salonAddress: String
    $salonHours: String
  ) {
    addSalon(
      salonName: $salonName
      salonAddress: $salonAddress
      salonHours: $salonHours
      salonImage: $salonImage
    ) {
      _id
      salonName
    }
  }
`;

export const ADD_APPOINTMENT = gql`
  mutation Mutation(
    $salonId: ID!
    $datetime: String!
    $appointmentService: String!
  ) {
    addAppointment(
      salonId: $salonId
      datetime: $datetime
      appointmentService: $appointmentService
    ) {
      _id
      salonAddress
      salonName
      appointments {
        _id
        datetime
        appointmentService
      }
    }
  }
`;
