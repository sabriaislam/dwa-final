import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useAuth } from "./app/context/AuthUserContext";

export default function Dashboard() {
    const [posts, setPosts] = useState([]);
    const { authUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!authUser) {
            router.push("/");
            return;
        }

        const fetchPosts = async () => {
            const db = getFirestore();
            const postsCollection = collection(db, "posts");

            try {
                const snapshot = await getDocs(postsCollection);
                const postsData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setPosts(postsData);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, [authUser, router]);

    return (
        <div>
            <h1>Timeline</h1>
            <div>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post.id}>
                            <h2>{post.postContent || "Untitled Post"}</h2>
                            {post.displayname ? <p>By: {post.displayname}</p> : <p>Author not provided</p>}
                            <p>{post.date || "Date not provided"}</p>
                        </div>
                    ))
                ) : (
                    <p>No posts to display.</p>
                )}
            </div>
        </div>
    );
}
