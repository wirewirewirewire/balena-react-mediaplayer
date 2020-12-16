import React from "react";
import styles from "./styles.module.scss";

const Page = props => {
  return (
    <div
      {...props}
      className={`${props.kind ? styles[props.kind] : styles.page} ${
        props.className
      }`}
    >
      {props.children}
    </div>
  );
};

export default Page;
