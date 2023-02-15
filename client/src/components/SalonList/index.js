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
      <h3
        className="p-5 display-inline-block"
        style={{ borderBottom: '1px dotted #1a1a1a' }}
      >
        Salons
      </h3>
      <div className="flex-row my-4">
        {salons &&
          salons.map((salon) => (
            <div key={salon._id} className="col-12 mb-3 pb-3">
              <div className="p-3 bg-dark text-light">
                <Link
                  className='btn btn-primary btn-block btn-squared'
                  to={`/salons/${salon._id}`}
                >
                  <h5 className="card-header">
                    {salon.salonName}
                    <span style={{ fontSize: '0.825rem' }}>
                      on {salon.createdAt}
                    </span>
                  </h5>

                  <p className="card-body">{salon.salonHours}</p>
                </Link>
              </div>
              {/* <Link
                className="btn btn-primary btn-block btn-squared"
                to={`/th`} */}
            </div>
          ))}
      </div>
    </>
  )
}

export default SalonList;
