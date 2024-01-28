import { useEffect, useState } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/workoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
const Home = () => {
  //const [workouts, setWorkouts] = useState(null);
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("http://localhost:4000/api/workouts", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const data = await response.json();

      if (response.ok) {
        //setWorkouts(data);
        dispatch({ type: "SET_WORKOUTS", payload: data });
      }
    };
    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]); /*this was added in the last*/

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
