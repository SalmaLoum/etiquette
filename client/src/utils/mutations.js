import { gql } from '@apollo/client'

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
`

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!, $isAdmin: Boolean) {
    addUser(username: $username, email: $email, password: $password, isAdmin: $isAdmin) {
      token
      user {
        _id
        username
        isAdmin
      }
    }
  }
`

export const ADD_SALON = gql`
mutation AddSalon($salonName: String, $salonAddress: String, $salonHours: String) {
  addSalon(salonName: $salonName, salonAddress: $salonAddress, salonHours: $salonHours) {
    _id
    salonName
  }
}
`


export const ADD_APPOINTMENT = gql`
mutation Mutation($salonId: ID!, $datetime: String!, $appointmentService: String!) {
  addAppointment(salonId: $salonId, datetime: $datetime, appointmentService: $appointmentService) {
    _id
    salonAddress
    salonName
    appointments {
      _id
      datetime
      appointmentService
    }
  }
`

