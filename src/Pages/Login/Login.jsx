import { useState } from 'react'
import LoginBox from '../../Components/LoginBox/LoginBox'
import RegisterBox from '../../Components/RegisterBox/RegisterBox';

const Login = () => {

  const [registerContent, setRegisterContent] = useState(false);
  const onSwitchToRegister = () =>{
    setRegisterContent(true);
  }
  const onSwitchToLogin = () =>{
    setRegisterContent(false);
  }


  return (
    <div style={{height: '100vh', background: '#950740'}}>
      {registerContent ? 
      <RegisterBox onSwitchToLogin={onSwitchToLogin}/>
    :
    <LoginBox onSwitchToRegister={onSwitchToRegister}/>
    }
    </div>
  )
}

export default Login
