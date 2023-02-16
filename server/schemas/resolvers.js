const { AuthenticationError } = require('apollo-server-express')
const { User, Salon, Appointment, Service } = require('../models')
const { signToken } = require('../utils/auth')

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('salons')
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('salons')
    },
    salons: async () => {
      return Salon.find().sort({ createdAt: -1 })
    },

    salon: async (parent, { salonId }) => {
      return Salon.findOne({ _id: salonId }).populate('appointments')
    },
    appointments: async (parent, { salonId }) => {
      const params = salonId ? { salonId } : {}
      return Salon.find(params).populate('appointments')
    },

    appointment: async (parent, { appointmentId }) => {
      return Appointment.findOne({ _id: appointmentId })
    },

    services: async (parent, { appointmentId }) => {
      const params = appointmentId ? { appointmentId } : {}
      return Appointment.find(params).populate('services')
    },
    service: async (parent, { serviceId }) => {
      return Service.findOne({ _id: serviceId })
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('salons')
      }
      throw new AuthenticationError('You need to be logged in!')
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password })
      const token = signToken(user)
      return { token, user }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email })

      if (!user) {
        throw new AuthenticationError('No user found with this email address')
      }

      const correctPw = await user.isCorrectPassword(password)

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials')
      }

      const token = signToken(user)

      return { token, user }
    },

    addSalon: async (
      parent,
      { salonName, salonAddress, salonHours, salonImage },
      context,
    ) => {
      console.log(context)
      if (context.user) {
        const salon = await Salon.create({
          salonAddress,
          salonName,
          salonHours,
          salonImage,
        })

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { salons: salon._id } },
        )

        return salon
      }

      throw new AuthenticationError('You need to be logged in as an admin!')
    },
    addAppointment: async (parent, { salonId, datetime }, context) => {
      if (context.user) {
        const appointmentData = await Appointment.create({ datetime })

        return Salon.findOneAndUpdate(
          { _id: salonId },
          {
            $addToSet: {
              appointments: appointmentData._id,
            },
          },

          {
            new: true,
            runValidators: true,
          },
        ).populate('appointments')
      }
      throw new AuthenticationError(
        'You need to be logged in to book an appointment!',
      )
    },

    addService: async (parent, { appointmentId, serviceType }, context) => {
      if (context.user) {
        const serviceData = await Service.create({ serviceType })
        return Salon.findOneAndUpdate(
          { _id: { _id: appointmentId } },
          {
            $addToSet: {
              appointment: { services: serviceData._id },
            },
          },
          {
            new: true,
            runValidators: true,
          },
        )
          .populate('appointment')
          .populate('services')
      }
      throw new AuthenticationError(
        'You need to be logged in to book a service!',
      )
    },
  },
}

module.exports = resolvers



// if (!datetime) {
//   throw new AuthenticationError(
//     'You need to add a date and time to register an appointmnet!',
//   )
// }
