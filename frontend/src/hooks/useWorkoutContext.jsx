import { WorkoutsContext } from "../context/WorkoutContext.jsx";
import { useContext } from "react";

export const useWorkoutsContext = () => {
  const context = useContext(WorkoutsContext);

  if (!context) {
    throw Error("usecontext must be used inside an WorkoutContextProvider");
  }

  return context;
};
