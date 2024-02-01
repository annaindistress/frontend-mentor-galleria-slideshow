import { useSlideshow } from "../context/SlideshowContext";
import Header from "./Header";
import Main from "./Main";
import List from "./Gallery";

export default function App() {
  const { status, pictures, index } = useSlideshow();

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

        {status === "in-progress" && <p>{pictures[index].name}</p>}
      </Main>
    </>
  );
}
