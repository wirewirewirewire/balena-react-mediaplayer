import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import PageTitle from "components/PageTitle";
import Page from "components/Page";

import { Trans } from "react-i18next";

import { Player, ControlBar } from "video-react";

import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/pro-solid-svg-icons";
import VideoPlayer from "components/VideoPlayer";
import classnames from "classnames";
import { getDeviceData } from "ducks/data";
import { useSelector } from "react-redux";
import urlEncode from "helpers/urlEncode";

const ResponseType = () => {
  const { id } = useParams();
  console.log("id", id);
  const playerRef = useRef();
  const [animate, setAnimate] = useState(false);

  const pageClassNames = classnames({
    [`${styles.page}`]: true,
    [`${styles.pageActive}`]: id === undefined,
    [`${styles.pageAnimate}`]: animate,
  });

  const deviceData = useSelector(getDeviceData);

  useEffect(() => {
    if (playerRef && playerRef.current)
      if (id) {
        playerRef.current.pause();
        setAnimate(true);
        setTimeout(() => {
          setAnimate(false);
        }, 2000);
      } else {
        playerRef.current.play();
      }
  }, [id]);

  if (!deviceData) return null;
  return (
    <>
      <Page className={pageClassNames}>
        <PageTitle
          kind="centerTitle"
          subTitle={
            deviceData.secondaryvideotext ? (
              <div>{deviceData?.secondaryvideotext}</div>
            ) : undefined
          }
          active={id === undefined}
          deviceData={deviceData}
        >
          <h1>
            <Trans>
              {deviceData?.mainvideotext
                ? deviceData.mainvideotext
                : "Video abspielen"}
            </Trans>

            <svg
              width="37px"
              height="56px"
              viewBox="0 0 37 56"
              className={styles.playIcon}
            >
              <g
                id="Page-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <polygon
                  fill="#000000"
                  points="9.30761184 0.115223689 0.115223689 9.30761184 18.5 27.9308981 0.115223689 46.0971645 9.30761184 55.2895526 36.8847763 27.7123882"
                ></polygon>
              </g>
            </svg>
          </h1>
        </PageTitle>
        <div className={styles.startVideo}>
          <Player
            playsInline
            autoPlay
            muted
            loop
            className={styles.start}
            ref={playerRef}
          >
            <source
              src={urlEncode(deviceData.introbackground?.url)}
              type="video/mp4"
              fullscreenButton={false}
            />
            <ControlBar disableCompletely />
          </Player>
        </div>
      </Page>
      <VideoPlayer active={id !== undefined} />
    </>
  );
};

export default ResponseType;
