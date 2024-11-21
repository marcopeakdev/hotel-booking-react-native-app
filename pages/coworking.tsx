import Image from "next/image";
import Router from "next/router";
import NavBarWrapper from "../components/NavBarWrapper";
import Footer from "../components/Footer";
import styles from "../styles/Cowork.module.scss";

import CoworkHomeBg from "../public/images/cowork-home-bg.png";
import ResourceDefaultBg from "../public/images/resource-default-bg.png";
import CoworkTopContainer from "../components/CoworkTopContainer";
import CoworkCard from "../components/CoworkCard";
import ResourceCard from "../components/ResourceCard";
import { getResources } from "../helpers/nexudusApiCalls";
import { stripeHTML } from "../helpers/util";
import { getEntriesByType } from "../helpers/contentfulApiCalls";

export default function Coworking({ data }) {
  return (
    <div className={styles.wrapper}>
      <NavBarWrapper
        className={styles.nav}
        logoSrc="/images/cowork-logo-white.png"
        logoLink="/coworking"
      />
      <div className={styles.container}>
        <CoworkTopContainer
          className={styles.hero}
          header="Work how you want to work"
          body={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla maximus
        interdum nibh, eu vehicula risus vehicula ac. In at leo vitae urna lacinia
        vulputate luctus a erat.`}
          background={
            <Image
              src={CoworkHomeBg}
              alt="People laughing"
              layout="fill"
              objectFit="cover"
              objectPosition="top"
            />
          }
        />
        <div className={styles.cardsContainer}>
          <div className={styles.cardsRow}>
            <CoworkCard
              title="Day Pass"
              description="Looking for commitment free options to get work done? Get access to work at Venue in the community area for the day or reserve a hot desk in our private coworking area for a day."
              linkText="Purchase Day Pass"
              linkUrl="/coworking-pricing?tab=0"
            />
            <CoworkCard
              title="Dedicated Member"
              description="Got a lot of work to get done? Get your own dedicated desk or office in our pivate coworking area to work and jam on projects. You’ll have monthly access allowing you to come and go as you please! "
              linkText="Purchase Membership"
              linkUrl="/coworking-pricing?tab=1"
            />
          </div>
        </div>
        <div className={styles.resourceContainer}>
          <div className={styles.resourceHeader}>
            <div className={styles.titleContainer}>
              <h2>Book A Resource</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus lobortis nunc id orci luctus laoreet. Phasellus eget
                semper nunc.Lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Phasellus lobortis nunc id orci luctus laoreet. Phasellus
                eget semper nunc.
              </p>
            </div>
            <div className={styles.headerButtonContainer}>
              <button
                type="button"
                className={`btn ${styles.outlineButton}`}
                onClick={() => Router.push("/coworking-all")}
              >
                VIEW ALL RESOURCES
              </button>
            </div>
          </div>
          
        </div>
      </div>
      <Footer className={styles.footer} />
    </div>
  );
}

export async function getServerSideProps() {
  const resources = await getResources();

  const contentful = await getEntriesByType("resources");
  const filteredContentful = contentful?.filter(
    (item) => item.fields.name && item.fields.image
  );

  let resourceData = [];
  if (resources) {
    resourceData = resources.map((item) => {
      const content = filteredContentful?.find(
        (val) => val.fields.name.trim() === item.Name.trim()
      );
      if (content) {
        item.image = `https:${content.fields.image.fields.file.url}`;
      }
      return item;
    });
  }
  return {
    props: {
      data: resourceData ?? [],
    },
  };
}
