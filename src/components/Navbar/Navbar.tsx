import React from "react";
import Link from "next/link";
import styles from "./navbar.module.css";
import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";

const Navbar: React.FC = async () => {
  const { userId } = await auth();
  if (userId) {
    const user = await currentUser();
    console.log(
      "////////////////////////////////////////////////////////////////////////////////////////////////////user = ",
      user
    );
    console.log(
      "////////////////////////////////////////////////////////////////////////////////////////////////////userId = ",
      userId
    );
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">FreePay</Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/">Home</Link>
        </li>
        {!userId && (
          <li>
            <Link href="/sign-in">Login</Link>
          </li>
        )}
        {!userId && (
          <li>
            <Link href="/sign-up">Sign up</Link>
          </li>
        )}
        {userId && (
          <li>
            <UserButton userProfileUrl="/profile" afterSignOutUrl="/" />
          </li>
        )}
        {userId && (
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
        )}
        {userId && (
          <li>
            <Link href="/payment">Payment</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
