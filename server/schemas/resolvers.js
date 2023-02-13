const { AuthenticationError } = require('apollo-server-express');
const { User, Salon, Appointment, Service } = require('../models');
const { signToken } = require('../utils/auth');
// methods that interact with the database
// need to curesponding function 
// when query for users, find all salons, populate the classes array, and then i am going to populate the professor field insdie that classes array
const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('salons');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('salons');
    },
    salons: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Salon.find(params).sort({ createdAt: -1 });
    },
    salon: async (parent, { salonId }) => {
      return Salon.findOne({ _id: salonId });
    },
    appointments: async (parent, { salonName }) => {
      const params = salonName ? { salonName } : {};
      return Appointment.find(params).sort({ createdAt: -1 })
    },
    appointment: async (parent, { appointmentId }) => {
      return Appointment.findOne({ _id: appointmentId })
    },
    services: async (parent, { datetime }) => {
      return Service.find(params)
    },
    service: async (parent, { serviceId }) => {
      return Service.findOne({ _id: serviceId })
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('salons');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {

    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    // sample addUser request body
    // {
    //   "username": "kaylacasale",
    //   "email": "kayla.casale@gmail.com",
    //   "password": "Password123!"
    // }
    // if userType= admin is true, user can add a salon salon
    addSalon: async (parent, { salonName, salonAddress, salonHours }, context) => {
      console.log(context)
      if (context.user) {
        const salon = await Salon.create({
          salonAddress,
          salonName,
          salonHours
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { salons: salon._id } }
        );
        return salon;
      }
      throw new AuthenticationError('You need to be logged in as an admin!')
    },
    addAppointment: async (parent, { appointmentId, datetime }, context) => {

      return Salon.findOneAndUpdate(
        { _id: appointmentId },
        {
          $addToSet: {
            appointments: { datetime },
          },
        },
        {
          new: true,
          runValidators: true,
        }
      )

    },
    //   addThought: async (parent, { thoughtText }, context) => {
    //     if (context.user) {
    //       const thought = await Thought.create({
    //         thoughtText,
    //         thoughtAuthor: context.user.username,
    //       });

    //       await User.findOneAndUpdate(
    //         { _id: context.user._id },
    //         { $addToSet: { thoughts: thought._id } }
    //       );

    //       return thought;
    //     }
    //     throw new AuthenticationError('You need to be logged in!');
    //   },
    //   addComment: async (parent, { thoughtId, commentText }, context) => {
    //     if (context.user) {
    //       return Thought.findOneAndUpdate(
    //         { _id: thoughtId },
    //         {
    //           $addToSet: {
    //             comments: { commentText, commentAuthor: context.user.username },
    //           },
    //         },
    //         {
    //           new: true,
    //           runValidators: true,
    //         }
    //       );
    //     }
    //     throw new AuthenticationError('You need to be logged in!');
    //   },
    //   removeThought: async (parent, { thoughtId }, context) => {
    //     if (context.user) {
    //       const thought = await Thought.findOneAndDelete({
    //         _id: thoughtId,
    //         thoughtAuthor: context.user.username,
    //       });

    //       await User.findOneAndUpdate(
    //         { _id: context.user._id },
    //         { $pull: { thoughts: thought._id } }
    //       );

    //       return thought;
    //     }
    //     throw new AuthenticationError('You need to be logged in!');
    //   },
    //   removeComment: async (parent, { thoughtId, commentId }, context) => {
    //     if (context.user) {
    //       return Thought.findOneAndUpdate(
    //         { _id: thoughtId },
    //         {
    //           $pull: {
    //             comments: {
    //               _id: commentId,
    //               commentAuthor: context.user.username,
    //             },
    //           },
    //         },
    //         { new: true }
    //       );
    //     }
    //     throw new AuthenticationError('You need to be logged in!');
    //   },
  },
};

module.exports = resolvers;
