import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { compose } from "redux";
import { useParams } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { Button } from "@wfp/ui";
import { NavLink } from "react-router-dom";
import PageTitle from "components/PageTitle";
import Page from "components/Page";
import map from "./image001.png";
import { getDetailById } from "../../ducks/data";
import MdxPost from "../MdxPost";
import MDX from "@mdx-js/runtime";
import { Trans, useTranslation } from "react-i18next";
import InfoTooltip from "components/InfoTooltip";
import useDimensions from "react-use-dimensions";

const H1 = (props) => <h1 style={{ color: "tomato" }} {...props} />;

export default function Details({ entry, active, i }) {
  const [i18next] = useTranslation();
  const [previousImage, setPreviousImage] = useState(0);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setPreviousImage(0);
    setActiveImage(0);
  }, [active]);

  return (
    <div className={`${styles.detail} ${active ? styles.detailActive : ""}`}>
      <div className={styles.sidebar}>
        <div
          className={`${styles.imageWrapper} ${styles[`imageWrapper-${i}`]}`}
        >
          {entry.images.map((image, i) => (
            <div
              className={`${styles.image} ${
                activeImage === i ? styles.imageActive : ""
              }  ${previousImage === i ? styles.imagePreviousActive : ""}`}
            >
              <img src={`/${image.image}`} className={styles[`image-${i}`]} />
              <div className={styles.detailTrigger}>
                {image.tooltips &&
                  image.tooltips.map((e, l) => (
                    <InfoTooltip
                      entry={e}
                      activePage={active}
                      activeImage={activeImage === i}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.buttonWrapper}>
          {entry.images.length > 1 && (
            <>
              {entry.images.map((image, i) => (
                <Button
                  className={`${styles.backsideButton} ${
                    activeImage === i && styles.backsideButonActive
                  }`}
                  onClick={() => {
                    setPreviousImage(activeImage);
                    setActiveImage(i);
                  }}
                >
                  <Trans>
                    {image.title_en && i18next.language === "en"
                      ? image.title_en
                      : image.title
                      ? image.title
                      : i === 1
                      ? "Rückseite"
                      : "Vorderseite"}
                  </Trans>
                </Button>
              ))}
            </>
          )}
        </div>

        <div className={styles.dText}>
          {entry.mdx_en && i18next.language === "en" ? entry.mdx_en : entry.mdx}
        </div>
      </div>
      <div className={styles.content}>
        <div>
          <h3 className={styles.subTitle}>{entry.subTitle}</h3>
          <h2 className={styles.title}>{entry.question}</h2>
          <span>
            {entry.mdx_en && i18next.language === "en"
              ? entry.mdx_en
              : entry.mdx}
          </span>
          <div>{entry.content}</div>
        </div>
      </div>
    </div>
  );
}
