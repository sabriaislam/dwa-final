"use client";

import { useCallback } from "react";
import { useAuth } from "../context/AuthUserContext"; 
import { getFirestore, collection, addDoc } from "firebase/firestore"; 

export default function CreatePostForm() {
    const { authUser } = useAuth(); 

    const createPostSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            const postContent = e.currentTarget.postContent.value.trim();
            const timestamp = new Date();

            if (!authUser) {
                alert("You must be logged in to create a post.");
                return;
            }

            if (!postContent) {
                alert("Post content cannot be empty.");
                return;
            }

            try {
                const db = getFirestore();
                const postsCollection = collection(db, "post"); 

                await addDoc(postsCollection, {
                    content: postContent,
                    userId: authUser.uid,
                    userEmail: authUser.email,
                    timestamp: timestamp.toISOString(),
                });

                alert("Post created successfully!");
                e.currentTarget.reset(); 
            } catch (error) {
                console.error("Error creating post:", error);
                alert("There was an error creating the post. Please try again.");
            }
        },
        [authUser]
    );

    return (
        <div>
            <h2>Create Post</h2>
            <form
                className="formWrapper"
                onSubmit={(e) => createPostSubmit(e)}
            >
                <label htmlFor="postContent">Post Content</label>
                <textarea
                    name="postContent"
                    rows="4"
                    placeholder="What's on your mind?"
                ></textarea>
                <button type="submit">Create Post</button>
            </form>
        </div>
    );
}
