import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavBarWrapper from "../components/NavBarWrapper";
import styles from "../styles/CoworkCheckout.module.scss";

// import CoffeeImg from "../public/images/coffee.png";
import ResourceIcon from "../public/images/resource.png";
import InformationPanel from "../components/InformationPanel";
import TextInput from "../components/TextInput";
import { addBooking, purchasePlan } from "../helpers/nexudusApiCalls";
import { awsCurrentAuthenticatedUser, getUserInformation } from "../helpers/awsAuthCalls";
// import { ADD_ON_ITEMS } from "../constants/food";

// const sumPrice = (items) => {
//   const sumValue = (items || []).reduce((sum, item) => {
//     const productData = ADD_ON_ITEMS.find(
//       (val) => val.id === parseInt(item, 10)
//     );
//     return sum + (productData ? productData.price : 0);
//   }, 0);
//   return sumValue;
// };

export default function CoworkingCheckout({ data }) {
  const router = useRouter();
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cvv: "",
    expireAt: "",
    zipCode: "",
  });
  const [contactInfo, setContactInfo] = useState({
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  });
  const [errorMsg, setErrorMsg] = useState('');

  const [user, setAuthedUser] = useState(null);

  const handleClick = () => {
    if (data.isResource === 'true') {
      const dateval = new Date();
      const endDate = new Date();
      endDate.setDate(dateval.getDate() + (data.isDayPass ? 1 : 30));
      const bookData = {
        BusinessId: 1414880014,
        Name: data.Name,
        ResourceId: data.Id,
        StartDate: dateval.toISOString(),
        EndDate: endDate.toISOString(),
        EventCategories: data.Id,
        Repeats: 'Daily',
        WhichEventsToUpdate: 'UpdateThisEventOnly'
      };
      addBooking(bookData)
        .then(res => {
          router.push({
            pathname: "/coworking-confirmation",
            query: { ...data, ...paymentInfo, ...contactInfo },
          });
        })
        .catch(err => console.log(err));
    } else {
      const planData = {
        data: {
          first_name: '',
          last_name: '',
          email: user?.email ?? '',
          tariffId: data.Id,
        }
      };
      purchasePlan(planData)
        .then(res => {
          setErrorMsg('');
          if (!res.Status) {
            router.push({
              pathname: "/coworking-confirmation",
              query: { ...data, ...paymentInfo, ...contactInfo },
            });
          } else {
            setErrorMsg(res.Message);
          }
        })
        .catch(err => console.log(err));
    }
  };

  useEffect(() => {
    awsCurrentAuthenticatedUser()
      .then((auth) => {
        if (auth) {
          getUserInformation(auth?.attributes?.email)
            .then((info) => {
              console.log(info);
              if (info) {
                setAuthedUser(info);
              }
            })
            .catch((error) => {
              console.log("going into errors");
              console.log("error authing", error);
            });
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
        className={styles.nav}
        logoSrc="/images/cowork-logo-black.png"
        isBack
        logoLink="/coworking"
      />
      <div className={styles.contentWrapper}>
        <div className={styles.summaryFormContainer}>
          <div className={styles.summaryFormContent}>
            <h3 className={styles.headerTitle}>Checkout</h3>
            <InformationPanel title="Booking Details" isEdit onEdit={() => { }}>
              <div className={styles.row}>
                <div className={`${styles.row} ${styles.contentBlock}`}>
                  <div>
                    <Image
                      src={ResourceIcon}
                      alt="Conference room"
                      width={45}
                      height={45}
                    />
                  </div>
                  <div style={{ marginLeft: 20 }}>
                    <p>{data.name}</p>
                    <p>Resource</p>
                  </div>
                </div>
                <div className={`${styles.contentBlock} ${styles.column}`} />
              </div>
              <div className={styles.row}>
                <div className={styles.contentBlock}>
                  <input type="checkbox" id="acceptCheckbox" />
                  <label htmlFor="acceptCheckbox" style={{ marginLeft: 20 }}>
                    I would like to receive news, offers, and exclusive
                    promotions
                  </label>
                </div>
              </div>
            </InformationPanel>
            <div className={styles.mobileSummary}>
              <InformationPanel title="Summary">
                <div
                  style={{ display: "flex", flexDirection: "column", flex: 1 }}
                >
                  <div className={styles.invitationRow}>
                    <p className={styles.nameValue}>DAY PASS</p>
                    <p className={styles.nameValue}>{data?.selectedPlan}</p>
                  </div>
                  <div className={styles.invitationRow}>
                    <p className={styles.nameValue}>Expiration Time</p>
                    <p className={styles.nameValue}>5:00pm</p>
                  </div>
                  <div className={styles.invitationRow}>
                    <p className={styles.nameValue}>Expiration Date</p>
                    <p className={styles.nameValue}>
                      {data?.selectedDate ? JSON.parse(data?.selectedDate)?.text : ""}
                    </p>
                  </div>
                  <div className={styles.invitationRow}>
                    <p
                      className={styles.nameValue}
                      style={{ color: "#202020" }}
                    >
                      Subtotal
                    </p>
                    <p
                      className={styles.nameValue}
                      style={{ color: "#202020" }}
                    >
                      {data?.priceFormatted || "$0.00"}
                    </p>
                  </div>
                </div>
              </InformationPanel>
              {/* {data?.isResource === "true" && (
                <InformationPanel title="ADD ONS" isEdit onEdit={() => {}}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                    }}
                  >
                    {data?.addOns &&
                      data?.addOns?.split(",")?.map((item) => {
                        const productData = ADD_ON_ITEMS.find(
                          (val) => val.id === parseInt(item, 10)
                        );
                        return (
                          <div key={item} className={styles.addOnRow}>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <div>
                                <Image
                                  src={CoffeeImg}
                                  alt="Coffee"
                                  width={85}
                                  height={85}
                                />
                              </div>
                              <div style={{ marginLeft: 15 }}>
                                <p className={styles.nameValue}>
                                  {productData?.name}
                                </p>
                              </div>
                            </div>
                            <p className={styles.nameValue}>
                              {productData?.price
                                ? `$${productData?.price?.toFixed(2)}`
                                : "$0.00"}
                            </p>
                          </div>
                        );
                      })}
                    <div
                      className={styles.invitationRow}
                      style={{ marginTop: "2rem" }}
                    >
                      <p
                        className={styles.nameValue}
                        style={{ color: "#202020" }}
                      >
                        Total
                      </p>
                      <p
                        className={styles.nameValue}
                        style={{ color: "#202020" }}
                      >
                        $
                        {parseInt(
                          (data.price ? parseInt(data?.price, 10) : 0) +
                            sumPrice(data?.addOns?.split(",")),
                          10
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </InformationPanel>
              )} */}
            </div>
            <div className={styles.paymentInformation}>
              <InformationPanel title="Payment Information">
                <div className={styles.row}>
                  <TextInput
                    label="Credit Card Number:"
                    className={styles.cardNumber}
                    value={paymentInfo?.cardNumber}
                    onChange={(value) =>
                      setPaymentInfo({ ...paymentInfo, cardNumber: value })
                    }
                  />
                  <TextInput
                    label="CVV:"
                    value={paymentInfo?.cvv}
                    onChange={(value) =>
                      setPaymentInfo({ ...paymentInfo, cvv: value })
                    }
                  />
                  <TextInput
                    label="Expiration:"
                    value={paymentInfo?.expireAt}
                    onChange={(value) =>
                      setPaymentInfo({ ...paymentInfo, expireAt: value })
                    }
                  />
                  <TextInput
                    label="ZIP Code:"
                    value={paymentInfo?.zipCode}
                    onChange={(value) =>
                      setPaymentInfo({ ...paymentInfo, zipCode: value })
                    }
                  />
                </div>
                <div className={`${styles.row} ${styles.between}`}>
                  <div className={styles.contentBlock}>
                    <input type="checkbox" id="saveCard" />
                    <label htmlFor="saveCard" style={{ marginLeft: 20 }}>
                      Save Card
                    </label>
                  </div>
                  <div>
                    <a href="#">Manage payment methods</a>
                  </div>
                </div>
              </InformationPanel>
            </div>
            <div className={styles.information_row}>
              <InformationPanel title="Contact Information">
                <TextInput
                  label="Name:"
                  value={contactInfo?.contactName}
                  onChange={(value) =>
                    setContactInfo({ ...contactInfo, contactName: value })
                  }
                />
                <TextInput
                  label="Phone:"
                  value={contactInfo?.contactPhone}
                  onChange={(value) =>
                    setContactInfo({ ...contactInfo, contactPhone: value })
                  }
                />
                <TextInput
                  label="Email:"
                  value={contactInfo?.contactEmail}
                  onChange={(value) =>
                    setContactInfo({ ...contactInfo, contactEmail: value })
                  }
                />
              </InformationPanel>
              <InformationPanel title="Guests">
                <div
                  style={{ display: "flex", flexDirection: "column", flex: 1 }}
                >
                  {/* <div className={styles.invitationRow}>
                    <p className={styles.nameValue}>ANNIE MOLINARO</p>
                    <p className={styles.statusValue}>Invite Sent</p>
                  </div> */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: 10,
                    }}
                  >
                    <a>Invite Guests</a>
                  </div>
                </div>
              </InformationPanel>
            </div>
            <div className={styles.mobilePaymentInformation}>
              <InformationPanel title="Payment Information">
                <div className={styles.row}>
                  <TextInput
                    label="Credit Card Number:"
                    className={styles.cardNumber}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <TextInput label="Expiration:" />
                  <TextInput label="ZIP Code:" />
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <TextInput label="CVV:" />
                  <div
                    className={styles.contentBlock}
                    style={{ paddingTop: "2rem", alignItems: "center" }}
                  >
                    <input type="checkbox" id="saveCard" />
                    <label htmlFor="saveCard" style={{ marginLeft: 20 }}>
                      Save Card
                    </label>
                  </div>
                </div>
                <div
                  className={`${styles.row} ${styles.between}`}
                  style={{ marginTop: 10 }}
                >
                  <div>
                    <a href="#">Manage payment methods</a>
                  </div>
                </div>
              </InformationPanel>
              <div style={{ marginTop: '3rem' }}>
                {errorMsg && (
                  <p className={styles.error}>{errorMsg}</p>
                )}
                <button
                  className={styles.confirmButton}
                  onClick={handleClick}
                  disabled={
                    (!paymentInfo.cardNumber || !contactInfo.contactName) ?? false
                  }
                >
                  Confirm & Pay
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.summaryContentContainer}>
          <div className={styles.summaryContent}>
            <InformationPanel title="Summary">
              <div
                style={{ display: "flex", flexDirection: "column", flex: 1 }}
              >
                <div className={styles.invitationRow}>
                  <p className={styles.nameValue}>DAY PASS</p>
                  <p className={styles.nameValue}>{data?.selectedPlan}</p>
                </div>
                <div className={styles.invitationRow}>
                  <p className={styles.nameValue}>Expiration Time</p>
                  <p className={styles.nameValue}>5:00pm</p>
                </div>
                <div className={styles.invitationRow}>
                  <p className={styles.nameValue}>Expiration Date</p>
                  <p className={styles.nameValue}>
                    {data?.isResource && data?.selectedDate ? JSON.parse(data?.selectedDate)?.text : ""}
                  </p>
                </div>
                <div className={styles.invitationRow}>
                  <p className={styles.nameValue} style={{ color: "#202020" }}>
                    Subtotal
                  </p>
                  <p className={styles.nameValue} style={{ color: "#202020" }}>
                    {data?.priceFormatted || "$0.00"}
                  </p>
                </div>
              </div>
            </InformationPanel>
            {/* {data?.isResource === "true" && (
              <InformationPanel title="ADD ONS" isEdit onEdit={() => {}}>
                <div
                  style={{ display: "flex", flexDirection: "column", flex: 1 }}
                >
                  {data?.addOns &&
                    data?.addOns?.split(",")?.map((item) => {
                      const productData = ADD_ON_ITEMS.find(
                        (val) => val.id === parseInt(item, 10)
                      );
                      return (
                        <div key={item} className={styles.addOnRow}>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <div>
                              <Image
                                src={CoffeeImg}
                                alt="Coffee"
                                width={85}
                                height={85}
                              />
                            </div>
                            <div style={{ marginLeft: 15 }}>
                              <p className={styles.nameValue}>
                                {productData?.name}
                              </p>
                            </div>
                          </div>
                          <p className={styles.nameValue}>
                            {productData?.price
                              ? `$${productData?.price?.toFixed(2)}`
                              : "$0.00"}
                          </p>
                        </div>
                      );
                    })}
                  <div
                    className={styles.invitationRow}
                    style={{ marginTop: "2rem" }}
                  >
                    <p
                      className={styles.nameValue}
                      style={{ color: "#202020" }}
                    >
                      Total
                    </p>
                    <p
                      className={styles.nameValue}
                      style={{ color: "#202020" }}
                    >
                      $
                      {parseInt(
                        (data.price ? parseInt(data?.price, 10) : 0) +
                          sumPrice(data?.addOns?.split(",")),
                        10
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
              </InformationPanel>
            )} */}
            <div style={{ marginTop: '3rem' }}>
              {errorMsg && (
                <p className={styles.error}>{errorMsg}</p>
              )}
              <button
                className={styles.confirmButton}
                onClick={handleClick}
                disabled={
                  (!paymentInfo.cardNumber || !contactInfo.contactName) ?? false
                }
              >
                Confirm & Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  return {
    props: {
      data: query,
    },
  };
}
