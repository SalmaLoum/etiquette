const db = require('../config/connection')
const { User, Salon, Appointment, Service } = require('../models')
const userSeeds = require('./userSeeds.json')
const serviceSeeds = require('./serviceSeeds.json')
const salonSeeds = require('./salonSeeds.json')
const appointmentSeeds = require('./appointmentSeeds.json')
// const thoughtSeeds = require('./thoughtSeeds.json');
db.once('open', async () => {
  try {
    // await Thought.deleteMany({});
    await User.deleteMany({})
    await Salon.deleteMany({})
    await Appointment.deleteMany({})
    await Service.deleteMany({})
    await User.create(userSeeds)
    await Salon.create(salonSeeds)
    await Appointment.create(appointmentSeeds)
    await Service.create(serviceSeeds)
    // for (let i = 0; i < thoughtSeeds.length; i++) {
    //   const { _id, thoughtAuthor } = await Thought.create(thoughtSeeds[i]);
    //   const user = await User.findOneAndUpdate(
    //     { username: thoughtAuthor },
    //     {
    //       $addToSet: {
    //         thoughts: _id,
    //       },
    //     }
    //   );
    // }
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
  console.log('all done!')
  process.exit(0)
})
