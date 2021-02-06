// Connect to the storage account
var storage = require('azure-storage');

// TODO: create camera
class Camera {}

// TODO: change to use dotenv
var blobService = storage.createBlobService(
    process.env.ACCOUNT_NAME,
    process.env.ACCOUNT_KEY
);

// TODO: load images
