

import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_SALON } from '../utils/queries';

const SingleSalon = () => {
    const { salonId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_SALON, {
        variables: { salonId: salonId },
    });
    const salon = data?.salon || {};

    if (loading) {
        return < div > loading... </div >
    }
    return (
        <div className='my-3'>
            <h3 className="card-header bg-dark text-light p-2 m-8">
                {salon.salonName}
                <span style={{ fontSize: '1rem' }}>
                    location: {salon.salonAddress}</span>
            </h3>
        </div>

    )
}

export default SingleSalon