import express from 'express';
import multer from 'multer';
import path from 'path';
import pkg from 'cloudinary';
import asyncHandler from 'express-async-handler';
const router = express.Router();

const cloudinary = pkg;
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
}

const errorHandler = (err, req, res, next) => {
  //error handler gets called only when catches error
  if (err instanceof multer.MulterError) {
    res.status(400);
  }
  next(err); //redirect to custom error handler
};

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// router.post('/', upload.single('image'), (req, res) => {
//   res.send(`/${req.file.path}`);
// });

router.post(
  '/',
  upload.single('image'),
  asyncHandler(async (req, res) => {
    const uploadPhoto = await cloudinary.uploader.upload(`${req.file.path}`);
    console.log(uploadPhoto);
    console.log(uploadPhoto.url);
    res.send(uploadPhoto.url);
  })
);

export default router;
