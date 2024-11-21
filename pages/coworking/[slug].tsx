import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import NavBarWrapper from "../../components/NavBarWrapper";
import Footer from "../../components/Footer";
import styles from "../../styles/CoworkDetail.module.scss";
import { getResources } from "../../helpers/nexudusApiCalls";

import CoworkDetailBg from "../../public/images/cowork-detail-bg.png";
import ResourceDefaultBg from "../../public/images/resource-default-bg.png";
import CoworkDetailOption1 from "../../public/images/cowork-detail-option-1.png";
import SeatsIcon from "../../public/images/seats-icon.png";
import WifiIcon from "../../public/images/wifi-icon.png";
import TVIcon from "../../public/images/tv-icon.png";
import ACIcon from "../../public/images/ac-icon.png";
import WhiteboardIcon from "../../public/images/whiteboard-icon.png";
import ReservationIcon from "../../public/images/reservation-icon.png";
import Calendar from "../../components/Calendar";
import TimePicker from "../../components/TimePicker";
import AddonPicker from "../../components/AddonPicker";
import ShoutOut from "../../components/ShoutOut";
import ImageCarousel from "../../components/ImageCarousel";
import { getEntriesByType } from "../../helpers/contentfulApiCalls";
import { MONTH_NAMES, WEEK_DAY_NAMES } from "../../constants/date";

