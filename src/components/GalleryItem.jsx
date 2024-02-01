import PropTypes from "prop-types";
import { useSlideshow } from "../context/SlideshowContext";
import styles from "./GalleryItem.module.css";

export default function GalleryItem({ picture }) {
  const { dispatch } = useSlideshow();
  const imgUrl = new URL(picture.images.thumbnail, import.meta.url).href;

  function handleClick(event) {
    event.preventDefault();
    dispatch({ type: "slideshow/started", payload: picture.name });
  }

  return (
    <article className={styles.article}>
      <div>
        <h3>
          <a href="#" onClick={(event) => handleClick(event)}>
            {picture.name}
          </a>
        </h3>
        <p>{picture.artist.name}</p>
      </div>
      <img src={imgUrl} alt={`${picture.artist.name}'s ${picture.name}`} />
    </article>
  );
}

GalleryItem.propTypes = {
  picture: PropTypes.object,
  index: PropTypes.number,
};
