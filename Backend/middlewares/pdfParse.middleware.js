import fs from "fs";
import pdfParse from "pdf-parse-new";
import path from "path";

const parsePdf = async (req, res, next) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "Pdf file not uploaded!" });
    }

    const filePath = req.file.path;
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);

    // Saving parsed text to a file in same directory
    const parsedTextPath = path.join(
      path.dirname(filePath),
      path.basename(filePath, path.extname(filePath)) + ".txt"
    );
    fs.writeFileSync(parsedTextPath, data.text, "utf8");

    console.log("PDF converted successfully!");
    req.pdfText = data.text;

    next();
  } catch (err) {
    console.error("Error parsing PDF:", err);
    res
      .status(500)
      .json({ message: "Couldn't parse the file! Internal Server Error!" });
  }
};

export default parsePdf;
