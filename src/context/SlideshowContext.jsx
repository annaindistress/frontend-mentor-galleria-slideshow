import { PropTypes } from "prop-types";
import { createContext, useContext, useReducer } from "react";
import data from "../assets/data.json";

const SlideshowContext = createContext();

const initialState = {
  pictures: data,
  status: "start",
  index: 0,
  currentTimer: 0,
  isPaused: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "slideshow/started":
      return {
        ...state,
        status: "in-progress",
        index: state.pictures.findIndex(
          (picture) => picture.name === action.payload
        ),
      };
    case "slideshow/finished":
      return { ...state, status: "start", index: 0 };
    case "slide/previous":
      return {
        ...state,
        index: state.index - 1,
        currentTimer: 0,
      };
    case "slide/next":
      return {
        ...state,
        index: state.index + 1,
        currentTimer: 0,
      };
    case "timer/updated":
      return { ...state, currentTimer: state.currentTimer + action.payload };
    case "timer/paused":
      return { ...state, isPaused: !state.isPaused };
    default:
      throw new Error("Unknown action");
  }
}

function SlideshowProvider({ children }) {
  const [{ pictures, status, index, currentTimer, isPaused }, dispatch] =
    useReducer(reducer, initialState);

  return (
    <SlideshowContext.Provider
      value={{ pictures, status, index, currentTimer, isPaused, dispatch }}
    >
      {children}
    </SlideshowContext.Provider>
  );
}

SlideshowProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

function useSlideshow() {
  const context = useContext(SlideshowContext);

  if (context === undefined)
    throw new Error("SlideshowContext was used outside of SlideshowProvider");

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { SlideshowProvider, useSlideshow };
