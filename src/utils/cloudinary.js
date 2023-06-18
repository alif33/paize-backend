const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "homefinder",
    api_key: "532868158442312",
    api_secret: "WUhS3KKIpzrQTJfEpnwBf4YQ7uo",
});

module.exports = cloudinary;