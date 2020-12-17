import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { Trans, useTranslation } from "react-i18next";

import {
  Player,
  PlayToggle,
  ControlBar,
  ClosedCaptionButton,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton,
  FullscreenToggle,
} from "video-react";
import Page from "components/Page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/pro-solid-svg-icons";
import { Button } from "@wfp/ui";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDeviceData } from "ducks/data";
import urlEncode from "helpers/urlEncode";

/*console.log(
  "http://fileupdate:3000/config.json".substring(
    0,
    "http://fileupdate:3000/config.json".lastIndexOf("/")
  ) + "/aaaaa"
);*/
export default function VideoPlayer({ entry, active, i }) {
  const [i18next] = useTranslation();
  const [controls, setControls] = useState(false);
  const playerRef = useRef();

  const history = useHistory();

  useEffect(() => {
    console.log("active", active);
    if (active) playerRef.current.play();
    else {
      playerRef.current.seek(0);
      playerRef.current.pause();
    }
  }, [active]);

  const changeCurrentTime = (seconds) => {
    return () => {
      const { player } = playerRef.getState();
      playerRef.current.pause();
      playerRef.current.seek(seconds);
    };
  };

  const handleStateChange = (state, prevState) => {
    //console.log("state change", state);
    if (state.currentTime === state.duration) {
      history.push("/");
    }
    // if (prevState.controls !== state.controls) {
    console.log("updatecontrols", state);
    setControls(state.controls);
    //}
  };

  // subscribe state change
  if (playerRef.current)
    playerRef.current.subscribeToStateChange(handleStateChange.bind(this));

  const deviceData = useSelector(getDeviceData);

  const hasSubTitles = deviceData.files.some((e) => e.file.mime === "text/vtt")
    ? true
    : false;

  return (
    <Page className={`${controls ? "controlsActive" : "controlsDisabled"}`}>
      <div className={`${styles.detail} ${active ? styles.detailActive : ""}`}>
        <Player
          playsInline
          poster="/assets/poster.png"
          crossOrigin="anonymous"
          fluid={false}
          ref={playerRef}
          className={styles.player}
        >
          {deviceData.files.map((entry) => {
            if (entry.file.mime.split("/")[0] === "video") {
              return (
                <source
                  src={`${urlEncode(entry.file?.url)}`}
                  type="video/mp4"
                  fullscreenButton={false}
                />
              );
            } else if (entry.file.mime === "text/vtt") {
              return (
                <track
                  kind="captions"
                  src={`${urlEncode(entry.file?.url)}`}
                  srcLang="en"
                  label="english"
                />
              );
            }
          })}

          <ControlBar>
            <PlayToggle />
            <ReplayControl seconds={10} order={1.1} />
            <ForwardControl seconds={30} order={1.2} />
            <CurrentTimeDisplay order={4.1} />
            <TimeDivider order={4.2} />
            <VolumeMenuButton order={7.2} />
            <FullscreenToggle disabled />
            {hasSubTitles && <ClosedCaptionButton order={1.3} />}
          </ControlBar>
          <NavLink to="/">
            <Button
              kind="primary"
              className={`${styles.restart} ${active ? styles.show : ""}`}
              icon={<FontAwesomeIcon icon={faChevronLeft} />}
              iconReverse
            >
              <Trans>Übersicht</Trans>
            </Button>
          </NavLink>
        </Player>
      </div>
    </Page>
  );
}
