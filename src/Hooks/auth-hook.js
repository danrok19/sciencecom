import { useState, useCallback, useEffect } from 'react';

let logoutTimer;

export const useAuth = () =>{
    const [token, setToken] = useState(false);
    const [userId, setUserId] = useState();
    const [tokenExpirationDate, setTokenExpirationDate] = useState();
    const [userEmail, setUserEmail] = useState()
  
    const login = useCallback((uid, email, token, expirationDate) => {
      setToken(token);
      setUserId(uid);
      setUserEmail(email);
      const tokenExpirationDate = expirationDate || new Date( new Date().getTime() + 1000 * 60 * 60);
      setTokenExpirationDate(tokenExpirationDate);
      localStorage.setItem('userData', JSON.stringify({userId: uid, email: email, token: token, expiration: tokenExpirationDate.toISOString()}));
    }, []);
  
    const logout = useCallback(() => {
      setToken(token);
      setUserId(null);
      setUserEmail(null)
      setTokenExpirationDate(null);
      localStorage.removeItem('userData');
    }, []);
  
    useEffect(()=>{
      if(token && tokenExpirationDate){
        const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
        logoutTimer = setTimeout(logout, remainingTime);
      }
      else{
        clearTimeout(logoutTimer);
      }
    }, [token, logout, tokenExpirationDate])
  
    useEffect(()=>{
      const storedData = JSON.parse(localStorage.getItem('userData'));
      if(storedData && storedData.token && new Date(storedData.expiration) > new Date()){
        login(storedData.userId, storedData.email, storedData.token, new Date(storedData.expiration));
      } 
    }, [login]);

    return { token, login, logout, userId, userEmail };
}