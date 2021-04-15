import React from "react";

// function getAppointmentsForDay(state, day) {
//   const filteredDays = state.days.filter(
//     (filteredDay) => filteredDay.name === day
//   );

//   const appointmentPerDay = filteredDays[0].appointments;

//   const appointments = Object.keys(state.appointments);
//   const matchedAppointments = [];
//   console.log(appointments);

//   appointmentPerDay.map((id) => {
//     if (state.appointments[id] === appointments) {
//       matchedAppointments.push(id);
//       console.log("map id", id);
//     }
//     console.log("matched appointments", matchedAppointments);
//   });
// }

// console.log(getAppointmentsForDay(state, "Tuesday"));

export default function getAppointmentsForDay(state, day) {
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
}
