import path from "path";
import fs from "fs";

const returnImages = (req, res, next) => {
  const imagesDir = path.join(process.cwd(), "images");
  const requestedFile = path.join(imagesDir, req.path);

  // Check if the file exists
  if (!fs.existsSync(requestedFile)) {
    return res.status(404).json({ error: "Image not found" });
  }

  // If it exists the express server returns it
  next();
};

export default returnImages;
