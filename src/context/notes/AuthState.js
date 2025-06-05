import React,{useState} from 'react'
import AuthContext from '../auth/authContext'

function AuthState(props) {
  const [token, setToken] = useState(null);

  return (
    <AuthContext.Provider value={{token, setToken}}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState;
