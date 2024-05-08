import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "/home/ritvik/webDev/project/freelance/backend/public/temp")
    },
    filename: function (req, file, cb) { 
      cb(null, file.originalname)
    }
  })
  
export const upload = multer({ 
    storage, 
})