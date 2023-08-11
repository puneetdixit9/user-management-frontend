import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom';


const UserProfile = () => {
    const { userId } = useParams();
    return (
        <>
            <h1>User Profile for user id : {userId}</h1>
        </>
    )
}

export default UserProfile
