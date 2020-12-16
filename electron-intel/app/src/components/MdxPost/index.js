import React from "react";
import styles from "./styles.module.scss";
import { MdxComponents as mdxComponents } from "@wfp/ui";
import Lightbox from "./Lightbox";

import MDX from "@mdx-js/runtime";

const H1 = (props) => <h1 className={styles.h1} {...props} />;

console.log("mdxComponents", mdxComponents);

export default function MdxPost({ children }) {
  return (
    <MDX components={{ h1: H1, ...mdxComponents, img: Lightbox }}>
      {children}
    </MDX>
  );
}
