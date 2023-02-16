

import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_SALON } from '../utils/queries';
import AppointmentList from '../components/AppointmentList';
import AppointmentForm from '../components/AppointmentForm';

const SingleSalon = () => {
    const { salonId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_SALON, {
        variables: { salonId: salonId },
    });
    const salon = data?.salon || {};

    // Todo: Query for the Appointments List come back as an []
    // Todo: Query for all the services for that salon

    // if (loading) {
    //     return < div > loading... </div >
    // }
    return (
        <div className='my-3'>
            <h3 className="card-header bg-dark text-light p-2 m-8">
                {salon.salonName}
                <span style={{ fontSize: '1rem' }}>
                    location: {salon.salonAddress}</span>
            </h3>
            {/* For loop 5 times */}
            <AppointmentList service='mani/pedi' time='datetime' />
            <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
<AppointmentForm salonId={salon._id} />
</div>
        </div>

    )
}

export default SingleSalon