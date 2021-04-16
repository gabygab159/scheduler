import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

// PROPS
// interviewers:array - an array of objects containing the information of each interviewer
// interviewer:number - the id of an interviewer
// setInterviewer:function - a function that accepts an interviewer id

export default function InterviewerList(props) {
  console.log("this is interviewer list -->", props.interviewers);
  const interviewers = props.interviewers.map((iteratedInterviewer) => {
    return (
      <InterviewerListItem
        key={iteratedInterviewer.id}
        name={iteratedInterviewer.name}
        avatar={iteratedInterviewer.avatar}
        selected={iteratedInterviewer.id === props.value}
        setInterviewer={(event) => props.onChange(iteratedInterviewer.id)}
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}
