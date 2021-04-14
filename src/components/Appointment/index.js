import React, { Fragment } from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show.js";
import Empty from "./Empty";

export default function Appointment(props) {
  return (
    <Fragment>
      <article className="appointment">
        <Header time={props.time} />
        {props.interview ? (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          />
        ) : (
          <Empty />
        )}
      </article>
    </Fragment>
  );
}
