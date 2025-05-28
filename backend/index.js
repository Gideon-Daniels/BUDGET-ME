import path from "node:path";

const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();
const port = 3000;
// const { pdfParser } = require("./pdf2table");
import { Scribe } from "./scribe.js";
// Middleware
app.use(cors()); // Allow requests from your Angular app
app.use(express.json());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Set your uploads folder here
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname); // e.g., '.jpg'
    const baseName = path.basename(file.originalname, ext); // e.g., 'photo'

    const customFileName = `${baseName}-${timestamp}${ext}`;
    cb(null, customFileName);
  },
});

const upload = multer({ storage: storage });
// Configure Multer for file upload
// const upload = multer({ dest: "uploads/" });

// POST route for PDF upload
app.post("/upload", upload.single("pdfFile"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  // Read the uploaded file
  const filePath = req.file.path;

  // Parse the PDF
  // pdfParser(filePath, (err, data) => {
  //   if (err) {
  //     console.error("Failed to parse PDF:", err);
  //     return res.status(500).send("Error parsing PDF file.");
  //   }
  //
  //   console.log("Parsed Data:", data);
  //   res.json(data);
  // });

  try {
    const pdfService = new Scribe(filePath);
    await pdfService.init();
    await pdfService.start();
    await pdfService.stop();
    const rows = pdfService.rows;
    const columnHeadings = pdfService.columnHeadings;
    res.json({
      rows,
      columnHeadings,
    });
  } catch (e) {
    console.log(e);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
