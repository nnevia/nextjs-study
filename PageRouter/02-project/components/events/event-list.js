import { getFeaturedEvents } from '../../helpers/api-util';
import EventItem from './event-item';
import classes from './event-list.module.css';
export default function EventList(props) {
  const { items } = props;
  return (
    <ul className={classes.list}>
      {items.map((item) => (
        <EventItem
          key={item.id}
          id={item.id}
          title={item.title}
          date={item.date}
          location={item.location}
          image={item.image}
        />
      ))}
    </ul>
  );
}
