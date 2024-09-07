import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import multer from "multer"
import path from "path"
import fs from "fs"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import router from "./routes/mahasiswa.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

// cors
const corsOption = {
   origin: 'http://localhost:5173',
   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
   allowedHeaders: ['Content-Type', 'Authorization'],
};

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, path.join(__dirname, 'uploads'));
   },
   filename: (req, file, cb) => {4
      const filename = Date.now() + '_' + file.originalname;
      cb(null, filename);
   }
});

const fileFilter = (req, file, cb) => {
   if (file.mimetype === 'image/jpeg' || 
      file.mimetype === 'image/png' || 
      file.mimetype === 'image/jpg') 
      {
      cb(null, true);
   } else {
      cb(new Error('Invalid file type, only JPEG, PNG, and JPG are allowed!'), false);
   }
};

const upload = multer({
   storage: storage,
   fileFilter: fileFilter
});

// middleware
app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('backend/uploads'))

// endpoint
app.use('/dashboard', upload.single('gambar'), router);

app.listen(4000, () => {
   console.log('Server is running on port 4000');
});