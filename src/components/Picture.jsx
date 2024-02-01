import { useEffect, useState } from "react";
import { useSlideshow } from "../context/SlideshowContext";
import Modal from "./Modal";
import { MEDIA_QUERIES } from "../config";
import styles from "./Picture.module.css";

export default function Picture() {
  const { pictures, index, dispatch } = useSlideshow();
  const [imageSize, setImageSize] = useState("small");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const currentPicture = pictures[index];

  useEffect(function () {
    function handleResize() {
      setImageSize(
        window.innerWidth >= MEDIA_QUERIES.TABLET ? "large" : "small"
      );
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleModal() {
    setIsOpenModal((state) => !state);
    dispatch({ type: "timer/paused" });
  }

  const imgUrl = new URL(currentPicture.images.hero[imageSize], import.meta.url)
    .href;
  const artistImgUrl = new URL(currentPicture.artist.image, import.meta.url)
    .href;

  return (
    <section className={styles.section}>
      <div className={styles.imageContainer}>
        <header className={styles.header}>
          <h1>{currentPicture.name}</h1>
          <p>{currentPicture.artist.name}</p>
        </header>
        <img
          className={styles.artist}
          src={artistImgUrl}
          alt={`${currentPicture.artist.name}'s portrait`}
        />
        <div className={styles.image}>
          <img
            src={imgUrl}
            alt={`${currentPicture.artist.name}'s ${currentPicture.name}`}
          />
          <button type="button" onClick={handleModal}>
            View image
          </button>
        </div>
      </div>
      <div>
        <p className={styles.year}>{currentPicture.year}</p>
        <p className={styles.text}>{currentPicture.description}</p>
        <a
          className={styles.source}
          href={currentPicture.source}
          target="_blank"
          rel="noreferrer"
        >
          Go to source
        </a>
      </div>
      <Modal isOpen={isOpenModal} onClose={handleModal} />
    </section>
  );
}
