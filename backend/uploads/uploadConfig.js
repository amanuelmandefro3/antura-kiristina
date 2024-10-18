import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinaryConfig.js';

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'blog_images',
        allowed_formats: ['jpeg', 'png', 'jpg']
    }
});

const upload = multer({ storage });

export default upload;
