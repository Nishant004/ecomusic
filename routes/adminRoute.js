const express = require('express');
const router = express.Router();
const multer = require('multer')
const authmiddleware = require('../middleware/authmiddleware');
const { cloudinary } = require('../cloudinary');
const Song = require('../models/songModel');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage });
router.post('/add-song', authmiddleware, upload.single("file"), async (req, res) => {




    try {
        cloudinary.v2.uploader.upload(req.file.path, {
            folder: 'ecomusic',
            use_filename: true,
            // unique_filename: false,
            resource_type: "raw",
        }, async (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: 'Something went wrong' });
            } else {
                const newsong = new Song({
                    title: req.body.title,
                    artist: req.body.artist,
                    src: result.url,
                    album: req.body.album,
                    duration: req.body.duration,
                    year: req.body.year,
                });

                await newsong.save();
                const allSongs = await Song.find();

                res.status(200).send({ success: true, message: 'Song added successfully', data: allSongs, });
                console.log(result);
            }
        });



    } catch (error) {
        res.status(500).send({ success: false, message: 'Error adding song', data: error, });
    }

})


router.post('/edit-song', authmiddleware, upload.single("file"), async (req, res) => {


    try {
let response = null;
if(req.file){
         response = await cloudinary.v2.uploader.upload(req.file.path, {
            folder: 'ecomusic',
            use_filename: true,
            // unique_filename: false,
            resource_type: "raw",
        },);
    }
        await Song.findByIdAndUpdate(req.body._id, {
            title: req.body.title,
            artist: req.body.artist,
            src: response ? response.url : req.body.src,
            album: req.body.album,
            duration: req.body.duration,
            year: req.body.year,
        });


        const allSongs = await Song.find();

        res.status(200).send({ success: true, message: 'Song edited successfully', data: allSongs, });
        console.log(result);



    } catch (error) {
        res.status(500).send({ success: false, message: 'Error adding song', data: error, });
    }

})





module.exports = router;