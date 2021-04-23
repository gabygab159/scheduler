import React, { Fragment, useEffect } from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show.js";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Error from "./Error.js";
import useVisualMode from "hooks/useVisualMode.js";
import Confirm from "./Confirm";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const { interview } = props;
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))

      .catch((error) => {
        transition(ERROR_SAVE, true);
        console.error(error);
      });
  }

  function destroy(event) {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  }

  useEffect(() => {
    if (interview && mode === EMPTY) {
      transition(SHOW);
    }

    if (interview === null && mode === SHOW) {
      transition(EMPTY);
    }
  }, [interview, transition, mode]);

  return (
    <Fragment>
      <article className="appointment" data-testid="appointment">
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && props.interview && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            cancelInterview={props.cancelInterview}
            id={props.id}
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}
          />
        )}
        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save}
          />
        )}
        {mode === SAVING && <Status message="SAVING" />}
        {mode === DELETING && <Status message="DELETING" />}
        {mode === CONFIRM && (
          <Confirm
            onCancel={back}
            onRemove={destroy}
            message={`No takebacks...`}
          />
        )}
        {mode === EDIT && (
          <Form
            name={props.interview.student}
            value={props.value}
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save}
            interviewer={props.interview.interviewer.id}
          />
        )}
        {mode === ERROR_SAVE && (
          <Error message="Did not save!" onClose={back} />
        )}
        {mode === ERROR_DELETE && (
          <Error message="Did not delete!" onClose={back} />
        )}
      </article>
    </Fragment>
  );
}
