import React from "react";

import Projects from "../components/Projects/Projects";

export default function ProjectsPage() {
  return <Projects />;
}

// This is required for static exports
export const getStaticProps = async () => {
  return {
    props: {},
  };
};
