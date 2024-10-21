"use client";

import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

const UserInfo = () => {
  const { data: session } = useSession();
  return (
    <div className="user-info-page">
      <div className="user-info-container form-style">
        <div className="user-info-item">
          Name:
          <span className="user-info-value"> {session?.user?.name} </span>
        </div>
        <div className="user-info-item">
          Email:
          <span className="user-info-value"> {session?.user?.email} </span>
        </div>
        <button className="logout-button" onClick={() => signOut()}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
