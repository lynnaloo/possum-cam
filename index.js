const storage = require('azure-storage');
const Camera = require('./camera');
const cameraData = require('./mock-cameras.json');

require('dotenv').config()

const blobService = storage.createBlobService(
    process.env.STORAGE_ACCOUNT_NAME,
    process.env.STORAGE_ACCOUNT_KEY
);

// parse the JSON file of cameras, create a new camera object, and then start
const cameras = cameraData.map((camera) => {
    const cameraObj = new Camera(
        camera.deviceId,
        camera.latitude,
        camera.longitude,
        blobService
    );
    return cameraObj;
});

// start all of the cameras
cameras.forEach(camera => {
    camera.start();
});
