import { useEffect, useState } from "react";
import { useSlideshow } from "../context/SlideshowContext";
import GalleryItem from "./GalleryItem";
import styles from "./Gallery.module.css";

function generateColumns(items, columnCount) {
  const columns = [...Array(columnCount)].map(() => []);

  items.forEach((item, i) => {
    const column = i % columnCount;

    if (columnCount === 1) {
      columns[column].push(item);
    }

    if (columnCount === 2) {
      if (i < 10) {
        columns[column].push(item);
      } else {
        columns[Number(!column)].push(item);
      }
    }

    if (columnCount === 4) {
      if (i < 10) {
        columns[column].push(item);
      } else {
        const newColumn = column + 1 !== 4 ? column + 1 : 0;
        columns[newColumn].push(item);
      }
    }
  });

  return columns;
}

export default function Gallery() {
  const { pictures } = useSlideshow();
  const [columnCount, setColumnCount] = useState(1);

  const columns = generateColumns(pictures, columnCount);

  useEffect(function () {
    function handleResize() {
      if (window.innerWidth >= 1200) {
        setColumnCount(4);
      } else if (window.innerWidth >= 768) {
        setColumnCount(2);
      } else {
        setColumnCount(1);
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section>
      <h2 className="sr-only">Gallery</h2>
      <div className={styles.columns}>
        {columns.map((column, i) => (
          <div className={styles.column} key={i}>
            {column.map((picture) => (
              <GalleryItem key={picture.name} picture={picture} index={i} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
