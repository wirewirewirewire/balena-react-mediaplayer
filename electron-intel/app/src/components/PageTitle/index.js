import React from "react";
import styles from "./styles.module.scss";
//import Button from "components/Button";
import { Button } from "@wfp/ui";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/pro-solid-svg-icons";
import { Trans } from "react-i18next";
import classnames from "classnames";

const PageTitle = (props) => {
  const { active, deviceData, showRestart, subTitle, hide } = props;

  const pageClassNames = classnames({
    [`${styles.page}`]: true,
    [`${styles.active}`]: active,
  });

  return (
    <div className={pageClassNames}>
      {props.children && (
        <NavLink
          className={`page-title ${styles.pageTitle} ${styles.centerTitle} ${
            hide ? styles.hide : ""
          }`}
          to={deviceData.mainvideolink ? deviceData.mainvideolink : "/video/1"}
        >
          {props.children}
        </NavLink>
      )}
      {showRestart && (
        <NavLink
          to={
            deviceData.secondaryvideolink
              ? deviceData.secondaryvideolink
              : "/video/1/secondary"
          }
        >
          <Button
            kind="primary"
            className={`${styles.restart} ${hide ? styles.hide : ""}`}
            icon={<FontAwesomeIcon icon={faChevronLeft} />}
            iconReverse
          >
            <Trans>Übersicht</Trans>
          </Button>
        </NavLink>
      )}
      {props.subTitle && (
        <NavLink
          to={
            deviceData.secondaryvideolink
              ? deviceData.secondaryvideolink
              : "/video/1/secondary"
          }
          className={`${styles.pageSubTitle}  ${hide ? styles.hide : ""}`}
        >
          {subTitle}
        </NavLink>
      )}
    </div>
  );
};

export default PageTitle;
