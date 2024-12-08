"use client";
import { useCallback } from "react";
import {useAuth} from "../context/AuthUserContext";

export default function CreateUserForm(){
    const {createUserWithEmailAndPassword, authUser} = useAuth();
    const createUserSubmit = useCallback(
        (e) => {preventDefault();
        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;
        return createUserWithEmailAndPassword(email,password);
        },[createUserWithEmailAndPassword]
    )
    
    return (
    <div>
        <h2>Create User Form</h2>
        <form
            className={styles.formWrapper}
            onSubmit={(e) => createUserSubmit(e)}
        >
            <label htmlFor="email">Email</label>
            <input type="email" name="email" />

            <label htmlFor="password">Password</label>
            <input type="password" name="password" />

            <button type="submit">Create User</button>
        </form>
      </div>
    );

};

