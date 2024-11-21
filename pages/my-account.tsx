import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { awsSignOut } from "../helpers/awsAuthCalls";

import Button from "../components/Button";

import styles from "../styles/Auth.module.scss";

export default function MyAccount() {
  const [authedUser, setAuthedUser] = useState(true);
  const router = useRouter();

  const handleSubmit = (e) => {
    awsSignOut()
      .then(() => {
        setAuthedUser(false);
        router.push("../");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Head>
        <title>My Account</title>
      </Head>
      <div className={styles.authWrapper}>
        <Button type="button" onClick={handleSubmit} label="Log Out" />
      </div>
    </>
  );
}
