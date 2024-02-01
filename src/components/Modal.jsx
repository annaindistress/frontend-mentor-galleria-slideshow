import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { useSlideshow } from "../context/SlideshowContext";
import styles from "./Modal.module.css";

export default function Modal({ isOpen, onClose }) {
  const { pictures, index } = useSlideshow();
  const currentPucture = pictures[index];
  const ref = useRef();

  const imgUrl = new URL(currentPucture.images.gallery, import.meta.url).href;

  useEffect(() => {
    if (isOpen) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={ref} onCancel={onClose} className={styles.dialog}>
      <button type="button" onClick={onClose}>
        Close
      </button>
      <img
        src={imgUrl}
        alt={`${currentPucture.artist.name}'s ${currentPucture.name}`}
      />
    </dialog>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
