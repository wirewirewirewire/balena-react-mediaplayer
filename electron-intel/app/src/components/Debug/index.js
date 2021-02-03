import React, { useState } from "react";

import styles from "./response-type.module.scss";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { useFullScreen } from "react-hooks-full-screen";
import { connect } from "react-redux";

const ResponseType = ({ match, questions, responses }) => {
  const [debug, setDebug] = useState(false);
  const [showFullScreen, setShowFullScreen] = useState(false);
  useFullScreen("root", showFullScreen);
  return null;
  if (debug) {
    return (
      <div className={styles.debugWindow}>
        <button onClick={(e) => setDebug(!debug)}>Close debug</button>
        Debug lorem ipsum
        <button onClick={() => setShowFullScreen(!showFullScreen)}>
          Toggle
        </button>
      </div>
    );
  }
  return (
    <div onClick={(e) => setDebug(!debug)} className={styles.debugButton}>
      Debug
    </div>
  );
};

export default ResponseType;
