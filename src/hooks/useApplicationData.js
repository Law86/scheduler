import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {
  const setDay = (day) => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  // Function for saving and updating state
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState((prev) => {
        const isEditingAppointment = prev.appointments[id].interview;
        const updatedDays = prev.days.map((day) => {
          return {
            ...day,
            spots:
              day.name === prev.day && !isEditingAppointment
                ? day.spots - 1
                : day.spots,
          };
        });
        return { ...prev, appointments, days: updatedDays };
      });
    });
  }

  // Function for deleting and handling state
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.delete(`/api/appointments/${id}`).then(() => {
      const updatedDays = state.days.map((day) => {
        return {
          ...day,
          spots: day.name === state.day ? day.spots + 1 : day.spots,
        };
      });
      setState((prev) => ({ ...prev, appointments, days: updatedDays }));
    });
  }

  // API server requests for data
  useEffect(() => {
    const promise1 = axios.get("/api/days");
    const promise2 = axios.get("/api/appointments");
    const promise3 = axios.get("/api/interviewers");

    Promise.all([promise1, promise2, promise3]).then((res) => {
      const days = res[0].data;
      const appointments = res[1].data;
      const interviewers = res[2].data;

      setState((prev) => ({ ...prev, days, appointments, interviewers }));
    });
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
