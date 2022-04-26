import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

// transition variables
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRMING = 'CONFIRMING';
const EDITING = 'EDITING';
const SAVE_ERR = "SAVE_ERR";
const DELETE_ERR = "DELETE_ERR";

export default function Appointment(props) {
  // Saving an appointment function
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(SAVE_ERR, true));
  }

  function deleted(event) {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(DELETE_ERR, true));
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function edit() {
    transition(EDITING);
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && (
        <Empty
          onAdd={() => {
            return transition(CREATE);
          }}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRMING)}
          onEdit={() => edit()}
        />)}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />)}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRMING && (
        <Confirm
          onConfirm={() => deleted()}
          onCancel={back}
          message="Confirm delete?"
        />
      )}
      {mode === EDITING && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === SAVE_ERR && (
        <Error
          message="Could not complete your request to save"
          onClose={back}
        />
      )}
      {mode === DELETE_ERR && (
        <Error
          message="Could not complete your request to delete"
          onClose={back}
        />
      )}
    </article>
  )
}
