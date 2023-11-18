import { useState } from 'react'
import LoginBox from '../../Components/LoginBox/LoginBox'
import RegisterBox from '../../Components/RegisterBox/RegisterBox';
import video from '../../Assets/video.mp4';

const Login = () => {

  const [registerContent, setRegisterContent] = useState(false);
  const onSwitchToRegister = () => {
    setRegisterContent(true);
  }
  const onSwitchToLogin = () => {
    setRegisterContent(false);
  }


  return (
    <div style={{ minHeight: '100vh', background: '#950740', position: 'relative'}}>
      <div style={{position: 'absolute', zIndex: '1', background: '#850707', mixBlendMode: 'hard-light', height: '100%', width: '100%', top: '0', bottom: '0' }}/>
      <video src={video} muted autoPlay loop type="video/mp4" style={{position: 'absolute', zIndex: '0',  height: '100%', width: '100%', top: '0', bottom: '-5%', objectFit: 'cover'}}/>
      <div style={{position: 'relative', zIndex: '2'}}>
      {registerContent ?
        <RegisterBox onSwitchToLogin={onSwitchToLogin} />
        :
        <LoginBox onSwitchToRegister={onSwitchToRegister} />
      }
      </div>
    </div>
  )
}

export default Login
