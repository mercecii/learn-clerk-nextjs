import React from "react";
import Link from "next/link";
import styles from "./navbar.module.css";
import { UserButton } from "@clerk/nextjs";

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">FreePay</Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
        <li>
          <UserButton userProfileUrl="/profile" afterSignOutUrl="/" />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
