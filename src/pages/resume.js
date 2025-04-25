import Resume from "../components/Resume/Resume";
import React from "react";
// eslint-disable-next-line no-unused-vars
const _keepReact = React;


export default function ResumePage() {
  return <Resume />;
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
