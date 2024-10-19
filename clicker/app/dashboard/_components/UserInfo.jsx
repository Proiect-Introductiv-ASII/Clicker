"use client"; 

import { signOut } from 'next-auth/react';

const UserInfo = () => {
  return (
    <div>
        <div> 
            Name: 
            <span> eg </span>
        </div>
        <div>
            Email: 
            <span> eg </span>
        </div>
        <button
          onClick = { () => signOut() }
        > Log Out </button>
    </div>
  )
}

export default UserInfo