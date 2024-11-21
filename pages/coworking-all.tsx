import { useState } from "react";
import Image from "next/image";
import NavBarWrapper from "../components/NavBarWrapper";
import Footer from "../components/Footer";
import styles from "../styles/CoworkAll.module.scss";

import ResourceDefaultBg from "../public/images/resource-default-bg.png";
import ResourceTypeCard from "../components/ResourceTypeCard";
import ResourceListItem from "../components/ResourceListItem";
import { getResources } from "../helpers/nexudusApiCalls";
import { stripeHTML } from "../helpers/util";
import { getEntriesByType } from "../helpers/contentfulApiCalls";

export default function CoworkingAll({ data, categories }) {
  const [selectedGroupName, setSelectedGroupName] =
    useState(categories[0]?.name);

  const handleGroupClick = (groupName) => {
    setSelectedGroupName(groupName);
  };

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
          <div className={styles.cardsRow}>
            {categories.map((category) => (
              <ResourceTypeCard
                title={category.name}
                selected={selectedGroupName === category.name}
                onClick={() => handleGroupClick(category.name)}
                image={
                  <Image
                    src={category.image ?? ResourceDefaultBg}
                    alt={category.name}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="top"
                  />
                }
              />
            ))}
          </div>
          <div className={styles.borderContainer} />
        </div>
        <div className={styles.resourceContainer}>
          <div className={styles.resourceContent}>
            {data
              .filter((item) => item.GroupName === selectedGroupName)
              .map((item) => (
                <ResourceListItem
                  key={item.UniqueId}
                  data={item}
                  title={item.Name}
                  description={stripeHTML(item.Description)}
                  image={
                    <Image
                      src={item.image ?? ResourceDefaultBg}
                      alt="People laughing"
                      layout="fill"
                      objectFit="cover"
                      objectPosition="top"
                    />
                  }
                  linkUrl={`/coworking/${item.Name.trim().replace(/ /g, "-").toLowerCase()}?listId=${item.UniqueId}`}
                  linkText="VIEW RESOURCE"
                />
              ))}
          </div>
        </div>
        <Footer className={styles.footer} />
      </div>
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
  let categoryData = [];
  if (resources) {
    resourceData = resources.map((item) => {
      const content = filteredContentful?.find(
        (val) => val.fields.name.trim() === item.Name.trim()
      );
      if (content) {
        item.image = `https:${content.fields.image.fields.file.url}`;
      }
      const category = categoryData.find(
        (value) => item.GroupName === value.name
      );
      if (!category && item.image) {
        categoryData.push({
          name: item.GroupName,
          image: item.image,
        });
      }
      return item;
    });
  }

  return {
    props: {
      data: resourceData ?? [],
      categories: categoryData ?? [],
    },
  };
}
