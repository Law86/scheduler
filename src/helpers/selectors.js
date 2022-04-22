// Retrieves the appointment for the day selected

export function getAppointmentsForDay(state, dayName) {
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

export function getInterviewersForDay(state, dayName) {
  const results = [];
  const day = state.days.find(d => d.name == dayName)
  if (!day) {
    return [];
  }

  for (const id of day.interviewers) {
    const interviewer = state.interviewers[id]
    results.push(interviewer)
  }

  return results;
}