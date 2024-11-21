import Image from "next/image";
import GoogleMapReact from "google-map-react";
import Link from "next/link";
import MainBgContainer from "../components/MainBgContainer";

import NavBarWrapper from "../components/NavBarWrapper";
import styles from "../styles/Stays.module.scss";
import LogoWhite from "../public/images/4m-logo-white.png";
import LogoGreen from "../public/images/4m-logo-green.png";
import StaysBg from "../public/images/stays-home-bg.png";
import StaysDefaultImg from "../public/images/stays-home-default.png";
import StaysSmallIcon from "../public/images/stays-small-icon.png";
import LocationPinIcon from "../public/images/location-pin.png";
import Footer from "../components/Footer";
import DescriptionContainer from "../components/DescriptionContainer";
import StayItem from "../components/StayItem";
import { getListings } from "../helpers/guestyApiCalls";
import MapPin from "../components/MapPin";

export default function Stays({ data }) {
  return (
    <div>
      <div className={styles.landing}>
        <NavBarWrapper
          className={styles.header}
          logoSrc="/images/stays-logo-black-text.png"
        />
      </div>
      <MainBgContainer
        className={styles.bgContainer}
        header="Traveling to Ann Arbor?"
        body={
          <>
            <p>
              Experience a lifestyle designed for the visionary traveler looking
              for all the comforts of next-level hospitality.
            </p>
            <p>
              With our fully-furnished townhomes, we’ve cracked the code on
              combining flexible space, style, and convenience...all at an
              affordable price. Wifi, utilities, cable package - setup are all
              included and ready to go, from day one.
            </p>
          </>
        }
        background={
          <Image
            src={StaysBg}
            alt="Stays"
            layout="fill"
            objectFit="cover"
            objectPosition="top"
          />
        }
        icon={
          <Image
            src={StaysSmallIcon}
            alt="Stays"
            layout="fill"
            objectFit="cover"
            objectPosition="top"
          />
        }
      />
      <DescriptionContainer
        header="Short-term Living"
        body={
          <p>
            Plans can change quickly. Need to stay for only a night, a week, or
            a month? We can accommodate you. If you need to extend your stay a
            bit longer, we’re happy to oblige. We’ll work with you to create a
            great experience no matter how long you are with us.
          </p>
        }
        logo={
          <Image
            src={LogoGreen}
            alt="Stays"
            layout="fill"
            objectFit="cover"
            objectPosition="top"
          />
        }
        logoStyle={{ top: -200 }}
        rightImage={
          <Image
            src={LogoWhite}
            alt="Stays"
            layout="fill"
            objectFit="cover"
            objectPosition="top"
          />
        }
        background="#01AF8F"
        addedContent={
          <>
            <p>
              Experience a lifestyle designed for the visionary traveler looking
              for all the comforts of next-level hospitality.
            </p>
            <p>
              With our fully-furnished townhomes, we’ve cracked the code on
              combining flexible space, style, and convenience...all at an
              affordable price. Wifi, utilities, cable package - setup are all
              included and ready to go, from day one.
            </p>
          </>
        }
      />
      <div className={styles.rowReverse}>
        <div className={styles.mapView}>
          {data.length && (
            // Need to put google API key to env
            <GoogleMapReact
              bootstrapURLKeys={{ key: "" }}
              defaultCenter={{
                address: data[0]?.address?.full,
                lat: data[0]?.address?.lat,
                lng: data[0]?.address?.lng,
              }}
              defaultZoom={17}
            >
              {data?.map((item, index) => {
                return (
                  <MapPin
                    title={(index + 1).toString()}
                    lat={item?.address?.lat}
                    lng={item?.address?.lng}
                    key={item?.address?.full}
                    pinImage={
                      <Image
                        src={LocationPinIcon}
                        alt="Stays"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="top"
                      />
                    }
                  />
                );
              })}
            </GoogleMapReact>
          )}
        </div>
        <div className={styles.listView}>
          {data.map((item) => (
            <Link
              key={item.title}
              href={{
                pathname: "/stays-listing",
                /* eslint no-underscore-dangle: 0 */
                query: { listingId: item._id },
              }}
            >
              <a>
                <StayItem
                  title={item.title}
                  description={
                    <div className={styles.row}>
                      <p>{item?.publicDescription?.summary}</p>
                      {item?.publicDescription?.summary && (
                        <p
                          style={{
                            width: 50,
                            display: "flex",
                            alignItems: "flex-end",
                          }}
                        >
                          ...
                        </p>
                      )}
                    </div>
                  }
                  price={`$${item?.prices?.basePrice} avg/night`}
                  itemImage={
                    <Image
                      src={
                        item?.picture && item?.picture?.regular
                          ? item?.picture?.regular
                          : StaysDefaultImg
                      }
                      alt="Stays"
                      layout="fill"
                      objectFit="cover"
                      objectPosition="top"
                    />
                  }
                />
              </a>
            </Link>
          ))}
          {!data.length && <p>No stays</p>}
        </div>
      </div>
      <Footer className={styles.footer} />
    </div>
  );
}

export async function getServerSideProps() {
  const listings = await getListings();
  return {
    props: {
      data: listings ?? [],
    },
  };
}
