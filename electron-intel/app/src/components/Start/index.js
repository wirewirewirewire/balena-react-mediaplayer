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
        //playerRef.current.seek(3);
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
            <FontAwesomeIcon
              icon={faChevronRight}
              className={styles.playIcon}
            />
          </h1>
        </PageTitle>
        <div className={styles.startVideo}>
          <Player
            playsInline
            autoPlay
            muted
            className={styles.start}
            ref={playerRef}
          >
            <source
              src={deviceData.introbackground?.url}
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
