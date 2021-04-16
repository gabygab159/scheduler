import React from "react";

const getAppointmentsForDay = (state, day) => {
  let infoForDay = state.days.find((obj) => obj.name === day);
  if (!infoForDay) {
    return [];
  }
  let appointmentsForDay = infoForDay.appointments;
  if (!appointmentsForDay) {
    return [];
  }
  const result = appointmentsForDay.map((id) => {
    if (state.appointments[id]) {
      return state.appointments[id];
    }
  });
  return result;
};

const getInterview = (state, interview) => {
  if (!interview) {
    return null;
  }
  const interviewObj = {
    ...interview,
    interviewer: { ...state.interviewers[interview.interviewer] },
  };

  return interviewObj;
};

const getInterviewersForDay = (state, day) => {
  let infoForDay = state.days.find((obj) => obj.name === day);
  if (!infoForDay) {
    return [];
  }
  let interviewersForDay = infoForDay.interviewers;
  if (!interviewersForDay) {
    return [];
  }

  const result = interviewersForDay.map((id) => {
    if (state.interviewers[id]) {
      return state.interviewers[id];
    }
  });
  return result;
};

export { getAppointmentsForDay, getInterview, getInterviewersForDay };
