import { createContext, useState , useContext} from "react";

const LoginAuthContext = createContext({})

export const useLogAuth = () =>{
    return useContext(LoginAuthContext) ;
}

export const LoginAuthProvider = ({children}) =>{
    const [auth, setAuth] = useState({})

    return (
        <LoginAuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </LoginAuthContext.Provider>
    )
}

export default LoginAuthContext