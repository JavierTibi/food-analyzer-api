import express from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import AWS from "aws-sdk";
import { S3Client } from '@aws-sdk/client-s3';
import { analyzeImage } from "../lib/spoonacular";

const router = express.Router();

const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

if (!region || !accessKeyId || !secretAccessKey) {
    throw new Error("Missing AWS configuration in environment variables.");
}

 const s3Config = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey
    }
 });


const upload = multer({
  storage: multerS3({
    s3: s3Config,
    bucket: process.env.AWS_BUCKET_NAME!,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, `uploads/${Date.now()}-${file.originalname}`);
    }
  })
});

// Endpoint POST /upload
router.post("/upload", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const imageUrl = (req.file as any).location;

  try {
    const analysis = await analyzeImage(imageUrl);
    return res.json({ imageUrl, analysis });
  } catch (err) {
    console.error("Error analyzing image:", err);
    return res.status(500).json({ error: "Error analyzing image" });
  }
});

export default router;