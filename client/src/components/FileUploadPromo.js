import React, { useState } from "react";

const FileUploadPodcast = ({
  setTitle,
  setDescription,
  setResultIsLoading,
  setTags,
  setFile,
  fileUploaded,
  setFileUploaded,
  setThumbnailHooks,
  url,
  setUrl,
  epNumber,
  setEpNumber,
}) => {
  const [transcript, setTranscript] = useState({});

  const handleFileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    setFile(file);
    let reader = new FileReader();
    reader.readAsText(file);

    reader.onload = function () {
      const textFromFile = reader.result;
      setTranscript(textFromFile);
      setFileUploaded(true);
    };
  };

  const splitTranscriptIntoParagraphs = (transcript) => {
    const paragraphs = [];
    const words = transcript.split(" ");
    let currentParagraph = "";

    for (const word of words) {
      if ((currentParagraph + " " + word).trim().split(" ").length <= 2000) {
        currentParagraph += " " + word;
      } else {
        const lastSpaceIndex = currentParagraph.lastIndexOf(" ");
        if (lastSpaceIndex !== -1) {
          const splitIndex = lastSpaceIndex + 1;
          paragraphs.push(currentParagraph.substring(0, splitIndex).trim());
          currentParagraph = currentParagraph.substring(splitIndex);
        } else {
          paragraphs.push(currentParagraph.trim());
          currentParagraph = word;
        }
      }
    }

    if (currentParagraph.trim() !== "") {
      paragraphs.push(currentParagraph.trim());
    }

    return paragraphs;
  };
  const readFile = async (event) => {
    event.preventDefault();
    const separatedTranscripts = splitTranscriptIntoParagraphs(transcript);

    setResultIsLoading(true);
    await fetch("http://localhost:3000/promo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(separatedTranscripts),
    })
      .then((result) => result.json())
      .then((data) => {
        console.log(JSON.parse(data.hooks));
        console.log(JSON.parse(data.titles));
        console.log(data.tags);
        setTitle(JSON.parse(data.titles)[0]);
        setTags(data.tags);
        setThumbnailHooks(JSON.parse(data.hooks)[0]);
        setResultIsLoading(false);
        setFileUploaded(false);
      });
  };

  return (
    <div>
      <form
        className="drop-container flex flex-col items-center justify-center "
        id="transcription-form"
        encType="multipart/form-data"
        onSubmit={readFile}
      >
        <label className="flex flex-col gap-2 p-5" id="dropcontainer">
          <span className="drop-title">Drop Transcript file here (.txt)</span>

          <input
            id="file-upload"
            type="file"
            name="file"
            accept=".txt"
            onChange={handleFileChange}
          />
          <input
            type="number"
            id="episode-number"
            className="text-black p-2"
            placeholder="Episode number"
            value={epNumber}
            onChange={(e) => setEpNumber(e.target.value)}
            required
          />
          <input
            type="url"
            id="url"
            className="text-black p-2"
            placeholder="Episode Link on Spotify"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />

          {fileUploaded && (
            <input
              type="submit"
              value="GENERATE"
              className="text-xl min-w-full text-white bg-blue-950 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            />
          )}
        </label>
      </form>
    </div>
  );
};

export default FileUploadPodcast;
