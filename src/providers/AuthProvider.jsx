import { createContext,  useState } from "react";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import PropTypes from 'prop-types';

export const AuthContext = createContext(null);


const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signIn = (email,password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }


    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }
    
    const authInfo = {
        user,
        setUser,
        signIn,
        logOut,
        loading,
       
    };

 

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};


AuthProvider.propTypes = {
    children: PropTypes.node ,
}


export default AuthProvider;