import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {
  function newAppt(props) {
    return !props.time ? `No Appointments` : `Appointment at ${props.time}`;
  }

  if (!props.interview) {
    return (
      <article className="appointment">
        {props.time}
        <Empty />
      </article>
    );
  } else if (props.interview) {
    return (
      <article className="appointment">
        {props.time}
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      </article>
    );
  }

  return <article className="appointment">{newAppt(props)}</article>;
}
