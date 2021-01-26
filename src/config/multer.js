const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const { hash } = require('bcryptjs');

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'temp', 'uploads'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'temp', 'uploads'))
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);

                const fileName = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, fileName);
            });
        },
    }),
    limits: {
        fileSize: 2 * 1024 * 1024,
    },/*
    fileFilter: (req, file, cb) => {
        const allowedmines = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif',
            ''
        ];
        if (allowedmines.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type"));
        }
    }
    */
};