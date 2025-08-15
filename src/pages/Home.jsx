import React from "react";
import Row from "../components/Row";
import Hero from "../components/Hero";
import { URLs } from "../url.js";

function Home() {
  return (
    <>
      <Hero />
      <Row
        heading="Trending"
        tab={["Day", "Week"]}
        url={[URLs.trendingByDay, URLs.trendingByWeek]}
      />
      <Row
        heading="What's Popular"
        tab={["Movies", "TV Shows"]}
        url={[URLs.popularMovie, URLs.popularTV]}
      />
      <Row
        heading="Top Rated"
        tab={["TV Shows", "Movies"]}
        url={[URLs.topRatedTVShows, URLs.topRatedMovies]}
      />
    </>
  );
}

export default Home;