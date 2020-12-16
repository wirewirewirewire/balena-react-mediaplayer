import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { Button, Tooltip } from "@wfp/ui";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/pro-light-svg-icons";
import { Portal } from "react-portal";
import i18next from "i18next";

function useOutsideAlerter(ref, setShow, isActive) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        // alert("You clicked outside of me!");
        setShow(false);
      }
    }
    // Bind the event listener
    //setTimeout(() => {
    if (!isActive) document.addEventListener("mousedown", handleClickOutside);
    //}, 1000);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

const InfoTooltip = ({ activeImage, activePage, entry, width }, ...props) => {
  const [show, setShowState] = useState(false);
  const [activeImageDelay, setActiveImageDelay] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const wrapperRef = useRef(null);

  const setShow = (value) => {
    if (value === false) {
      setTimeout(() => {
        setShowState(value);
        setShowAnimation(false);
      }, 500);
      setShowAnimation(true);
    } else {
      setShowState(value);
    }
  };

  useEffect(() => {
    if (activePage === true)
      setTimeout(() => {
        setActiveImageDelay(activePage);
      }, 800);
    else {
      setActiveImageDelay(false);
    }
  }, [activePage]);

  useOutsideAlerter(wrapperRef, setShow, entry.image);

  return (
    <>
      {entry.image && (
        <Portal>
          <div
            className={`${styles.imageOverlay} ${
              show ? styles.imageOverlayActive : ""
            } ${showAnimation ? styles.imageOverlayAnimation : ""}`}
          >
            <img src={`/${entry.image}`} />
            <Button
              className={styles.closeOverlay}
              onClick={() => setShow(false)}
              onTouchEnd={() =>
                setTimeout(() => {
                  setShow(false);
                }, 300)
              }
            >
              Schließen
            </Button>
          </div>
        </Portal>
      )}
      <div
        className={`${styles.tooltipWrapper} ${
          activeImageDelay && activeImage ? styles.tooltipWrapperActive : ""
        } ${entry.position === "left" ? styles.left : styles.right} ${
          show ? styles.show : ""
        }`}
        style={{
          top: `${
            entry.style.top +
            (entry.style.extension ? entry.style.extension : 0)
          }%`,
          left: `${entry.style.left}%`,
        }}
      >
        <div
          className={styles.line}
          style={
            {
              width:
                entry.position === "left"
                  ? `calc(100vh * ${entry.style.left / 100})`
                  : `calc(100vh - 100vh * ${entry.style.left / 100})`,
            }
            /*{
        width:
          entry.position === "left"
            ? `${100 + width * (entry.style.left / 100)}px`
            : `${100 + width - width * (entry.style.left / 100)}px`,
      }*/
          }
        >
          {entry.style.extension && (
            <div
              className={`${styles.extension} ${
                entry.style.extension < 0
                  ? styles.extensionUp
                  : styles.extensionDown
              }`}
              style={{ height: `${Math.abs(entry.style.extension)}vh` }}
            ></div>
          )}
        </div>
        {/*<div className={styles.icon}>+</div>*/}
        <div className={styles.tooltipWrapperInside}>
          <Tooltip
            className={showAnimation ? styles.tooltipOutAnimation : ""}
            content={
              <div
                className={
                  entry.position === "left"
                    ? styles.tooltipLeft
                    : styles.tooltipRight
                }
              >
                {entry.content_en && i18next.language === "en"
                  ? entry.content_en
                  : entry.content}
              </div>
            }
            placement={
              entry.position === "left" ? "bottom-end" : "bottom-start"
            }
            //trigger="click"
            modifiers={[
              {
                name: "offset",
                options: {
                  offset: [0, 30],
                },
              },
            ]}
            useWrapper={true}
            tooltipShown={entry.image ? false : show}
          >
            <div>
              <div
                className={styles.content}
                ref={wrapperRef}
                onClick={() => setShow(true)}
                onTouchStart={() => setShow(true)}
              >
                {/*<FontAwesomeIcon icon={faPlusCircle} />*/}
                <span>
                  {(entry.title_en && i18next.language === "en"
                    ? entry.title_en
                    : entry.title
                  )
                    .split("\n")
                    .map(function (item, idx) {
                      return (
                        <span key={idx} className={styles.contentLine}>
                          {item}
                          <br />
                        </span>
                      );
                    })}
                </span>
              </div>
            </div>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default InfoTooltip;
