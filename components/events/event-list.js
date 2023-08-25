/*
Two ways: 

1] Destructuring the props:

- const {items} = props
- then use items

2] normal with dot notation: 

-props.items


*/

import EventItem from "./event-item";
import classes from './event-list.module.css'

function EventList(props) {
  const { items } = props;
  return (
    <ul className={classes.list}>
      {items.map((event) => (
        <EventItem
          key={event.id}
          id={event.id}
          title={event.title}
          location={event.location}
          date={event.date}
          image={event.image}
        />
      ))}
    </ul>
  );
}

export default EventList;
