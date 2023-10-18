import express from "express";
import titleRoute from "./server/routes/title.js";
import transcribeRoute from "./server/routes/transcribe.js";
import transcribeMp4Route from "./server/routes/transcribemp4.js";
import transcriptRoute from "./server/routes/pod.js";
import showNotesRoute from "./server/routes/showNotes.js";
import promoRoute from "./server/routes/promo.js";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/get", titleRoute);
app.use("/transcribe", transcribeRoute);
app.use("/mp4", transcribeMp4Route);
app.use("/promo", promoRoute);
app.use("/transcript", transcriptRoute);
app.use("/shownotes", showNotesRoute);
app.use("/shownotes", showNotesRoute);
app.use(express.static(__dirname + "/client/build/"));
app.get(/.*/, (req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
