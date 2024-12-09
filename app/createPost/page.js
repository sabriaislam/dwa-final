"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import CreatePostForm from "../components/createPostForm";
import {useAuth} from "../context/AuthUserContext";

export default function CreatePost() {
    const {authUser} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (authUser) router.push('/')
      }, [authUser])

    return (
        <main>
            <CreatePostForm/>
        </main>
    );
}
