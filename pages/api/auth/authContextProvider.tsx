//Inside the AuthContext file.

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../config/firebaseConfig";
import { useContext, createContext, ReactNode, useState } from 'react';

type authContextType = {
    user: boolean | null;
    login: () => void;
    logout: () => void;
};

const authContextDefaultValues: authContextType = {
    user: null,
    login: () => {},
    logout: () => {},
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
    return useContext(AuthContext);
}

type Props = {
    children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<boolean|null>(null);
  const provider = new GoogleAuthProvider();

  const login = () => {
    console.log('login')
      signInWithPopup(auth, provider)
          .then((result) => {
              // This gives you a Google Access Token. You can use it to access the Google API.
              const credential = GoogleAuthProvider.credentialFromResult(result);
              const token = credential?.accessToken;
              // The signed-in user info.
              const user = result.user;
              console.log({ credential, token, user });
          })
          .catch((error) => {
              // Handle Errors here.
              const errorCode = error.code;
              const errorMessage = error.message;
              // The email of the user's account used.
              const email = error.email;
              // The AuthCredential type that was used.
              const credential = GoogleAuthProvider.credentialFromError(error);
              console.log({ errorCode, errorMessage, email, credential });
          });
  };

  const logout = () => {
      auth.signOut();
      console.log("logout");
  };

   const value = {
        user,
        login,
        logout,
    };

  return (
    <>
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    </>
  );
}