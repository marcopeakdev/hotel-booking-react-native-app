import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "../styles/ImageCarousel.module.scss";

export interface ContainerProps {
  interval?: number;
  autoPlay?: boolean;
  pictures?: Array<any>;
  defaultImage?: any;
}

export default function ImageCarousel({
  autoPlay,
  interval,
  pictures,
  defaultImage,
}: ContainerProps) {
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
            background: isSelected ? "white" : "#ABABAB",
          }}
          tabIndex={0}
        />
      </div>
    );
  };

  return (
    <Carousel
      showArrows
      showStatus={false}
      autoPlay={autoPlay ?? false}
      interval={interval ?? 4000}
      renderIndicator={handleRenderIndicator}
    >
      {pictures?.map((picture) => (
        <div key={picture?.large} style={{ position: "relative" }}>
          <div
            key={picture?.large}
            style={{ position: "relative", height: 296 }}
          >
            <Image
              src={picture.large ?? defaultImage}
              alt="Stays"
              layout="fill"
              objectFit="cover"
              objectPosition="fit"
            />
          </div>
          <div className={styles.gradientBg} />
        </div>
      ))}
    </Carousel>
  );
}

ImageCarousel.defaultProps = {
  interval: 4000,
  autoPlay: true,
  pictures: [],
  defaultImage: "",
};
