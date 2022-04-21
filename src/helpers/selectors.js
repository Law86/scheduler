export function getAppointmentsForDay(state, day) {
  const daysAppt = state.days.map((day) => day.name);
  if (!day || !daysAppt.includes(day)) return [];

  return state.days
    .filter((appointment) => appointment.name === day)[0]
    .appointments.map((apptId) => state.appointments[apptId]);
}
