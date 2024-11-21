import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Footer.module.scss";
import FooterPic from "../public/images/footer_pic.png";
import Logo from "../public/images/4m_logo_footer.png";
import { useRouter } from "next/router";

export default function Footer({ className }: { className: string }) {
  const router = useRouter();
  const links = [
    {
      text: "Order Food",
      url: "/kitchens",
    },
    {
      text: "Book A Stay",
      url: "/stays",
    },
    {
      text: "Rent Coworking Space",
      url: "/coworking",
    },
    {
      text: "Hail A Ride",
      url: "/rides",
    },
    {
      text: "Events",
      url: "/events",
    },
    {
      text: "News",
      url: "/news",
    },
    {
      text: "Careers",
      url: "/careers",
    },
    {
      text: "Contact",
      url: "/contact",
    },
    {
      text: "Terms & Conditions",
      url: "/toc",
    },
    {
      text: "Privacy Policy",
      url: "/privacy",
    },
    {
      text: "Cookie Policy",
      url: "/cookies",
    },
  ];

  // TODO: Add real social links
  const socials = [
    {
      src: "/images/facebook.png",
      href: "https://facebook.com",
    },
    {
      src: "/images/instagram.png",
      href: "https://instagram.com",
    },
    {
      src: "/images/twitter.png",
      href: "https://twitter.com",
    },
    {
      src: "/images/linkedin.png",
      href: "https://linkedin.com",
    },
    {
      src: "/images/youtube.png",
      href: "https://youtube.com",
    },
  ];

  const handleSignUpClick = () => {
    router.push('/create-account');
  };

  return (
    <div className={`${className} ${styles.footer}`}>
      <div className={styles.newsletter}>
        <p>
          SIGN UP FOR OUR EMAIL NEWSLETTER TO RECEIVE WEEKLY UPDATES, NEWS, AND
          OFFERS
        </p>
        <label htmlFor="newsletter-email">Email Address</label>
        <input type="text" name="newsletter-email" id="newsletter-email" />
        <button type="button" onClick={handleSignUpClick}>SIGN UP</button>
      </div>
      <div className={styles.pic}>
        <Image src={FooterPic} alt="Bus stop" />
      </div>
      <div className={styles["logo-area"]}>
        <div className={styles.logo}>
          <Image src={Logo} alt="4m logo" />
        </div>
        <p>
          &copy; 2021 Circa 1919 LLC d.b.a Venue by 4M 1919 S Industrial Hwy,
          Ann Arbor, MI 48104
        </p>
      </div>
      <div className={styles["link-list"]}>
        {links.map((link) => (
          <Link key={link.text} href={link.url}>
            <a>{link.text}</a>
          </Link>
        ))}
      </div>
      <div className={styles["say-hi"]}>
        <p>SAY HI!</p>
        <Link href="mailto:hello@experience4m.com">
          <a className={styles["experience4m-email"]}>hello@experience4m.com</a>
        </Link>
        <div className={styles.socials}>
          {socials.map((social) => (
            <Link key={social.href} href={social.href}>
              <a>
                <Image
                  src={social.src}
                  alt={social.href}
                  width="16"
                  height="18"
                />
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
