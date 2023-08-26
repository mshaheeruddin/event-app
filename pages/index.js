import Head from "next/head";
import { getFeaturedEvents } from "../helpers/api-utils";
import EventList from "../components/events/event-list";

function StartingPage(props) {
  
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta name="description"content="Find a lot of great events that allow you to evolve..." />
      </Head>
      <EventList items={props.events}/>
    </div>
  );
}


export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents()
  console.log("fE" +featuredEvents)
  return {
     props: {
          events: featuredEvents
    },
    revalidate: 1800
  
  }
}

export default StartingPage;
