import { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import Button from "./components/Button";
import { toBlob } from "html-to-image";
import { saveAs } from "file-saver";
import { twMerge } from "tailwind-merge";
import { Icon } from "@mui/material";
import {
  Add,
  East,
  North,
  NorthEast,
  NorthWest,
  South,
  SouthEast,
  SouthWest,
  West,
} from "@mui/icons-material";

type Alignment = "top" | "center" | "bottom";
type Justification = "left" | "center" | "right";

const alignStyles = {
  top: "items-start",
  center: "items-center",
  bottom: "items-end text-end",
};

const justifyStyles = {
  left: "justify-start text-left",
  center: "justify-center text-center",
  right: "justify-end text-end",
};

function App() {
  const [name, setName] = useState<string>("Ben");
  const [quote, setQuote] = useState<string>("Several people are typing.");
  const [image, setImage] = useState<string | null>(null);
  const [querying, setQuerying] = useState<boolean>(true);
  const [align, setAlign] = useState<Alignment>("center");
  const [justify, setJustify] = useState<Justification>("center");

  const queryImage = async () => {
    setQuerying(true);
    const res = await fetch("https://picsum.photos/700");

    setImage(res.url);
    setQuerying(false);
  };

  const alignText = (align: Alignment, justify: Justification) => {
    setAlign(align);
    setJustify(justify);
  };

  const handleDownloadImage = async () => {
    const polaroidElement = document.getElementById("polaroid");

    if (!polaroidElement) return;

    toBlob(polaroidElement)
      .then((blob) => {
        if (!blob) throw new Error("No blob found");
        saveAs(blob, "polaroid.png");
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    queryImage();
  }, []);

  const imgTag = (
    <img src={image || ""} alt="" className="h-full w-full object-cover" />
  );

  const spinner = <InfinitySpin color="#3730a3" />;

  return (
    <>
      <main className="grid min-h-screen place-items-center bg-indigo-700">
        <section className="container m-8 grid w-full gap-8 rounded-xl bg-indigo-800 p-8 text-zinc-100 shadow-xl shadow-indigo-950 lg:grid-cols-2">
          <div className="flex flex-col justify-center gap-4">
            <div className="flex items-center gap-4">
              <div className="flex w-full flex-col gap-1">
                <label htmlFor="quote">Quote</label>
                <textarea
                  className="h-32 w-full bg-zinc-100 px-4 py-2 text-black shadow-md shadow-indigo-950"
                  id="quote"
                  value={quote}
                  onChange={(e) => {
                    setQuote(e.target.value);
                  }}
                />
              </div>
              <div className="mx-auto grid w-fit grid-cols-3 gap-1">
                <button
                  className="text-zinc-100 transition-colors duration-75 hover:text-zinc-200 focus:text-zinc-200 active:text-zinc-300"
                  onClick={() => alignText("top", "left")}
                >
                  <Icon component={NorthWest} />
                </button>
                <button
                  className="text-zinc-100 transition-colors duration-75 hover:text-zinc-200 focus:text-zinc-200 active:text-zinc-300"
                  onClick={() => alignText("top", "center")}
                >
                  <Icon component={North} />
                </button>
                <button
                  className="text-zinc-100 transition-colors duration-75 hover:text-zinc-200 focus:text-zinc-200 active:text-zinc-300"
                  onClick={() => alignText("top", "right")}
                >
                  <Icon component={NorthEast} />
                </button>
                <button
                  className="text-zinc-100 transition-colors duration-75 hover:text-zinc-200 focus:text-zinc-200 active:text-zinc-300"
                  onClick={() => alignText("center", "left")}
                >
                  <Icon component={West} />
                </button>
                <button
                  className="text-zinc-100 transition-colors duration-75 hover:text-zinc-200 focus:text-zinc-200 active:text-zinc-300"
                  onClick={() => alignText("center", "center")}
                >
                  <Icon component={Add} />
                </button>
                <button
                  className="text-zinc-100 transition-colors duration-75 hover:text-zinc-200 focus:text-zinc-200 active:text-zinc-300"
                  onClick={() => alignText("center", "right")}
                >
                  <Icon component={East} />
                </button>
                <button
                  className="text-zinc-100 transition-colors duration-75 hover:text-zinc-200 focus:text-zinc-200 active:text-zinc-300"
                  onClick={() => alignText("bottom", "left")}
                >
                  <Icon component={SouthWest} />
                </button>
                <button
                  className="text-zinc-100 transition-colors duration-75 hover:text-zinc-200 focus:text-zinc-200 active:text-zinc-300"
                  onClick={() => alignText("bottom", "center")}
                >
                  <Icon component={South} />
                </button>
                <button
                  className="text-zinc-100 transition-colors duration-75 hover:text-zinc-200 focus:text-zinc-200 active:text-zinc-300"
                  onClick={() => alignText("bottom", "right")}
                >
                  <Icon component={SouthEast} />
                </button>
              </div>
            </div>
            <div className="flex w-full flex-col gap-1">
              <label htmlFor="name">Name</label>
              <input
                className="w-full bg-zinc-100 px-4 py-2 text-black shadow-md shadow-indigo-950"
                type="text"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-row justify-around">
              <Button title="New Image" onClick={queryImage} />
              <Button title="Save PNG" onClick={handleDownloadImage} />
            </div>
          </div>
          <div className="grid h-full place-items-center">
            <div
              id="polaroid"
              className="flex h-full max-h-fit w-full flex-col gap-4 bg-zinc-100 p-8 shadow-xl shadow-indigo-950"
            >
              <div className="relative grid aspect-square place-items-center">
                {image && !querying ? imgTag : spinner}
                <div
                  className={twMerge(
                    "font-caveat absolute flex h-full w-full bg-indigo-950 bg-opacity-30 px-8 py-16 text-5xl",
                    alignStyles[align],
                    justifyStyles[justify],
                  )}
                >
                  <p className="max-w-md">{quote || "Quote goes here"}</p>
                </div>
              </div>
              <p className="font-pinyon mx-2 text-end text-6xl leading-relaxed text-zinc-900">
                &ndash;{name || "Name goes here"}
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
