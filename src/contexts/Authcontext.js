import { createContext, useState, useContext } from "react";

export const AuthContext = createContext()

export const useAuthcontext = () => {
    return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('lms-user')) || null);
    return <AuthContext.Provider value={{authUser, setAuthUser}}>
        {children}
        </AuthContext.Provider>
}