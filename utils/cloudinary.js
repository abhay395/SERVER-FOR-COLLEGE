const cloudinary = require("../config/cloudinaryConfig");
const fs = require("fs");

const uploadOncloudinary = async (localFilePath, fileType) => {
  if (!localFilePath) {
    return null;
  }
  try {
    const stream = cloudinary.uploader.upload_stream((error, result) => {
      if (error) {
        return res.status(500).send("Upload failed.");
      }
      res.status(200).send(result);
    });

    streamifier.createReadStream(req.file.buffer).pipe(stream);
    // fs.unlinkSync(localFilePath);
    return result;
  } catch (error) {
    // fs.unlinkSync(localFilePath);
    return null;
  }
};
exports.uploadOncloudinary = uploadOncloudinary;
