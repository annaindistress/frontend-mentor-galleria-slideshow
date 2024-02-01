import { useSlideshow } from "../context/SlideshowContext";
import Header from "./Header";
import Main from "./Main";
import List from "./Gallery";
import Picture from "./Picture";
import Controls from "./Controls";

export default function App() {
  const { status } = useSlideshow();

  return (
    <>
      <Header />
      <Main>
        {status === "start" && (
          <>
            <h1 className="sr-only">Galleria － art gallery slideshow</h1>
            <List />
          </>
        )}
        {status === "in-progress" && (
          <>
            <Picture />
            <Controls />
          </>
        )}
      </Main>
    </>
  );
}