export default function CoworkingDetail({ data }) {
  const router = useRouter();
  const current = new Date();
  const day = `${current.getFullYear()}-${current.getMonth()}-${current.getDate()}`;
  const [showFixedBNav, setShowFixedNav] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [addOns, setAddOns] = useState([]);
  const [selectedDate, setSelectedDate] = useState({
    text: `${WEEK_DAY_NAMES[new Date(day).getDay()]}, ${
      MONTH_NAMES[new Date(day).getMonth() + 1]
    } ${new Date(day).getDate()}`,
    value: day,
  });
  const [selectedTime, setSelectedTime] = useState([]);

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY < 300) {
        setShowFixedNav(false);
      } else {
        setShowFixedNav(true);
      }
    }
  };

  const handleBook = () => {
    document.body.style.overflow = "hidden";
    setShowSchedule(true);
  };

  const handleConfirm = () => {
    setShowSchedule(false);
    document.body.style.overflow = "auto";
    console.log(selectedDate);
    router.push({
      pathname: "/coworking-pricing",
      query: {
        ...data,
        selectedDate: JSON.stringify(selectedDate),
        selectedTime,
        addOns,
      },
    });
  };

  const handleCancel = () => {
    setShowSchedule(false);
  };

  const handleToSignup = () => {
    router.push('/create-account');
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <NavBarWrapper
        className={styles.nav}
        logoSrc="/images/cowork-logo-black.png"
        isBack
        logoLink="/coworking"
      />
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <div className={styles.headerContentContainer}>
            <div className={styles.contentPart}>
              <div className={styles.headerPart}>
                <h1>{data?.Name}</h1>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div className={styles.headerIconContainer}>
                    <div className={styles.headerIcon}>
                      <Image
                        src={SeatsIcon}
                        alt="Seats"
                        layout="fill"
                        objectFit="contain"
                        objectPosition="top"
                      />
                    </div>
                    <p>{data?.Allocation} Seats</p>
                  </div>
                  {data?.Internet && (
                    <div className={styles.headerIconContainer}>
                      <div className={styles.headerIcon}>
                        <Image
                          src={WifiIcon}
                          alt="Wifi"
                          layout="fill"
                          objectFit="contain"
                          objectPosition="top"
                        />
                      </div>
                      <p>Wifi</p>
                    </div>
                  )}
                  {data?.LargeDisplay && (
                    <div className={styles.headerIconContainer}>
                      <div className={styles.headerIcon}>
                        <Image
                          src={TVIcon}
                          alt="TV"
                          layout="fill"
                          objectFit="contain"
                          objectPosition="top"
                        />
                      </div>
                      <p>TV</p>
                    </div>
                  )}
                  {data?.AirConditioning && (
                    <div className={styles.headerIconContainer}>
                      <div className={styles.headerIcon}>
                        <Image
                          src={ACIcon}
                          alt="AC"
                          layout="fill"
                          objectFit="contain"
                          objectPosition="top"
                        />
                      </div>
                      <p>AC</p>
                    </div>
                  )}
                  {data?.Whiteboard && (
                    <div className={styles.headerIconContainer}>
                      <div className={styles.headerIcon}>
                        <Image
                          src={WhiteboardIcon}
                          alt="Whiteboard"
                          layout="fill"
                          objectFit="contain"
                          objectPosition="top"
                        />
                      </div>
                      <p>Whiteboard</p>
                    </div>
                  )}
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: data?.Description ?? "" }}
                />
                <div className={styles.priceContainer}>
                  <div className={styles.buttonContainer}>
                    <button className="btn" onClick={handleBook}>Book Now</button>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.headerImageContainer}>
              <Image
                src={data?.image ?? CoworkDetailBg}
                alt="People laughing"
                layout="fill"
                objectFit="cover"
                objectPosition="top"
              />
            </div>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <div className={styles.firstImage}>
            <Image
              src={data?.image ?? ResourceDefaultBg}
              alt="People laughing"
              layout="fill"
              objectFit="cover"
              objectPosition="top"
            />
          </div>
        </div>
        <div className={styles.mobileImageContainer}>
          <ImageCarousel
            pictures={[
              {
                large: data?.image ?? ResourceDefaultBg,
              },
            ]}
            defaultImage={CoworkDetailOption1}
            autoPlay
            interval={4000}
          />
        </div>
        <div className={styles.descriptionContainer}>
          <div className={styles.descriptionContentContainer}>
            <h1>Description</h1>
            <div dangerouslySetInnerHTML={{ __html: data?.Description }} />
          </div>
        </div>
        <div className={styles.subContainer}>
          <div className={styles.subContentContainer}>
            <div
              style={{
                display: "flex",
                flex: 3,
                flexDirection: "column",
                maxWidth: "60vw",
                paddingRight: 20,
              }}
            >
              <h2>Need a Dedicated Space?</h2>
              <p>
                Sed sodales elit nec est porttitor suscipit at quis est. Proin
                efficitur elit felis, pulvinar ultrices felis interdum vel. Cras
                ac venenatis nulla. Aliquam erat volutpat.
              </p>
            </div>
            <div style={{ display: "flex", flex: 1 }}>
              <button className="btn" onClick={handleToSignup}>BECOME A MEMBER</button>
            </div>
          </div>
        </div>
        {showFixedBNav && (
          <div className={styles.fixedBottomHeader}>
            <div className={styles.titleContainer}>
              <h2>{data?.Name}</h2>
            </div>
            <div className={styles.contentContainer}>
              <div className={styles.priceContainer}>
                <div style={{
                  display: "flex",
                  flex: 1,
                  paddingTop: 10,
                  paddingBottom: 10,
                }}>
                  <button className="btn" onClick={handleBook}>Book Now</button>
                </div>
              </div>
            </div>
          </div>
        )}
        {showSchedule && (
          <div className={styles.scheduleContainer}>
            <div className={styles.scheduleContentContainer}>
              <div className={styles.scheduleHeader}>
                <h2>Scheduling</h2>
                <a href="#" onClick={handleCancel}>
                  <p>Cancel</p>
                </a>
              </div>
              <div className={styles.scheduleContent}>
                <Calendar
                  onChange={(date_val) => {
                    setSelectedDate(date_val);
                  }}
                />
                <div className={styles.timeSelectionContainer}>
                  <div className={styles.timeSelectionHeader}>
                    <p>Select your start time and duration</p>
                    {selectedTime.length > 0 && (
                      <p>
                        {selectedTime[0]} - {selectedTime[1]}
                      </p>
                    )}
                  </div>
                  <div>
                    <TimePicker
                      onChange={(time) => {
                        setSelectedTime(time);
                      }}
                    />
                  </div>
                </div>

                {/* <div className={styles.timeSelectionContainer}>
                  <div className={styles.timeSelectionHeader}>
                    <p>ADD ONS</p>
                  </div>
                  <div>
                    <AddonPicker
                      onChange={(selectedIds) => {
                        setAddOns(selectedIds ?? []);
                      }}
                    />
                  </div>
                </div> */}
              </div>
              <div className={styles.scheduleFooter}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    style={{
                      position: "relative",
                      width: 15,
                      height: 15,
                      marginRight: 5,
                    }}
                  >
                    <Image
                      src={ReservationIcon}
                      alt="Whiteboard"
                      layout="fill"
                      objectFit="contain"
                      objectPosition="fit"
                      width={15}
                      height={15}
                    />
                  </div>
                  {(selectedDate || selectedTime.length > 0) && (
                    <p>
                      {selectedDate ? `${selectedDate.text}` : ""}
                      {selectedTime.length > 0
                        ? ` • ${selectedTime[0]} - ${selectedTime[1]}`
                        : ""}
                    </p>
                  )}
                </div>
                <div>
                  <button
                    className="btn"
                    onClick={handleConfirm}
                    disabled={!selectedDate || !selectedTime.length}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <ShoutOut
          className={styles.shoutout}
          topText="Come by and see Venue!"
          bottomText="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          leftLinkUrl="/tour"
          leftLinkText="book a tour"
          rightLinkUrl="/venue"
          rightLinkText="view venue"
        />
        <Footer className={styles.footer} />
      </div>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const resources = await getResources();
  const { listId } = query;
  const resource = resources.find((item) => item.UniqueId === listId);
  if (!resource) {
    return {
      notFound: true,
    };
  }

  const contentful = await getEntriesByType("resources");
  const content = contentful?.find(
    (item) => item.fields.name === resource.Name && item.fields.image
  );
  if (content) {
    resource.image = `https:${content.fields.image.fields.file.url}`;
  }
  return {
    props: {
      data: resource ?? null,
    },
  };
}
