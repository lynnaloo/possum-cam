const fs = require('fs');
const imagesDir = "./photos";

class Camera {
    constructor(id, latitude, longitude, blobService) {
        this._id = id;
        this._latitude = latitude;
        this._longitude = longitude;
        this._blobService = blobService;
        this._interval = 300000;
    }

    start() {
        // Register the first callback
        setTimeout(this.timer, Math.random() * this._interval, this);
        console.log(`Wildlife camera ${this._id} has started`);
    }

    timer(self) {
        // Randomly select a photo
        // TODO: make this an API call
        fs.readdir(imagesDir, (err, files) => {
            if (err)
              console.log(err);
            else {
                const index = Math.floor(Math.random() * files.length);
                const filename = files[index]

                // Define the metadata to be written to the blob
                const metadata = {
                    'latitude': self._latitude,
                    'longitude': self._longitude,
                    'id': self._id
                };

                // Upload the blob
                self._blobService.createBlockBlobFromLocalFile('photos', filename, 'photos/' + filename, { 'metadata': metadata }, (err, result) => {
                    if (err) {
                        console.log(`${self._id}: Error ${filename}`);
                    }
                    else {
                        console.log(`${self._id}: Uploaded ${filename}`);
                    }
                });

                // Register the next callback
                setTimeout(self.timer, Math.random() * self._interval, self);
            }
        })
    }
}

module.exports = Camera;
