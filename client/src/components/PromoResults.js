import React from "react";
import { AiFillCopy } from "react-icons/ai";
function PodcastResults({ title, tags, thumbnailHooks, epNumber, url }) {
  const copyContent = async (target) => {
    try {
      await navigator.clipboard.writeText(target);
      console.log("Content copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="results p-5 flex flex-col gap-2">
      <div className="min-w-full flex flex-col gap-2 items-center justify-center result">
        <h3 className="text-md min-w-full text-white bg-blue-950 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Promo Video Title(s):
        </h3>{" "}
        <div className="flex justify-center items-center">
          <ul>
            {title.titles.map((title, index) => (
              <li key={index} className="flex p-1 items-center justify-center">
                • {title}{" "}
                <AiFillCopy
                  className="min-h-full h-10 w-10"
                  onClick={() => copyContent(title)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-2 items-center justify-center p-10 result">
        <div className="flex flex-col gap-2 justify-center items-center min-w-full">
          <h3 className="text-md min-w-full text-white bg-blue-950 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-4 py-2 text-center md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Promo Video Description:
          </h3>
          <div className="flex justify-center items-center text-left">
            <div>
              Taken from DF#{epNumber}: <br />
              <a href={url}>{url} </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 items-center justify-center p-10 result">
        <div className="flex flex-col gap-2 justify-center items-center min-w-full">
          <h3 className="text-md min-w-full text-white bg-blue-950 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-4 py-2 text-center md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Tags:
          </h3>
          <div className="flex justify-center items-center">
            <div>{tags}</div>
            <div>
              <AiFillCopy
                className="h-10 w-10"
                onClick={() => copyContent(tags)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="min-w-full flex flex-col gap-2 items-center justify-center result">
        <h3 className="text-md min-w-full text-white bg-blue-950 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Thumbnail Hooks:
        </h3>{" "}
        <div className="flex justify-center items-center">
          <ul>
            {thumbnailHooks.hooks.map((hook, index) => (
              <li key={index} className="flex p-1 items-center justify-center">
                • {hook}{" "}
                <AiFillCopy
                  className="min-h-full h-10 w-10"
                  onClick={() => copyContent(title)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PodcastResults;
