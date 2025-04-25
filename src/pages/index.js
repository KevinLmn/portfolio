import React from "react";

import Home from "../components/Home/Home";
// eslint-disable-next-line no-unused-vars
const _keepReact = React;

export default function HomePage() {
  return <Home />;
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
