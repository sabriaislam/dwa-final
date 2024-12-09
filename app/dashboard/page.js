import { useCallback, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import Header from "../components/header";
import firebaseConfig from "@/app/lib/firebaseConfig";

export default function Dashboard({ Component, pageProps }) {
    const [appInitialized, setAppInitialized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInformation, setUserInformation] = useState(null);
    const [error, setError] = useState(null);

    // Create User
    const createUser = useCallback(
        (e) => {
            e.preventDefault();
            const email = e.currentTarget.email.value;
            const password = e.currentTarget.password.value;
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    setIsLoggedIn(true);
                    setUserInformation(user);
                    setError(null);
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    console.warn({ error });
                    setError(errorMessage);
                });
        },
        [setError, setIsLoggedIn, setUserInformation]
    );

    // Login User
    const loginUser = useCallback(
        (e) => {
            e.preventDefault();
            const email = e.currentTarget.email.value;
            const password = e.currentTarget.password.value;
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    setIsLoggedIn(true);
                    setUserInformation(user);
                    setError(null);
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    console.warn({ error });
                    setError(errorMessage);
                });
        },
        [setError, setIsLoggedIn, setUserInformation]
    );

    // Logout User
    const logoutUser = useCallback(() => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                setUserInformation(null);
                setIsLoggedIn(false);
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.warn({ error });
                setError(errorMessage);
            });
    }, [setError, setIsLoggedIn, setUserInformation]);

    // Initialize Firebase App
    useEffect(() => {
        initializeApp(firebaseConfig);
        setAppInitialized(true);
    }, []);

    // Manage Authentication State
    useEffect(() => {
        if (appInitialized) {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setUserInformation(user);
                    setIsLoggedIn(true);
                } else {
                    setUserInformation(null);
                    setIsLoggedIn(false);
                }
                setIsLoading(false);
            });
        }
    }, [appInitialized]);

    if (isLoading) return null;

    // Main Render
    return (
        <>
            <Header/>
            <main>
                <Component
                    {...pageProps}
                    createUser={createUser}
                    loginUser={loginUser}
                    logoutUser={logoutUser}
                    isLoggedIn={isLoggedIn}
                    userInformation={userInformation}
                />
                {error && <p>Error: {error}</p>}
            </main>
        </>
    );
}
