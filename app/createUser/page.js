import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthUserContext";

export default function CreateUser() {
  const { authUser } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (authUser) {
      router.push("/login");
    }
  }, [authUser]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });
      await setDoc(doc(db, "users", user.uid), {
        bio: "",
      });

      alert("Account created successfully!");
      router.push("/profile");
    } catch (error) {
      console.error("Error creating account:", error.message);
      alert("Failed to create account. Please try again.");
    }
  };

  return (
    <main>
      <h1>Create User</h1>
      <form onSubmit={handleSignUp}>
        <label>
          Name:
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Create Account</button>
      </form>
    </main>
  );
}

