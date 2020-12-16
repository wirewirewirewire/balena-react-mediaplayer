//import Button from "components/Button";
import { Button } from "@wfp/ui";

import settings from "ducks/settings";
import React from "react";
import { useDispatch } from "react-redux";
import styles from "./styles.module.scss";
import i18n from "translation/i18n";
import { Trans, useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const dispatch = useDispatch();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const [t, i18next] = useTranslation();

  return (
    <div className={styles.languageSwitcher}>
      <Button
        kind="primary"
        className={styles.restart}
        onClick={() => {
          changeLanguage(i18n.language === "en" ? "de" : "en");
        }}
      >
        <Trans>otherLanguage</Trans>
      </Button>
    </div>
  );
}
