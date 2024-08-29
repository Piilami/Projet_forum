// import multer from 'multer';

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
//   }
// });

// const fileFilter = (req, file, cb) => {
//   // Accept images and videos only
//   if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
//     cb(null, true);
//   } else {
//     // Reject file
//     cb(null, false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter
// });
