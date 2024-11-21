import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Input from "../components/Input";
import Button from "../components/Button";
import styles from "../styles/Auth.module.scss";

import {
  awsSignInEmail,
  awsCurrentAuthenticatedUser,
} from "../helpers/awsAuthCalls";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    awsCurrentAuthenticatedUser();
  }, []);

  const handleChange = (e) => {
    setLoginError(false);
    const setHook = e.target.id === "email" ? setEmail : setPassword;
    setHook(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    awsSignInEmail(email, password)
      .then((data) => {
        if (data.attributes) {
          if (query && query.redirectedTo) {
            router.push({
              pathname: `/${query.redirectedTo}`,
              query,
            });
          } else {
            router.push("../");
          }
        } else {
          setLoginError(true);
        }
      })
      .catch((error) => {
        /* eslint-disable no-console */
        console.log("Sign in error", error);
      });
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className={styles.authWrapper}>
        <div>
          <Link href="/">
            <a>
              <Image
                src="/images/4m_bolt.png"
                alt="4m"
                width="126"
                height="136"
              />
            </a>
          </Link>
          <h1>Log in</h1>
          {loginError && (
            <div className={styles.authError}>
              <p>There was an error logging you in. Please try again</p>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <Input
              id="email"
              label="Email Address:"
              type="email"
              name="email"
              value={email}
              placeholder=""
              onChange={handleChange}
              required
            />
            <Input
              id="password"
              label="Password:"
              type="password"
              name="password"
              value={password}
              placeholder=""
              onChange={handleChange}
              required
            />
            <div>
              <div className={styles.forgotLink}>
                <Link href="../forgot">
                  <a>Forgot password?</a>
                </Link>
              </div>
            </div>
            <Button type="submit" label="log in" />
          </form>
          <p>
            Don&apos;t have an account?{" "}
            <Link
              href={{
                pathname: "../create-account",
                query: query ?? {},
              }}
            >
              <a>Create an Account</a>
            </Link>
          </p>
        </div>
        <div>
          <Image
            src="/images/login-hero-image.jpg"
            alt="4m"
            className={styles.heroImage}
            layout="fill"
          />
        </div>
      </div>
    </>
  );
}
