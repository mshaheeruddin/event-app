import EventContent from "@/components/event-detail/event-detail/event-content";
import EventLogistics from "@/components/event-detail/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-detail/event-summary";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
import { getEventById, getAllEvents, getFeaturedEvents } from "../../helpers/api-utils";
import { Fragment } from "react";
import Comments from "@/components/input/comments";

function EventDetailPage(props) {
  const event = props.selectedEvent;

  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id}/>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: paths,
    fallback: 'blocking',
  }
}

export default EventDetailPage;
