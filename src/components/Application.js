import React, { useState, useEffect } from "react";
import Appointment from "./Appointment";
import "components/Application.scss";
import DayList from "./DayList";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

// import reactDom from "react-dom";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  useEffect(() => {
    const promise1 = axios.get("/api/days");
    const promise2 = axios.get("/api/appointments");
    const promise3 = axios.get("/api/interviewers")

    Promise.all([promise1, promise2, promise3])
      .then((res) => {
        const days = res[0].data
        const appointments = res[1].data
        const interviewers = res[2].data

        setState(prev => ({ ...prev, days, appointments, interviewers }));
      });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState(prev => ({ ...prev, appointments }))
      })
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const apptNull = {
          ...state.appointments[id],
          interview: null
        };
        const appointments = {
          ...state.appointments,
          [id]: apptNull
        }
        setState(prev => ({ ...prev, appointments }))
      })
  }

  const setDay = (day) => setState({ ...state, day });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  const apptList = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {apptList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
