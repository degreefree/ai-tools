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
  setEpNumber,
}) => {
  const [transcript, setTranscript] = useState({});
  function extractLastNumber(filename) {
    const regex = /(\d+)\.txt$/;
    const match = filename.match(regex);
    if (match) {
      return parseInt(match[1]);
    } else {
      return null;
    }
  }
  const handleFileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      let reader = new FileReader();
      reader.readAsText(file);

      reader.onload = function () {
        const textFromFile = reader.result;
        setTranscript(textFromFile);
        setEpNumber(extractLastNumber(file.name));
        setFileUploaded(true);
      };
    }
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
    setFileUploaded(false);
    setResultIsLoading(true);
    await fetch("/transcript", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(separatedTranscripts),
    })
      .then((result) => result.json())
      .then((data) => {
        setTitle(JSON.parse(data.titles)[0]);
        console.log(data.description);
        console.log(data.tags);
        setThumbnailHooks(JSON.parse(data.hooks)[0]);
        setDescription(JSON.parse(data.description));

        setTags(data.tags);
        setResultIsLoading(false);
        setFileUploaded(true);
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
