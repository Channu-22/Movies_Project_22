import React from 'react'
import Row from '../components/Row';
import Hero from '../components/Hero'
// import Row from '../components/Row'
import {URLs} from "../url.js"


function Home() {
  return (
    <>
    <Hero />

    <Row heading="Treding" tab={["Day", "Week"]} url={[URLs.trendingByDay,URLs.trendingByWeek]}/>
    {/* <Row heading="What's Popular" tab={["Movies", "TV Shows"]}/>
    <Row heading="Top Rated" tab={["Movies", "TV Shows"]}/> */}

    
    </>
  )
}

export default Home;