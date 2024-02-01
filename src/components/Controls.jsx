import { useEffect, useState } from "react";
import { useSlideshow } from "../context/SlideshowContext";
import { TIMER_MAX, TIMER_STEP } from "../config";
import styles from "./Controls.module.css";

export default function Controls() {
  const { pictures, index, dispatch } = useSlideshow();
  const [timerValue, setTimerValue] = useState(0);

  const currentPicture = pictures[index];

  const isFirst = index === 0;
  const isFinal = index === pictures.length - 1;

  useEffect(function () {
    const id = setInterval(function () {
      setTimerValue((value) => value + TIMER_STEP);
    }, TIMER_STEP);

    return () => clearInterval(id);
  }, []);

  useEffect(
    function () {
      if (timerValue === TIMER_MAX) {
        if (!isFinal) {
          dispatch({ type: "slide/next" });
          setTimerValue(0);
        }
      }
    },
    [isFinal, timerValue, dispatch]
  );

  function handlePrev() {
    dispatch({ type: "slide/previous" });
    setTimerValue(0);
  }

  function handleNext() {
    dispatch({ type: "slide/next" });
    setTimerValue(0);
  }

  return (
    <footer className={styles.footer}>
      <progress max={TIMER_MAX} value={timerValue} />
      <div>
        <p>
          <span className={styles.name}>{currentPicture.name}</span>
          <span>{currentPicture.artist.name}</span>
        </p>
        <button
          className={`${styles.button} ${styles.buttonPrev}`}
          disabled={isFirst}
          onClick={handlePrev}
        >
          Previous picture
          <svg
            width="17"
            height="16"
            viewBox="0 0 26 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <g stroke="currentColor" fill="none" fillRule="evenodd">
              <path
                d="M24.166 1.843L3.627 12.113l20.539 10.269V1.843z"
                strokeWidth="2"
              />
              <path fill="#d8d8d8" d="M.986.5h-1v22.775h1z" />
            </g>
          </svg>
        </button>
        <button
          className={`${styles.button} ${styles.buttonNext}`}
          disabled={isFinal}
          onClick={handleNext}
        >
          Next picture
          <svg
            width="17"
            height="16"
            viewBox="0 0 26 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <g stroke="currentColor" fill="none" fillRule="evenodd">
              <path
                d="M1.528 1.843l20.538 10.27L1.528 22.382V1.843z"
                strokeWidth="2"
              />
              <path fill="#d8d8d8" d="M24.708.5h1v22.775h-1z" />
            </g>
          </svg>
        </button>
      </div>
    </footer>
  );
}
