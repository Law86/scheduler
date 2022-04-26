import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {
  const setDay = (day) => setState({ ...state, day });

  // getSpotsForDay function that passes in two params, day obj and appointments. Return num of spots

  // updateSpots function 

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
        //update spots function here
        setState(prev => ({ ...prev, appointments }))
      })
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: null
        }
        setState(prev => ({ ...prev, appointment }))
      })
  }

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
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}