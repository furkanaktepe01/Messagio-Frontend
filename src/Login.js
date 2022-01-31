import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import { useNavigate } from "react-router-dom";
import axios from "./axios";


const Login = ({user, setUser}) => {

    let navigate = useNavigate();
    
    const loginResponse = async (response) => { 
        
        navigate("/app", { replace: true });
        const user = response.profileObj;  
        setUser(user);                     
        await axios.post("/signIn", user); 
    }
    
    const logoutResponse = () => {
        navigate("/", { replace: true });
        setUser(null);
    }
      
    const login = ( 
        <GoogleLogin
          clientId="817790278355-q74r64rgoda35633k1b38fkc22v65egh.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={loginResponse}
          cookiePolicy={'single_host_origin'}
        />
    );      
    
    const logout = (
        <GoogleLogout
          clientId="817790278355-q74r64rgoda35633k1b38fkc22v65egh.apps.googleusercontent.com"
          buttonText="Logout with Google"
          onLogoutSuccess={logoutResponse}
        />
    );
    
    return (
        <div>
            {user ? logout : login } 
        </div>
    )
}

export default Login;






