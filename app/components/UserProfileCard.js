import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getFirestore, doc, getDoc, collection, query, where, getDocs, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthUserContext";

export default function UserProfileCard() {
    const [userBio, setUserBio] = useState("");
    const [newBio, setNewBio] = useState("");
    const [userPosts, setUserPosts] = useState([]);
    const { authUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!authUser) {
            router.push("/"); 
            return;
        }

        const fetchUserProfile = async () => {
            const db = getFirestore();
            const userDocRef = doc(db, "users", authUser.uid);

            try {
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    setUserBio(userDoc.data().bio || "No bio yet.");
                } else {
                    await setDoc(userDocRef, {
                        displayName: authUser.displayName || "User",
                        email: authUser.email,
                        bio: "",
                    });
                    setUserBio("");
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        const fetchUserPosts = async () => {
            const db = getFirestore();
            const postsCollection = collection(db, "posts");

            try {
                const userPostsQuery = query(postsCollection, where("userId", "==", authUser.uid));
                const snapshot = await getDocs(userPostsQuery);
                const postsData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setUserPosts(postsData);
            } catch (error) {
                console.error("Error fetching user posts:", error);
            }
        };

        fetchUserProfile();
        fetchUserPosts();
    }, [authUser, router]);
/*
    const handleBioUpdate = async () => {
        const db = getFirestore();
        const userDocRef = doc(db, "users", authUser.uid);

        try {
            await setDoc(userDocRef, { bio: newBio }, { merge: true }); // Merge bio with existing data
            setUserBio(newBio); // Update UI
            setNewBio("");
            alert("Bio updated successfully!");
        } catch (error) {
            console.error("Error updating bio:", error);
            alert("Failed to update bio. Try again.");
        }
    };
*/
    return (
        <div>
            <h1>User Profile</h1>
            {authUser && (
                <div>
                    <h2>Welcome, {authUser.displayName || "User"}!</h2>
                    <p>Email: {authUser.email}</p>
                </div>
            )}

            <div>
                <h2>Your Bio</h2>
                <p>{userBio}</p>
                <textarea
                    value={newBio}
                    onChange={(e) => setNewBio(e.target.value)}
                ></textarea>
                <button onClick={handleBioUpdate}>Update Bio</button>
            </div>

            <div>
                <h2>Your Posts</h2>
                {userPosts.length > 0 ? (
                    userPosts.map((post) => (
                        <div key={post.id}>
                            <h3>{post.postContent || "Untitled Post"}</h3>
                            <p>{post.date || "Date not provided"}</p>
                        </div>
                    ))
                ) : (
                    <p>You have not created any posts yet.</p>
                )}
            </div>
        </div>
    );
}
