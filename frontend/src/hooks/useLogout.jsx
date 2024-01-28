import { useAuthContext } from "./useAuthContext";
//final step work
import { useWorkoutContext } from "./useWorkoutContext";

const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutsDispatch } = useWorkoutContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");

    // dipatch logout action
    dispatch({ type: "LOGOUT" });
    //when logout this clear global workout state
    workoutsDispatch({ type: "SET_WORKOUTS", payload: null });
  };
  return { logout };
};

export default useLogout;
