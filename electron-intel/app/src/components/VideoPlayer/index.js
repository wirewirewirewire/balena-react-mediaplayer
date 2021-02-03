import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { Trans, useTranslation } from "react-i18next";
import qs from "qs";

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
  FullscreenToggle,
} from "video-react";
import VolumeMenuButton from "./VolumeMenuButton";
import Page from "components/Page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/pro-solid-svg-icons";
import { Button } from "@wfp/ui";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDeviceData } from "ducks/data";
import urlEncode from "helpers/urlEncode";
import { useLocation } from "react-router-dom";
import { ReactComponent as BackIcon } from "../Icons/BackIcon.svg";
import i18next from "i18next";

export default function VideoPlayer({ entry, active, i }) {
  const [controls, setControls] = useState(false);
  const playerRef = useRef();
  const { search } = useLocation();
  const urlParams = qs.parse(search, {
    ignoreQueryPrefix: true,
  });

  const history = useHistory();

  useEffect(() => {
    if (active && playerRef && playerRef.current) {
      playerRef.current.volume = 1;
      playerRef.current.play();
      const state = playerRef.current.getState
        ? playerRef.current.getState()
        : undefined;

      const { textTracks } = state?.player;
      const index = parseInt(urlParams.subtitle);

      if (textTracks) {
        Array.from(textTracks).forEach((textTrack, i) => {
          if (index === i) {
            console.log("textTracks", "showing");
            textTrack.mode = "showing";
            playerRef.current.actions.activateTextTrack(textTrack);
          } else {
            textTrack.mode = "hidden";
          }
        });
      }
    } else {
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

    setControls(state.controls);
  };

  // subscribe state change
  if (playerRef.current)
    playerRef.current.subscribeToStateChange(handleStateChange.bind(this));

  const deviceData = useSelector(getDeviceData);

  const hasSubTitles = deviceData.files.some((e) => e.file.mime === "text/vtt")
    ? true
    : false;

  console.log("deviceData", deviceData);
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
                  label={
                    entry.file?.alternativeText
                      ? entry.file.alternativeText
                      : "english"
                  }
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
            <VolumeMenuButton order={7.2} vertical />
            <FullscreenToggle disabled />
            {hasSubTitles && (
              <ClosedCaptionButton order={1.3} offMenuText="keine Untertitel" />
            )}
          </ControlBar>
          <NavLink to="/">
            <Button
              kind="primary"
              className={`${styles.restart} ${active ? styles.show : ""}`}
              iconReverse
            >
              <BackIcon className={styles.backIcon} />
              <Trans>
                {i18next.language === "en" && deviceData.overviewtext_en
                  ? deviceData.overviewtext_en
                  : deviceData.overviewtext
                  ? deviceData.overviewtext
                  : "Start"}
              </Trans>
            </Button>
          </NavLink>
        </Player>
      </div>
    </Page>
  );
}
