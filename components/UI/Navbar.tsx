import React from "react";
import Link from "next/link";
import classes from "../../styles/Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={classes["navbar"]}>
      <div className={classes["navbar-logo"]}>
        <Link href="/" replace>
          <a className={classes["navbar-logo__link"]}>Blog</a>
        </Link>
      </div>
      {/* <ul className={classes["navbar-links"]}>
        <li className={classes["navbar-links__link"]}>Create</li>
        <li className={classes["navbar-links__link"]}>About</li>
        <li className={classes["navbar-links__link"]}>Contact</li>
      </ul> */}
      <div className={classes["navbar-socials"]}>
        <a
          href="http://github.com/Joey-JJ/next-prisma-crud"
          className={classes["navbar-socials__github"]}
        >
          Github
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
