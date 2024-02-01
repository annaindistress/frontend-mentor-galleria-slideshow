import styles from "./Header.module.css";
import logoImg from "../assets/logo.svg";
import { useSlideshow } from "../context/SlideshowContext";

export default function Header() {
  const { pictures, status, dispatch } = useSlideshow();

  function handleClick() {
    if (status === "start") {
      dispatch({ type: "slideshow/started", payload: pictures[0].name });
    } else {
      dispatch({ type: "slideshow/finished" });
    }
  }

  return (
    <header className={styles.header}>
      <img src={logoImg} alt="Galleria logo" width="113" height="32" />
      <button type="button" onClick={handleClick}>
        {status === "start" ? "Start slideshow" : "Stop slideshow"}
      </button>
    </header>
  );
}
