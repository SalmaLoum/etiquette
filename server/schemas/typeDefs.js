const { gql } = require('apollo-server-express');
// types of queries we can make and what feilds can be requested when we make those types of queries

// query: CRUD - get data out of db

// type User: artist, admin, 
// User.userType: admin, artist, client
// gallery is an array of images (all saved to user info)
// gallery personalized to user type:
// gallery for user=Client: desired nail photos
// gallery for user=Artist: prior nail photos
// gallery for user=Admin: storefront photos
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    isAdmin: Boolean
    isArtist: Boolean
    isClient: Boolean 
  }
# artistId: array of objects of artistId associated with artist so salons can haveMany artists
  type Salon {
    _id: ID
    salonAddress: String
    salonName: String
    createdAt: String
    appointments: [Appointment]!
    salonHours: String
  }
  type Appointment {
    _id: ID
    datetime: String
    service: Service
    createdAt: String
  }
  type Service {
    _id: ID
    serviceType: String
    duration: String
    price: Number
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    salons(username: String): [Salon]
    salon(salonId: ID!): Salon
    appointments(salonName: String): [Appointment]
    appointment(appointmentId: ID!): Appointment
    services(datetime: String): [Service]
    service(serviceId: ID!): Service
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addSalon(salonName: String): Salon
    addAppointment(appointmentId: ID!): Appointment
    addService(serviceId: ID!): Service
  }
`;

module.exports = typeDefs;

// addThought(thoughtText: String!): Thought
// addComment(thoughtId: ID!, commentText: String!): Thought
// removeThought(thoughtId: ID!): Thought
// removeComment(thoughtId: ID!, commentId: ID!): Thought

// # salonId is array of salon ids artist works at
// # serviceType: mani, pedi, gel, etc. (one at a time)