import React from "react";

import Projects from "../components/Projects/Projects";
// eslint-disable-next-line no-unused-vars
const _keepReact = React;

export default function ProjectPage() {
  return <Projects />;
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
