import React,{useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/auth/authContext';

function Login(props) {

    const {setToken} = useContext(AuthContext);
    const [credentials, setCredentials] = useState({email: "",password: ""});
    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: credentials.email,password: credentials.password})
       });
       const json = await response.json();
       console.log(json);
       if(json.success){
          //save the auth token and redirect
          setToken(json.authtoken)
          props.showAlert("login in successfully","success")
          navigate("/");
       }
       else{
          props.showAlert("Invaild Details","danger")
       }
    }

    const onChange = (e)=>{
      setCredentials({...credentials, [e.target.name]: e.target.value})
    }

  return (
    <div>
      <h2>Login to Continue to Mynotebook</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} value={credentials.email}/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" onChange={onChange} value={credentials.password}/>
            </div>
            <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
    </div>
  )
}

export default Login
