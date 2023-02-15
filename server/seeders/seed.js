const db = require('../config/connection');
const { User, Salon, Appointment, Service } = require('../models');

const userSeeds = require('./userSeeds.json');
// const serviceSeeds = require('./serviceSeeds.json')
const salonSeeds = require('./salonSeeds.json')
const appointmentSeeds = require('./appointmentSeeds.json')


db.once('open', async () => {
  try {
    // await Thought.deleteMany({});
    await User.deleteMany({});
    await Salon.deleteMany({});
    await Appointment.deleteMany({})
    // await Service.deleteMany({})


    await User.create(userSeeds);
    await Salon.create(salonSeeds);
    // await Appointment.create(appointmentSeeds)
    // await Service.create(serviceSeeds)

    for (let i = 0; i < appointmentSeeds.length; i++) {
      await Appointment.create(appointmentSeeds[i]);
    }

    // TODO: Find all Salons
    // Todo: Find all appointments
    const appointments = await Appointment.find({})
    console.log(appointments)
    // Todo: Map through salons
    // Todo: Map through appointments inside salons
    // Todo: Push one appointment into array and repeat for all apointments

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('all done!');
  process.exit(0);
});