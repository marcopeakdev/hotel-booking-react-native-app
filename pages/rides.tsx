import Image from "next/image";
import MainBgContainer from "../components/MainBgContainer";

import NavBarWrapper from "../components/NavBarWrapper";
import styles from "../styles/Rides.module.scss";
import LogoWhite from "../public/images/4m-logo-white.png";
import LogoOrange from "../public/images/4m-logo-orange.png";
import RidesBg from "../public/images/rides-home-bg.png";
import RidesSmallIcon from "../public/images/rides-small-icon.png";
import MobilityBg from "../public/images/mobility-bg.png";
import PlayStoreIcon from "../public/images/playstore.png";
import AppStoreIcon from "../public/images/appstore.png";
import Footer from "../components/Footer";
import DescriptionContainer from "../components/DescriptionContainer";
import DetailContainer from "../components/DetailContainer";
import { getEntriesByType } from "../helpers/contentfulApiCalls";

export default function Rides({ data }) {
  return (
    <div>
      <div className={styles.landing}>
        <NavBarWrapper
          className={styles.header}
          logoSrc="/images/rides-logo-black-text.png"
        />
      </div>
      <MainBgContainer
        className={styles.bgContainer}
        header="Getting around town has never been this electric"
        background={
          <Image
            src={RidesBg}
            alt="Stays"
            layout="fill"
            objectFit="cover"
            objectPosition="top"
          />
        }
        icon={
          <Image
            src={RidesSmallIcon}
            alt="Stays"
            layout="fill"
            objectFit="cover"
            objectPosition="top"
          />
        }
      />
      <DescriptionContainer
        header="Electric Car Fleet"
        body={
          <>
            <p>{data?.generalCopy}</p>
            <div className={styles.buttonContainer}>
              <div className={styles.playstore}>
                <Image
                  src={PlayStoreIcon}
                  alt="Playstore"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="top"
                  className={styles.playstore}
                />
              </div>
              <div className={styles.appstore}>
                <Image
                  src={AppStoreIcon}
                  alt="App Store"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="top"
                  className={styles.appstore}
                />
              </div>
            </div>
          </>
        }
        rightImage={
          <Image
            src={LogoWhite}
            alt="Stays"
            layout="fill"
            objectFit="cover"
            objectPosition="top"
          />
        }
        logo={
          <Image
            src={LogoOrange}
            alt="Stays"
            layout="fill"
            objectFit="cover"
            objectPosition="top"
          />
        }
        logoStyle={{ top: -145 }}
        background="#E48600"
      />
      {data?.apps?.map((item) => (
        <DetailContainer
          key={item?.fields?.title}
          header={item?.fields?.title}
          body={
            <>
              <p>{item?.fields?.description}</p>
              <div className={styles.buttonContainer}>
                <a href={item?.fields?.googleLink}>
                  <div className={styles.playstore}>
                    <Image
                      src={PlayStoreIcon}
                      alt="Playstore"
                      layout="fill"
                      objectFit="cover"
                      objectPosition="top"
                      className={styles.playstore}
                    />
                  </div>
                </a>
                <a href={item?.fields?.iosLink}>
                  <div className={styles.appstore}>
                    <Image
                      src={AppStoreIcon}
                      alt="App Store"
                      layout="fill"
                      objectFit="cover"
                      objectPosition="top"
                      className={styles.appstore}
                    />
                  </div>
                </a>
              </div>
            </>
          }
          image={
            <Image
              src={
                item?.fields?.photo
                  ? `http:${item?.fields?.photo.fields.file.fields.file.url}`
                  : MobilityBg
              }
              alt="Mobility"
              layout="fill"
              objectFit="cover"
              objectPosition="top"
            />
          }
        />
      ))}
      <Footer className={styles.footer} />
    </div>
  );
}

export async function getServerSideProps() {
  const data = await getEntriesByType("rides");
  if (data) {
    const filtered: any = data.find((c) => c.fields.apps);
    return {
      props: {
        data: {
          apps: filtered.fields.apps,
          generalCopy: filtered.fields.copy,
        },
      },
    };
  }
  return {
    props: {
      data: {
        apps: [],
        generalCopy: "",
      },
    },
  };
}
