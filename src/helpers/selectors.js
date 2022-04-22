// Retrieves the appointment for the day selected

export function getAppointmentsForDay(state, dayName) {
  // step 1 - find the day object
  // step 2 - iterate appointment ids
  // step 3 - get appointment for each id
  // step 4 - add apointment to list
  // step 5 - return list

  const results = [];
  const day = state.days.find(d => d.name == dayName)
  if (!day) {
    return [];
  }

  for (const id of day.appointments) {
    const appointment = state.appointments[id]
    results.push(appointment)
  }

  return results;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewContent = {
    student: interview.student
  };

  interviewContent.interviewer = state.interviewers[interview.interviewer];
  return interviewContent;
}
