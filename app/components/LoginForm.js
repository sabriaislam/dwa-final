"use client";
import { useCallback } from "react";
import { useAuth } from "../context/AuthUserContext";

export default function LoginForm() {
    
    const {signInWithEmailAndPassword, authUser} = useAuth();
    const loginSubmit = useCallback(
        (e) => {preventDefault();
        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;
        return signInWithEmailAndPassword(email,password);
        },[signInWithEmailAndPassword]
    )
    
    return (
      <div>
        <h2>Login Form</h2>
        <form
          onSubmit={(e) => loginSubmit(e)}
        >
          <label htmlFor="email">Email</label>
          <input type="email" name="email" />
  
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
  
          <button type="submit">Login User</button>
        </form>
      </div>
    );
  }

  