import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuçthUserContext"; 
import { db, addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function CreatePost() {
  const [displayName, setDisplayName] = useState("");
  const [postContent, setPostContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (!user) {
        alert("You need to be logged in to create a post.");
        router.push("/login");
        return;
      }

      await addDoc(collection(db, "posts"), {
        displayName: displayName || user.displayName || "Anonymous User",
        postContent,
        userId: user.uid,
        timestamp: serverTimestamp(),
      });

      alert("Post created successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error creating post:", error.message);
      alert("Failed to create post. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="displayName">Display Name:</label>
        <input
          type="text"
          id="displayName"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Your display name"
        />
      </div>
      <div>
        <label htmlFor="postContent">Post Content:</label>
        <textarea
          id="postContent"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="Write your post here..."
        />
      </div>
      <button type="submit">Create Post</button>
    </form>
  );
}
