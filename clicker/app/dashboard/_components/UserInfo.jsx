"use client"; 

import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

const UserInfo = () => {
  const { data: session } = useSession(); 
  return (
    <div>
        <div> 
            Name: 
            <span> { session?.user?.name } </span>
        </div>
        <div>
            Email: 
            <span> { session?.user?.email } </span>
        </div>
        <button
          onClick = { () => signOut() }
        > Log Out </button>
    </div>
  )
}

export default UserInfo