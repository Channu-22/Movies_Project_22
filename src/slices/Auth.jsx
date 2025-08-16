
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useState } from 'react'
import app from '../fireBase';

const AuthContext=createContext();

function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const Auth=getAuth(app);

    onAuthStateChanged(Auth,(loggedInUser)  => {
      setUser(loggedInUser);
    });


  return (
    <AuthContext.Provider value={{user, setUser}}>
      {children}
    </AuthContext.Provider>
  )

  
}

export function useAuth(){
    return useContext(AuthContext);
  }

export default AuthProvider;
