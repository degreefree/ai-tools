import React from "react";
import { useState } from "react";
import FileUploadPodcast from "./FileUploadPromo";
import PromoResults from "./PromoResults";
import AtomicSpinner from "atomic-spinner";

function Podcast() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState({
    titles: ["------", "-------", "-------"],
  });
  const [description, setDescription] = useState({
    intro: "------------------",
    key_discussion_points: [
      "------------------",
      "------------------",
      "------------------",
    ],
    outro: "------------------",
  });
  const [fileUploaded, setFileUploaded] = useState(false);
  const [tags, setTags] = useState("------------------");
  const [resultIsLoading, setResultIsLoading] = useState(false);
  const [thumbnailHooks, setThumbnailHooks] = useState({
    hooks: ["------", "-------", "-------"],
  });
  const [epNumber, setEpNumber] = useState(32);
  const [url, setUrl] = useState("http://www.degreefree.co/podcast");

  return (
    <div>
      <FileUploadPodcast
        setDescription={setDescription}
        file={file}
        setFile={setFile}
        setTitle={setTitle}
        setResultIsLoading={setResultIsLoading}
        setTags={setTags}
        setFileUploaded={setFileUploaded}
        fileUploaded={fileUploaded}
        setThumbnailHooks={setThumbnailHooks}
        epNumber={epNumber}
        setEpNumber={setEpNumber}
        url={url}
        setUrl={setUrl}
      />

      {!resultIsLoading ? (
        <PromoResults
          description={description}
          title={title}
          tags={tags}
          thumbnailHooks={thumbnailHooks}
          epNumber={epNumber}
          url={url}
        />
      ) : (
        <div className="loader-container flex justify-center items-center">
          <AtomicSpinner />
          <p> Generating Magic...</p>
        </div>
      )}
    </div>
  );
}

export default Podcast;
