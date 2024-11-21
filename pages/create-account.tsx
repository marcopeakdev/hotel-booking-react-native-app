import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { API, graphqlOperation } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api-graphql";

import Input from "../components/Input";
import Button from "../components/Button";

import {
  awsSignOut,
  awsCurrentAuthenticatedUser,
  awsSignInEmail,
  awsSignUpEmail,
  awsConfirmSignUpEmail,
} from "../helpers/awsAuthCalls";

import { listAccounts } from "../graphql/queries";
import { createAccount } from "../graphql/mutations";

import {
  verifyEmail,
  verifyNumberRequirement,
  verifyRangeRequirement,
  verifySpecialCharacterRequirement,
  verifyUppercaseCharacterRequirement,
} from "../helpers/formatStrings";

import styles from "../styles/Auth.module.scss";

export default function CreateAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [createAccountError, setCreateAccountError] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [hasRange, setHasRange] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialCharacter, setHasSpecialCharacter] = useState(false);
  const [hasUppercaseCharacter, setHasUppercaseCharacter] = useState(false);
  const [mismatchedPassword, setMismatchedPassword] = useState(true);
  const [isVerify, setIsVerify] = useState(false);
  const [verify, setVerify] = useState("");
  const [validVerify, setValidVerify] = useState(false);

  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    awsCurrentAuthenticatedUser();
    awsSignOut()
      .then(() => {
        console.log("user logged out");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    setCreateAccountError(false);
    if (e.target.id === "name") {
      setName(e.target.value);
    } else if (e.target.id === "email") {
      setEmail(e.target.value);
    } else if (e.target.id === "verify") {
      setVerify(e.target.value);
      setValidVerify(e.target.value.length >= 6);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setHasRange(verifyRangeRequirement(e.target.value));
    setHasNumber(verifyNumberRequirement(e.target.value));
    setHasSpecialCharacter(verifySpecialCharacterRequirement(e.target.value));
    setHasUppercaseCharacter(
      verifyUppercaseCharacterRequirement(e.target.value)
    );
  };

  const handleConfirmChange = (e) => {
    setConfirmPassword(e.target.value);
    if (password === e.target.value) {
      setMismatchedPassword(false);
      if (
        hasRange &&
        hasNumber &&
        hasSpecialCharacter &&
        hasUppercaseCharacter
      ) {
        setValidPassword(true);
      } else {
        setValidPassword(false);
      }
    } else {
      setValidPassword(false);
      setMismatchedPassword(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email,
      name,
      points: 0,
    };

    awsSignUpEmail(email, password)
      .then(async (data) => {
        if (
          data.message === "An account with the given email already exists."
        ) {
          if (query && query.redirectedTo) {
            router.push({
              pathname: "../login",
              query,
            });
          } else {
            router.push("../login");
          }
        } else {
          const newAccount = (await API.graphql(
            graphqlOperation(createAccount, { input: payload })
          )) as {
            newAccount: GraphQLResult;
            errors: any[];
          };
          setIsVerify(true);
        }
      })
      .catch((error) => {
        setCreateAccountError(true);
        console.log(error);
      });
  };

  const handleVerifySubmit = (e) => {
    e.preventDefault();
    console.log("verify", verify);

    awsConfirmSignUpEmail(email, verify)
      .then((success) => {
        if (success.toString().includes("CodeMismatchException")) {
          throw Error("Mismatch Error");
        }

        awsSignInEmail(email, password)
          .then((data) => {
            try {
              // need to do something
              if (query && query.redirectedTo) {
                router.push({
                  pathname: `/${query.redirectedTo}`,
                  query,
                });
              } else {
                router.push("../");
              }
            } catch (error) {
              console.log("error setting user data", error);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log("error validating", error);
      });
  };

  return (
    <>
      <Head>
        <title>Create Account</title>
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
          {!isVerify ? (
            <>
              <h1>Create Account</h1>
              {createAccountError && (
                <div className={styles.authError}>
                  <p>
                    There was an error creating your account. Please try again.
                  </p>
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <Input
                  id="name"
                  label="Name:"
                  type="text"
                  name="name"
                  value={name}
                  placeholder=""
                  onChange={handleChange}
                  required
                />
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
                  onChange={handlePasswordChange}
                  required
                />
                <div className={styles.verification}>
                  <p className={hasRange ? styles.passed : ""}>
                    8 - 20 characters
                  </p>
                  <p className={hasNumber ? styles.passed : ""}>
                    At least 1 number
                  </p>
                  <p className={hasSpecialCharacter ? styles.passed : ""}>
                    At least 1 special character
                  </p>
                  <p className={hasUppercaseCharacter ? styles.passed : ""}>
                    At least 1 uppercase character
                  </p>
                </div>
                <Input
                  id="confirmPassword"
                  label="Confirm Password:"
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  placeholder=""
                  onChange={handleConfirmChange}
                  required
                />
                <Button
                  disabled={!validPassword}
                  type="submit"
                  label="create account"
                />
              </form>
              <p>
                Already have an account?{" "}
                <Link
                  href={{
                    pathname: "../login",
                    query: query ?? {},
                  }}
                >
                  <a>Login</a>
                </Link>
              </p>
            </>
          ) : (
            <>
              <h1>Verify Account</h1>
              <form onSubmit={handleVerifySubmit}>
                <Input
                  id="verify"
                  label="6-digit Verification:"
                  type="text"
                  name="verify"
                  value={verify}
                  placeholder=""
                  onChange={handleChange}
                  required
                />
                <Button disabled={!validVerify} type="submit" label="verify" />
              </form>
            </>
          )}
        </div>
        <div>
          <Image
            src="/images/band-event-gathering.jpg"
            alt="4m"
            className={styles.heroImage}
            layout="fill"
          />
        </div>
      </div>
    </>
  );
}
