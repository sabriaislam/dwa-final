import { useEffect } from "react"; 
import { useRouter } from "next/router"; 
import CreateUserForm from "@/app/components/CreateUserForm/createUsesrForm";
import { useAuth } from "../../context/AuthUserContext";



export default function CreateUser() {
    const {authUser} = useAuth;
    const router = useRouter(); 
    useEffect(() => {
        if (authUser) router.push("/"); 
    }, [authUser]); 
    return (
        <>
        <main>
            <h1>Create User</h1>
            <CreateUserForm/> 
        </main>
        </>
    )
} 

