import React from "react";
import { redirect } from "next/navigation";

const Home = () => {
  redirect("/blog");
};

export default Home;
