import React from 'react'
import { Link } from 'react-router-dom'
// import { Link } from 'react-router-dom';

const AppointmentList = ({ appointments = [] }) => {
  console.log(appointments)
  if (!appointments.length) {
    return <h3>No Appointments selected Yet</h3>
  }

  return (
    <>
      <main className="flex-row  justify-center mb-10">
        <div className="col-12 col-lg-12">
          <div className="card">
            <h4 className="card-header text-center bg-dark text-light p-2">
              Appointments
            </h4>
            <p className=" text-center text-black p-2">
              Click on your favorite appointment on this list
            </p>

            <div className="card-body flex-row my-6">
              {appointments &&
                appointments.map((appointment) => (
                  <div key={appointment._id} className="col-12 mb-3 pb-3 ">
                    <div className="p-3">
                      <Link
                        className="btn btn-lg btn-light btn-block btn-squared"
                        to={`/appointments/${appointment._id}`}
                      >
                        <h5 className=" text-black ">
                          {appointment.datetime}
                          <span style={{ fontSize: '0.825rem' }}>
                            {appointment.createdAt}
                          </span>
                        </h5>

                        {/* <div className="card-body">
                                                    <p>Address: {salon.salonAddress}</p>
                                                    <p>Hours: {salon.salonHours}</p>
                                                </div> */}
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default AppointmentList
