import { useEffect } from "react";
import { useRouter } from "next/router";
import LoginForm from "@/components/LoginForm";
import { useAuth } from "../app/context/AuthUserContext";

export default function Login() {
    const {authUser} = useAuth;
    const router = useRouter(); 
    useEffect(() => {
        if (authUser) router.push("/"); 
    }, [authUser]); 

  return (
    <div>
      <LoginForm />
    </div>
  );
}