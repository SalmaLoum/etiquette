import React from 'react';

const SalonList = ({ salons = [] }) => {
  if (!salons.length) {
    return <h3>No Salons Yet</h3>;
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
                <h5 className="card-header">
                  {salon.salonName} commented{' '}
                  <span style={{ fontSize: '0.825rem' }}>
                    on {salon.createdAt}
                  </span>
                </h5>
                <p className="card-body">{salon.salonHours}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default SalonList;
