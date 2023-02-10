const { gql } = require('apollo-server-express');

// type User: artist, admin, 
// User.userType: admin, artist, client
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

  type Salon {
    _id: ID
    salonName: String
    salonAddress: String
    createdAt: String
    artist: [Artist]!
    storeHours: String
  }
# salonId is array of salon ids artist works at
  type Artist {
    _id: ID
    availableDate: String
    commentAuthor: String
    createdAt: String
    gallery: Image
    salonId: [Salon]!
  }
# serviceType: mani, pedi, gel, etc. (one at a time)
  type Services {
    _id: ID
    serviceType
    duration
    price
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): Salon
    thoughts(username: String): [Thought]
    thought(thoughtId: ID!): Thought
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addThought(thoughtText: String!): Thought
    addComment(thoughtId: ID!, commentText: String!): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
  }
`;

module.exports = typeDefs;
