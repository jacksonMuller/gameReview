import React from "react";
import { useState } from 'react'
import {SignIn, SignOut} from "./Auth"
import { useAuthentication } from "../services/authService"
const Navigation = () => {

  const user = useAuthentication()
  
  return (
    <nav className="flex justify-between flex-row border-solid border-2 p-5">
      <h1>Game Review</h1>
      {!user ? <SignIn /> : <SignOut />}
    </nav>
  );
};

export default Navigation;
