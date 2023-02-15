import React from 'react'
import { Link } from 'react-router-dom'
// import { Link } from 'react-router-dom';

const SalonList = ({ salons }) => {
  console.log(salons)
  if (!salons.length) {
    return <h3>No Salons selected Yet</h3>
  }

  return (
    <>
      <main className="flex-row  justify-center mb-10">
        <div className="col-12 col-lg-12">
          <div className="card">
            <h4 className="card-header text-center bg-dark text-light p-2">
              Salons
            </h4>
            <p className=" text-center text-black p-2">
             Click on your favorite salon from this list
            </p>

            <div className="card-body flex-row my-6">
              {salons &&
                salons.map((salon) => (
                  <div key={salon._id} className="col-12 mb-3 pb-3 ">
                    <div className="p-3">
                      <Link
                        className="btn  btn-lg btn-light btn-block btn-squared"
                        to={`/salons/${salon._id}`}
                      >
                        <h5 className="card-header bg-black text-light ">
                          {salon.salonName}
                          <span style={{ fontSize: '0.825rem' }}>
                            {salon.createdAt}
                          </span>
                        </h5>

                        <div className="card-body">
                          <p>Address: {salon.salonAddress}</p>
                          <p>Hours: {salon.salonHours}</p>
                        </div>
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

export default SalonList
