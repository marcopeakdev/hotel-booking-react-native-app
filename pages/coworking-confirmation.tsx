import { useState } from "react";
import Image from "next/image";
import NavBarWrapper from "../components/NavBarWrapper";
import Footer from "../components/Footer";
import styles from "../styles/CoworkConfirmation.module.scss";

import MemberWhiteIcon from "../public/images/member-white-icon.png";
import InformationPanel from "../components/InformationPanel";

export default function CoworkingConfirmation({ data }) {
  return (
    <div className={styles.wrapper}>
      <NavBarWrapper
        className={styles.nav}
        logoSrc="/images/cowork-logo-black.png"
        isBack
        logoLink="/coworking"
      />
      <div className={styles.container}>
        <div className={styles.bannerContainer}>
          <div>
            <Image
              src={MemberWhiteIcon}
              alt="People laughing"
              width={75}
              height={75}
            />
          </div>
          <h2>Reservation Confirmed</h2>
          <p className={styles.productName}>{data?.name}</p>
          <div className={styles.descriptionContainer}>
            <p>Check-in Instructions:</p>
            <p>
              Please check-in with concierge to recieve your access key and
              other important details
            </p>
          </div>
        </div>
        <div className={styles.contentContainer}>
          <InformationPanel title="Booking Details">
            <div style={{ paddingRight: "3rem" }}>
              <p className={styles.labelText}>{data?.name}</p>
              <p>{data?.selectedPlan}</p>
              {/* <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
                <p>1919 S. Industrial Hwy Ann Arbor, MI 48104</p>
                <a className={styles.directionBtn}>Get Directions</a>
              </div> */}
              {data?.selectedDate && (
                <p>
                  Next Payment will be automatically charged on{" "}
                  {data?.selectedDate ? JSON.parse(data?.selectedDate)?.text : ""}
                </p>
              )}
            </div>
          </InformationPanel>
          <InformationPanel title="Summary">
            <div style={{ paddingRight: "3rem" }}>
              <div className={styles.values}>
                <p className={styles.labelText}>Membership</p>
                <p>{data?.selectedPlan}</p>
              </div>
              <div className={styles.values}>
                <p className={styles.labelText}>Expiration Date</p>
                <p>{data?.selectedDate ? JSON.parse(data?.selectedDate)?.text : ""}</p>
              </div>
              <div className={styles.values}>
                <p className={styles.labelText}>Total</p>
                <p>{data?.priceFormatted || "$0.00"}</p>
              </div>
            </div>
          </InformationPanel>
          <InformationPanel title="Contact Information">
            <div style={{ paddingRight: "3rem" }}>
              <div className={styles.values}>
                <p className={styles.labelText}>Name:</p>
                <p>{data?.contactName}</p>
              </div>

              <div className={styles.values}>
                <p className={styles.labelText}>Email:</p>
                <p>{data?.contactEmail}</p>
              </div>
              <div className={styles.values}>
                <p className={styles.labelText}>Phone:</p>
                <p>{data.contactPhone}</p>
              </div>
            </div>
          </InformationPanel>
          <InformationPanel title="Payment Information">
            <div style={{ paddingRight: "3rem" }}>
              <div className={styles.values}>
                <p className={styles.labelText}>Credit Card Number:</p>
                <p>Ending in {data?.cardNumber.slice(-4)}</p>
              </div>
              <div className={styles.values}>
                <p className={styles.labelText}>Expiration:</p>
                <p>{data?.expireAt}</p>
              </div>
              <div className={styles.values}>
                <p className={styles.labelText}>CVV:</p>
                <p>{data?.cvv}</p>
              </div>
              <div className={styles.values}>
                <p className={styles.labelText}>Zip Code:</p>
                <p>{data?.zipCode}</p>
              </div>
            </div>
          </InformationPanel>
        </div>
        <Footer className={styles.footer} />
      </div>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  if (!Object.keys(query).length) {
    return {
      redirect: {
        destination: '/coworking',
        permanent: false,
      },
    };
  }
  return {
    props: {
      data: query,
    },
  };
}
