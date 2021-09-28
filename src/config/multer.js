const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const awssdk = require('aws-sdk');
const multerS3 = require('multer-s3');

const storageTypes = {
    local: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(10, (err, hash) => {
                if (err) cb(err);

                file.key = `${hash.toString('hex')}-${file.originalname}`
                cb(null, file.key);
            });
        }
    }),
    s3: multerS3({
        s3: new awssdk.S3(),
        bucket: 'easytracking-image',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            crypto.randomBytes(10, (err, hash) => {
                if (err) cb(err);

                const filename = `${hash.toString('hex')}-${file.originalname}`
                cb(null, filename);
            });
        }
    }),
};

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    storage: storageTypes['s3'],
    limits: {
        fileSize: 4 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const allowedMines = [
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/gif"
        ];
        if (allowedMines.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Tipo de Imagem invalida!'));
        };

    }

};