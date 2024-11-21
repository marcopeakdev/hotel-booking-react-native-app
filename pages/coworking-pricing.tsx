import { useEffect, useState } from "react";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import { useRouter } from "next/router";
import NavBarWrapper from "../components/NavBarWrapper";
import Footer from "../components/Footer";
import styles from "../styles/CoworkPricing.module.scss";

import BlackLogoIcon from "../public/images/4m-black-logo-icon.png";
import SeatsIcon from "../public/images/seats-icon.png";
import WifiIcon from "../public/images/wifi-icon.png";
import MembershipIcon from "../public/images/MEMBER.png";
import DayPassIcon from "../public/images/DAYPASS.png";
import InfoIcon from "../public/images/info-icon.png";
import Tabbar from "../components/Tabbar";
import PricingCard from "../components/PricingCard";
import Modal from "../components/Modal";
import { getPlans, getTimepasses } from "../helpers/nexudusApiCalls";
import { getEntriesByType } from "../helpers/contentfulApiCalls";
import { awsCurrentAuthenticatedUser } from "../helpers/awsAuthCalls";
import { MONTH_NAMES, WEEK_DAY_NAMES } from "../constants/date";

export default function CoworkingPricing({ plans, timepasses, data }) {
  const router = useRouter();
  const [showTerms, setShowTermsAndCondtions] = useState(false);
  const [termsAndCondtions, setTermsAndCondition] = useState(null);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [authedUser, setAuthedUser] = useState(false);
  const [nextScreen, setNextScreenName] = useState("");

  const toggleTermsAndConditions = (selectedItem, screenName) => {
    setTermsAndCondition(selectedItem);
    setNextScreenName(screenName);
    setShowTermsAndCondtions(!showTerms);
  };

  const handleContinue = () => {
    setShowTermsAndCondtions(!showTerms);
    let queryData = null;
    if (data && data.Name) {
      queryData = {
        name: data?.Name,
        priceFormatted: data?.PriceFormmated,
        price: data?.price,
        selectedPlan: termsAndCondtions?.Name,
        selectedDate: data?.selectedDate,
        selectedTime: data?.selectedTime,
        addOns: data?.addOns,
        isDayPass: termsAndCondtions?.isDayPass,
        isResource: true,
      };
    } else {
      const current = new Date();
      const day = `${current.getFullYear()}-${current.getMonth()}-${current.getDate()}`;
      queryData = {
        name: termsAndCondtions?.Name,
        priceFormatted: termsAndCondtions?.PriceFormmated,
        price: termsAndCondtions?.Price,
        selectedPlan: termsAndCondtions?.Name,
        selectedDate: termsAndCondtions?.isDayPass
          ? JSON.stringify({
              text: `${WEEK_DAY_NAMES[new Date(day).getDay()]}, ${
                MONTH_NAMES[new Date(day).getMonth() + 1]
              } ${new Date(day).getDate()}`,
              value: day,
            })
          : JSON.stringify({
              text: `${WEEK_DAY_NAMES[new Date(day).getDay()]}, ${
                MONTH_NAMES[new Date(day).getMonth() + 2]
              } ${new Date(day).getDate()}`,
              value: `${current.getFullYear()}-${
                current.getMonth() + 1
              }-${current.getDate()}`,
            }),
        selectedTime: ["8:00 am", "5:00 pm"],
        addOns: data?.addOns,
        isDayPass: termsAndCondtions?.isDayPass,
        isResource: false,
      };
    }
    if (authedUser) {
      router.push({
        pathname: "/coworking-checkout",
        query: queryData,
      });
    } else {
      queryData.redirectedTo = "coworking-checkout";
      router.push({
        pathname: `/${nextScreen}`,
        query: queryData,
      });
    }
  };

  const handleRenderIndicator = (handleClick, isSelected) => {
    return (
      <div className={styles.dotContainer}>
        <div
          onClick={handleClick}
          onKeyDown={handleClick}
          className={styles.dotStyle}
          role="button"
          aria-label="indicator"
          style={{
            width: isSelected ? 23 : 14,
            height: isSelected ? 5.56 : 3.71,
            background: isSelected ? "#404040" : "#D5D5D5",
          }}
          tabIndex={0}
        />
      </div>
    );
  };

  useEffect(() => {
    awsCurrentAuthenticatedUser()
      .then((user) => {
        if (user) {
          setAuthedUser(true);
        }
      })
      .catch((error) => {
        console.log("going into errors");
        console.log("error authing", error);
      });
  }, []);

  return (
    <div className={styles.wrapper}>
      <NavBarWrapper
        isBack
        className={styles.nav}
        logoSrc="/images/cowork-logo-black.png"
        logoLink="/coworking"
      />
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <h2>Pricing</h2>
        </div>
        <Tabbar
          items={[
            {
              title: "DAY PASS",
              content: (
                <>
                  <div className={styles.cardsRow}>
                    {timepasses?.map((item) => (
                      <PricingCard
                        key={item.Name}
                        title={item.Name}
                        price={`${
                          item.PriceFormatted ? item.PriceFormatted : "$0.00"
                        } for the day`}
                        icon={
                          <div
                            style={{
                              position: "relative",
                              width: 45,
                              height: 45,
                            }}
                          >
                            <Image
                              src={DayPassIcon}
                              alt="People laughing"
                              layout="fill"
                              objectFit="cover"
                              objectPosition="top"
                            />
                          </div>
                        }
                        additionals={[
                          {
                            text: item.Detail,
                          },
                        ]}
                        isAuth={authedUser}
                        handleClick={(screenName) =>
                          toggleTermsAndConditions(item, screenName)
                        }
                      />
                    ))}
                  </div>
                  <div className={styles.mobileCardsRow}>
                    <Carousel
                      showArrows
                      showStatus={false}
                      renderIndicator={handleRenderIndicator}
                      onChange={(index) => {
                        setTermsAndCondition(timepasses[index]);
                      }}
                    >
                      {timepasses?.map((item) => (
                        <PricingCard
                          key={`mobile_${item.Name}`}
                          title={item.Name}
                          price={`${
                            item.PriceFormatted ? item.PriceFormatted : "$0.00"
                          } for the day`}
                          icon={
                            <div
                              style={{
                                position: "relative",
                                width: 45,
                                height: 45,
                              }}
                            >
                              <Image
                                src={DayPassIcon}
                                alt="People laughing"
                                layout="fill"
                                objectFit="cover"
                                objectPosition="top"
                              />
                            </div>
                          }
                          additionals={[
                            {
                              text: "Open Work Space for coworking",
                              icon: (
                                <Image
                                  src={SeatsIcon}
                                  alt="People laughing"
                                  width={35}
                                  height={35}
                                />
                              ),
                            },
                            {
                              text: "Access to coworking wifi from 8:00am - 5:00pm",
                              icon: (
                                <Image
                                  src={WifiIcon}
                                  alt="People laughing"
                                  width={35}
                                  height={35}
                                />
                              ),
                            },
                          ]}
                          isAuth={authedUser}
                          handleClick={() => setTermsAndCondition(item)}
                        />
                      ))}
                    </Carousel>
                    <div className={styles.mobileFooter}>
                      {!authedUser && (
                        <>
                          <a
                            href="#"
                            onClick={() => setShowTermsAndCondtions(!showTerms)}
                          >
                            SIGN UP
                          </a>
                          <a
                            href="#"
                            className={styles.outlineButton}
                            onClick={() => setShowTermsAndCondtions(!showTerms)}
                          >
                            LOG IN
                          </a>
                        </>
                      )}
                      {authedUser && (
                        <a
                          href="#"
                          onClick={() => setShowTermsAndCondtions(!showTerms)}
                        >
                          Continue
                        </a>
                      )}
                    </div>
                  </div>
                </>
              ),
            },
            {
              title: "MEMBERSHIP",
              content: (
                <>
                  <div className={styles.cardsRow}>
                    {plans?.map((item) => (
                      <PricingCard
                        key={item.Name}
                        title={item.Name}
                        price={
                          item.PriceFormatted ? item.PriceFormatted : "$0.00"
                        }
                        description={item.description}
                        icon={
                          <div
                            style={{
                              position: "relative",
                              width: 45,
                              height: 45,
                            }}
                          >
                            <Image
                              src={MembershipIcon}
                              alt="People laughing"
                              layout="fill"
                              objectFit="cover"
                              objectPosition="top"
                            />
                          </div>
                        }
                        additionals={[
                          {
                            html: item?.Description,
                          },
                        ]}
                        priceBg="#ABABAB"
                        isAuth={authedUser}
                        handleClick={(screenName) =>
                          toggleTermsAndConditions(item, screenName)
                        }
                      />
                    ))}
                  </div>
                  <div className={styles.mobileCardsRow}>
                    <Carousel
                      showArrows
                      showStatus={false}
                      renderIndicator={handleRenderIndicator}
                      onChange={(index) => {
                        setTermsAndCondition(plans[index]);
                      }}
                    >
                      {plans?.map((item) => (
                        <PricingCard
                          key={`mobile_${item.Name}`}
                          title={item.Name}
                          price={
                            item.PriceFormatted ? item.PriceFormatted : "$0.00"
                          }
                          description={item.Description}
                          icon={
                            <div
                              style={{
                                position: "relative",
                                width: 45,
                                height: 45,
                              }}
                            >
                              <Image
                                src={MembershipIcon}
                                alt="People laughing"
                                layout="fill"
                                objectFit="cover"
                                objectPosition="top"
                              />
                            </div>
                          }
                          additionals={[
                            {
                              html: item?.Description,
                            },
                          ]}
                          priceBg="#ABABAB"
                          isAuth={authedUser}
                          handleClick={() => setTermsAndCondition(item)}
                        />
                      ))}
                    </Carousel>
                    <div className={styles.mobileFooter}>
                      {!authedUser && (
                        <>
                          <a
                            href="#"
                            onClick={() => setShowTermsAndCondtions(!showTerms)}
                          >
                            SIGN UP
                          </a>
                          <a
                            href="#"
                            className={styles.outlineButton}
                            onClick={() => setShowTermsAndCondtions(!showTerms)}
                          >
                            LOG IN
                          </a>
                        </>
                      )}
                      {authedUser && (
                        <a
                          href="#"
                          onClick={() => setShowTermsAndCondtions(!showTerms)}
                        >
                          Continue
                        </a>
                      )}
                    </div>
                  </div>
                </>
              ),
            },
          ]}
          selectedIndex={data?.tab ? parseInt(data?.tab, 10) : 0}
        />
        <Modal
          header={
            <div className={styles.modalHeader}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    position: "relative",
                    marginRight: 10,
                    width: 12,
                    height: 12,
                    marginTop: -5,
                  }}
                >
                  <Image
                    src={InfoIcon}
                    alt="People laughing"
                    width={12}
                    height={12}
                  />
                </div>
                <p>Read and Agree</p>
              </div>
              <p>
                Please read and agree to the terms & conditions to continue.
              </p>
            </div>
          }
          footer={
            <div className={styles.modalFooter}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  id="agreeCheckbox"
                  name="agreeCheckbox"
                  type="checkbox"
                  onClick={() => setAgreeTerms(!agreeTerms)}
                  defaultChecked={agreeTerms}
                />
                <label htmlFor="agreeCheckbox">
                  I Agree to the above terms & conditions.
                </label>
              </div>
              <button
                type="button"
                className="btn"
                disabled={!agreeTerms}
                onClick={() => handleContinue()}
              >
                Continue to payment
              </button>
            </div>
          }
          show={showTerms}
        >
          <div>
            <div
              style={{
                position: "relative",
                width: 35,
                height: 36,
                marginTop: "2rem",
              }}
            >
              <Image
                src={BlackLogoIcon}
                alt="People laughing"
                layout="fill"
                objectFit="cover"
                objectPosition="top"
              />
            </div>
            <h2 style={{ marginTop: 10, marginBottom: 0 }}>
              Terms & Conditions
            </h2>
            <div
              style={{
                display: "flex",
                flex: 1,
                overflowY: "auto",
                maxHeight: 517,
                whiteSpace: "pre-line",
              }}
            >
              {termsAndCondtions?.TermsAndConditions}
            </div>
          </div>
        </Modal>
        <Footer className={styles.footer} />
      </div>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const plans = await getPlans();
  const timepasses = await getTimepasses();
  const legals = await getEntriesByType("coworkPassDetails");
  console.log(legals);
  const filteredData = timepasses?.Records.filter((record) => {
    const content = legals.find(
      (legal) => legal.fields.dayPass === record.ToStringText
    );
    if (content) {
      record.TermsAndConditions = content.fields.legal;
      record.Detail = content.fields.details ?? '';
      record.PriceFormatted = `$${record.Price.toFixed(2)}`;
      record.isDayPass = true;
      return true;
    }
    return false;
  });

  if (!plans && !timepasses) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      plans: plans.PricePlans ?? [],
      timepasses: filteredData ?? [],
      data: query,
    },
  };
}
