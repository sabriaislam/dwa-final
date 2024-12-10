"use client";
import Link from "next/link";
import { useAuth } from "../context/AuthUserContext";

export default function Header() {
    const {signOut, authUser} = useAuth();
    return (
    <header>
      <div>
        <h1>Users & Auth</h1>
      </div>
      <nav>
        <ul>
          {authUser && (
            <>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <a onClick={signOut}>Log out</a>
              </li>
            </>
          )}

          {!authUser && (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/createUser">Create user</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

