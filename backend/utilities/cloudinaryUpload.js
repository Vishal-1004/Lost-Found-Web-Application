const cloudinary = require('cloudinary').v2;
// const dotenv = require("dotenv")
// dotenv.config();

async function cloudinaryUpload(image){
    // Configuration
    cloudinary.config({ 
        cloud_name: 'djeplonq5', 
        api_key: '443613367272531', 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    
    // Upload an image
    const uploadResult = await cloudinary.uploader
    .upload(
        image,{ folder: "/Found-Items" }
    )
    .catch((error) => {
        console.log(error);
    });    
    
    return uploadResult.secure_url; 
}

module.exports = { cloudinaryUpload };