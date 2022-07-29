import { AuthProvider } from "./api/auth/authContextProvider";
import '../styles/globals.css';

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
        <>
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </>
    );
}

export default MyApp;