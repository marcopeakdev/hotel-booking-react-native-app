import Image from "next/image";
import GoogleMapReact from "google-map-react";
import MainBgContainer from "../components/MainBgContainer";

import NavBarWrapper from "../components/NavBarWrapper";
import styles from "../styles/Stays.module.scss";
import BorderBottomImg from "../public/images/border-bottom.png";
import StaysListingBg from "../public/images/stays-listing-bg.png";
import StaysDefaultImg from "../public/images/stays-home-default.png";
import GreenLogo from "../public/images/4m-logo-green.png";
import GuestsIcon from "../public/images/icons/guests.png";
import RoomsIcon from "../public/images/icons/rooms.png";
import BedsIcon from "../public/images/icons/beds.png";
import BathroomIcon from "../public/images/icons/bathroom.png";
import StaysSmallIcon from "../public/images/stays-small-icon.png";
import Footer from "../components/Footer";
import { getListingById } from "../helpers/guestyApiCalls";
import MapPin from "../components/MapPin";
import ShoutOut from "../components/ShoutOut";
import ImageCarousel from "../components/ImageCarousel";

export default function StaysListing({ data }) {
  return (
    <div>
      <div className={styles.landing}>
        <NavBarWrapper
          className={styles.header}
          logoSrc="/images/stays-logo-black-text.png"
        />
      </div>
      <MainBgContainer
        className={styles.listingBgContainer}
        header={data?.title}
        body={
          <div>
            <div className={styles.row} style={{ marginTop: 10 }}>
              <div
                className={`${styles.columnCenter} ${styles.optionContainer}`}
              >
                <div className={styles.optionImageContainer}>
                  <Image
                    src={GuestsIcon}
                    alt="Stays"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="top 0 left 0"
                  />
                </div>
                <span>{data?.accommodates ?? 0} guests</span>
              </div>
              <div
                className={`${styles.columnCenter} ${styles.optionContainer}`}
              >
                <div className={styles.optionImageContainer}>
                  <Image
                    src={RoomsIcon}
                    alt="Stays"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="top 0 left 0"
                  />
                </div>
                <span>{data?.bedrooms ?? 0} bedrooms</span>
              </div>
              <div
                className={`${styles.columnCenter} ${styles.optionContainer}`}
              >
                <div
                  className={styles.optionImageContainer}
                  style={{ width: 60 }}
                >
                  <Image
                    src={BedsIcon}
                    alt="Stays"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="top 0 left 0"
                  />
                </div>
                <span>{data?.beds ?? 0} beds</span>
              </div>
              <div
                className={`${styles.columnCenter} ${styles.optionContainer}`}
              >
                <div className={styles.optionImageContainer}>
                  <Image
                    src={BathroomIcon}
                    alt="Stays"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="top 0 left 0"
                  />
                </div>
                <span>{data?.bathrooms ?? 0} bathroom</span>
              </div>
            </div>
            <div className={`${styles.row} ${styles.priceRow}`}>
              <div>
                <span
                  style={{ fontSize: 20, fontWeight: "bold", marginRight: 5 }}
                >
                  ${data?.prices?.basePrice}
                </span>
                <span>avg/night</span>
              </div>
              <button className="btn" type="button">BOOK</button>
            </div>
            <div style={{ position: "relative", width: "85vw" }}>
              <div>
                <h2 style={{ marginBottom: 20 }}>Amenities</h2>
                <div style={{ height: 5, position: "relative", width: "15%" }}>
                  <Image
                    src={BorderBottomImg}
                    alt="Stays"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="top 0 left 0"
                  />
                </div>
                <div className={styles.optionItemContainer}>
                  {data?.amenities?.map((item) => (
                    <div key={item} className={styles.optionItemStyle}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.logoRight}>
                <Image
                  src={GreenLogo}
                  alt="Stays"
                  layout="fill"
                  objectFit="contain"
                  objectPosition="top 0 left 0"
                />
              </div>
            </div>
          </div>
        }
        contentClassName={styles.listingBgContent}
        background={
          <Image
            src={StaysListingBg}
            alt="Stays"
            layout="fill"
            objectFit="scale-down"
            objectPosition="top 0 right 0"
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
      <div className={styles.imageContainer}>
        {data?.pictures?.map((picture) => (
          <div
            key={picture?.large}
            style={{ position: "relative", height: 296 }}
          >
            <Image
              src={picture.large ?? StaysDefaultImg}
              alt="Stays"
              layout="fill"
              objectFit="cover"
              objectPosition="fit"
            />
          </div>
        ))}
      </div>
      <div className={styles.mobileImageContainer}>
        <ImageCarousel
          pictures={data?.pictures}
          defaultImage={StaysDefaultImg}
          autoPlay
          interval={4000}
        />
      </div>
      <div style={{ height: 497 }}>
        {data && (
          // Need to put google API key to env
          <GoogleMapReact
            bootstrapURLKeys={{ key: "" }}
            defaultCenter={{
              address: data?.address?.full,
              lat: data?.address?.lat,
              lng: data?.address?.lng,
            }}
            defaultZoom={17}
          >
            <MapPin
              title=""
              lat={data?.address?.lat}
              lng={data?.address?.lng}
              className={styles.circlePin}
            />
          </GoogleMapReact>
        )}
      </div>
      <div className={styles.descriptionContainer}>
        <h2>Description</h2>
        <div style={{ height: 5, position: "relative", width: "15%" }}>
          <Image
            src={BorderBottomImg}
            alt="Stays"
            layout="fill"
            objectFit="cover"
            objectPosition="top 0 left 0"
          />
        </div>
        <p>{data?.publicDescription?.summary}</p>
        <h3>THE SPACE</h3>
        <p>{data?.publicDescription?.space}</p>
        <h3>NEIGHBORHOOD</h3>
        <p>{data?.publicDescription?.neighborhood}</p>
        <h3>RULES</h3>
        <p>{data?.publicDescription?.houseRules}</p>
        <h3>GUEST ACCESS</h3>
        <p>{data?.publicDescription?.access}</p>
        <h3>OTHER THINGS TO NOTE</h3>
        <p>{data?.publicDescription?.notes}</p>
        <h3>GETTING AROUND</h3>
        <p>{data?.publicDescription?.transit}</p>
      </div>
      <div className={styles.subContainer}>
        <div className={styles.subContentContainer}>
          <div style={{ flex: 1 }}>
            <h2 style={{ marginBottom: 10 }}>Experience 4m</h2>
            <p>
              Sed sodales elit nec est porttitor suscipit at quis est. Proin
              efficitur elit felis, pulvinar ultrices felis interdum vel. Cras
              ac venenatis nulla. Aliquam erat volutpat.
            </p>
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <button className="btn" type="button">BOOK</button>
          </div>
        </div>
      </div>
      <div style={{ display: "grid" }}>
        <ShoutOut
          className={styles.shoutout}
          topText="Come by and see Venue!"
          bottomText="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          leftLinkUrl="/tour"
          leftLinkText="book a tour"
          rightLinkUrl="/venue"
          rightLinkText="view venue"
        />
      </div>
      <Footer className={styles.footer} />
    </div>
  );
}

export async function getServerSideProps({ query }) {
  if (!query.listingId) {
    return {
      redirect: {
        destination: "/stays",
        permanent: false,
      },
    };
  }
  const listing = await getListingById(query.listingId);
  if (!listing) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data: listing,
    },
  };
}
