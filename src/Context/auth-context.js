import { createContext } from "react";

export const AuthContext = createContext({ 
    isLoggeedIn: false,
    login: ()=>{},
    logout:()=>{} 
});