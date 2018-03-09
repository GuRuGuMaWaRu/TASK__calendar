import React, { Component } from "react";
import { connect } from "react-redux";

import { groupAndSetWidth, placeEvents } from "../utils/layoutHelpers";
import { eventsInTwoColumns } from "../utils/eventHelpers";

const time_first = [
  "8:00",
  "8:30",
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30"
];

const time_second = [
  "12:30",
  "1:00",
  "1:30",
  "2:00",
  "2:30",
  "3:00",
  "3:30",
  "4:00",
  "4:30",
  "5:00"
];

class Calendar extends Component {
  componentDidMount() {
    this.renderCalendarEvents();
  }

  componentDidUpdate() {
    this.renderCalendarEvents();
  }

  renderCalendarEvents() {
    const groupedEventsWithWidth = groupAndSetWidth(this.props.events);
    const [leftColumn, rightColumn] = eventsInTwoColumns(this.props.events);
    placeEvents(groupedEventsWithWidth, leftColumn, false);
    placeEvents(groupedEventsWithWidth, rightColumn, true);
  }

  firstColumn = () =>
    time_first.map(time => {
      return (
        <div key={time} id={time}>
          {time}
        </div>
      );
    });

  secondColumn = () =>
    time_second.map(time => {
      return (
        <div key={time} id={time}>
          {time}
        </div>
      );
    });

  render() {
    const [leftColumn, rightColumn, doubleEvents] = eventsInTwoColumns(
      this.props.events
    );

    const leftColumnEvents = leftColumn.map(({ _id, title }) => {
      return (
        <div key={_id} id={_id} className="event">
          <h4>{title}</h4>
        </div>
      );
    });
    const rightColumnEvents = rightColumn.map(({ _id, title }) => {
      return (
        <div
          key={_id}
          id={`${_id}right`}
          className={`event ${doubleEvents.includes(_id) ? "doubled" : ""}`}
        >
          <h4>{title}</h4>
        </div>
      );
    });

    return (
      <div className="calendar">
        <div className="column-1">
          <div className="time">{this.firstColumn()}</div>
          <div className="events">{leftColumnEvents}</div>
        </div>
        <div className="column-2">
          <div className="time">{this.secondColumn()}</div>
          <div className="events">{rightColumnEvents}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ events }) => ({
  events
});

export default connect(mapStateToProps)(Calendar);
