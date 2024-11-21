import Image from "next/image";
import NavBarWrapper from "../components/NavBarWrapper";
import Hero from "../components/Hero";
import CardList from "../components/CardList";
import MiniGallery from "../components/MiniGallery";
import ThreeOverlappingImages from "../components/ThreeOverlappingImages";
import PresentText from "../components/PresentText";
import ToutBlock from "../components/ToutBlock";
import ShoutOut from "../components/ShoutOut";
import Footer from "../components/Footer";
import { useWindowDimensions } from "../hooks";
import styles from "../styles/Home.module.scss";

import HeroBg from "../public/images/hero_bg.png";
import StaysBg from "../public/images/stays_bg.png";
import RidesBg from "../public/images/rides_bg.png";

import iPhone from "../public/images/iphone.png";
import Ribs from "../public/images/ribs.png";
import Tacos from "../public/images/tacos.png";
import Burger from "../public/images/burger.png";
import LightningBolt from "../public/images/4m_bolt.png";
import GoogleBadge from "../public/images/google_play_badge.png";
import AppleBadge from "../public/images/apple_badge.png";

export default function Home() {
  const introCards = [
    {
      logoSrc: "/images/kitchens_logo.png",
      logoWidth: "304",
      logoHeight: "66",
      icon: "./kitchens_icon.svg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla maximus interdum nibh, eu vehicula risus vehicula ac. In at leo vitae urna lacinia vulputate luctus a erat.",
      linkText: "ORDER FOOD",
      linkUrl: "/kitchens",
    },
    {
      logoSrc: "/images/stays_logo.png",
      logoWidth: "183",
      logoHeight: "49",
      icon: "./stays_icon.svg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla maximus interdum nibh, eu vehicula risus vehicula ac. In at leo vitae urna lacinia vulputate luctus a erat.",
      linkText: "BOOK A STAY",
      linkUrl: "/stays",
    },
    {
      logoSrc: "/images/coworking_logo.png",
      logoWidth: "331",
      logoHeight: "56",
      icon: "./coworking_icon.svg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla maximus interdum nibh, eu vehicula risus vehicula ac. In at leo vitae urna lacinia vulputate luctus a erat.",
      linkText: "RENT COWORKING SPACE",
      linkUrl: "/coworking",
    },
    {
      logoSrc: "/images/rides_logo.png",
      logoWidth: "180",
      logoHeight: "55",
      icon: "./rides_icon.svg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla maximus interdum nibh, eu vehicula risus vehicula ac. In at leo vitae urna lacinia vulputate luctus a erat.",
      linkText: "GET ELECTRIC",
      linkUrl: "/rides",
    },
  ];

  const foodProps = {
    className: styles.food,
    header: "Suspendisse pulvinar congue dui vel molestie",
    body: `Maecenas pulvinar massa et ligula fermentum, volutpat dignissim neque
          pharetra. Pellentesque luctus vulputate tempor. Maecenas facilisis
          pulvinar ex placerat laoreet.`,
    leftLinkText: "Start a food order",
    leftLinkUrl: "/kitchens",
    rightLinkText: "View Venue",
    rightLinkUrl: "/venue",
  };

  // If the viewport is at least 768 pixels wide, display the Rides component
  // as aligned to the left. Otherwise, display it centered.
  const { width: vw } = useWindowDimensions();
  const ridesLeftAligned = vw >= 768;

  return (
    <div className={styles.wrapper}>
      <NavBarWrapper className={styles.nav} />
      <Hero
        className={styles.hero}
        header="Immerse yourself in a place like no other"
        body={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla maximus
        interdum nibh, eu vehicula risus vehicula ac. In at leo vitae urna lacinia
        vulputate luctus a erat.`}
        linkUrl="/venue"
        linkText="view venue"
        background={
          <Image
            src={HeroBg}
            alt="People laughing"
            layout="fill"
            objectFit="cover"
            objectPosition="top"
          />
        }
      />
      <CardList className={styles.intro} cards={introCards} />
      <MiniGallery {...foodProps}>
        <ThreeOverlappingImages
          imageLeft={<Image src={Ribs} alt="Ribs" />}
          imageRight={<Image src={Tacos} alt="Tacos" />}
          imageBottom={<Image src={Burger} alt="Burger" />}
        />
      </MiniGallery>
      <PresentText
        className={styles.stays}
        topImage={<Image src={LightningBolt} alt="4m Lightning Bolt" />}
        subheader={`Go beyond live, work, and play. Experience a lifestyle designed for the
        visionary traveling looking for all the comforts of next-level hospitality.`}
        linkUrl="/stays"
        linkText="book a stay"
        background={
          <Image
            src={StaysBg}
            alt="A house"
            layout="fill"
            objectFit="cover"
            objectPosition="bottom"
          />
        }
        align="center"
      />
      {/* TODO: Add links for social media buttons */}
      <ToutBlock
        className={styles.tech}
        header="Smart technology to enhance your experience"
        body={`Order food for dine-in or pick-up, become a cowork member, experience
        Ann Arbor from one of our vacation homes, and get electric with one of
        our EV vehicles all in a few clicks.`}
        leftButton={<Image src={GoogleBadge} alt="Google Play Store" />}
        rightButton={<Image src={AppleBadge} alt="App Store" />}
        leftImage={<Image src={iPhone} alt="iPhone" width="370" height="704" />}
      />
      <PresentText
        className={styles.rides}
        header="Getting around has never been this electric"
        body={`Order food for dine-in or pick-up, become a cowork member, experience Ann Arbor
        from one of our vacation homes, and get electric with one of our EV vehicles all
        in a few clicks.`}
        linkUrl="/rides"
        linkText="get electric"
        background={
          <Image
            src={RidesBg}
            alt="Cars"
            layout="fill"
            objectFit="cover"
            objectPosition="bottom"
          />
        }
        align={ridesLeftAligned ? "left" : "center"}
      />
      {/* TODO: Find out where the /tour button is supposed to link to */}
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
  );
}
