import EventList from "../../components/events/event-list";
import { getAllEvents } from "@/helpers/api-utils";
import { useRouter } from "next/router";
import EventSearch from "@/components/events/events-search";
import { Fragment } from "react";
import Head from "next/head";

function EventsPage(props) {
  const {events} = props
  const router = useRouter()
  function findEventsHandler(year,month) {
       const fullPath = `/events/${year}/${month}`
       router.push(fullPath)
  }
  return (
    <Fragment>
      <Head>
        <title>{events.title}</title>
        <meta name="description"content="Find a lot of great events that allow you to evolve..." />
      </Head>
      <EventSearch onSearch={findEventsHandler}/>
        <EventList items={events} />
    </Fragment>
  )
}


export async function getStaticProps() {
  const events = await getAllEvents()
  return {
    props: {
        events: events,
    },
    revalidate: 60
  }
}

export default EventsPage