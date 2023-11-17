import { createContext } from "react";

export const AuthContext = createContext({ 
    isLoggedIn: false,
    userId: null,
    email: null,
    token: null,
    login: ()=>{},
    logout:()=>{} 
});