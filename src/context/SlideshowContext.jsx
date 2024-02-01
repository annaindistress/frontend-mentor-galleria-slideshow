import { PropTypes } from "prop-types";
import { createContext, useContext, useReducer } from "react";
import data from "../assets/data.json";

const SlideshowContext = createContext();

const initialState = {
  pictures: data,
  status: "start",
  index: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "slideshow/started":
      return { ...state, status: "in-progress", index: action.payload };
    case "slideshow/finished":
      return { ...state, status: "start", index: 0 };
    default:
      throw new Error("Unknown action");
  }
}

function SlideshowProvider({ children }) {
  const [{ pictures, status, index }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <SlideshowContext.Provider value={{ pictures, status, index, dispatch }}>
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
