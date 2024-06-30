const express = require("express");
const router = express.Router();
const Song = require("../models/Song");
const authenticate = require("../middlware/auth");

//Song creation by login user
router.post("/createSong", authenticate, async(req,res)=>{
    console.log(req.user)
    const {name, track, thumbnail} = req.body;

    if(!name || !track || !thumbnail){
        res.status(301).json("All fields are required");
    }
     
    const artist = req.user._id;
    const songDetails = {name, track, thumbnail, artist};

    try {
        const songCreate = await Song.create(songDetails);
        await songCreate.save();
        return res.status(200).json({"message":"Song created Successfully", songCreate});
    } catch (error) {
        res.status(400).json({"message":"Song can't create."});
    }
})


// Get all songs that login user created or published
router.get("/getMyAllSongs", authenticate, async(req, res)=>{
    const currentUser = req.user;
    const allSongs = await Song.find({artist:currentUser._id});

    if(!allSongs){
        res.status(404).json({message:"No songs found"});
    }
    
    res.status(200).json({allSongs});
})

module.exports = router;

// Get all the songs by artist
router.get('/get/artistSong', authenticate, async(req, res)=>{
    const artistId = req.body;

    const userExist = await User.find({_id:artistId});
     if(!userExist){
        res.status(404).json({"message":"User does not exist"})
    }

    const allSongOfArtist = await Song.find({artist:artistId});
    if(!allSongOfArtist){
        res.status(300).json({"message":"No songs Present"})
    }
})

// Get song by songName
router.get("/get/songName",authenticate,async(req,res)=>{
    const songName = req.body;

    if(!songName){
        res.status(301).json({"message":"Song name is not present"})
    }

    var regexPattern = songName.split('').join('.*');

    const song = await Song.find({
        name: { 
            $regex: new RegExp(regexPattern, "i") 
        } 
    });

    if(!song){
        res.status(401).json({message:"Song not present"});
    }

    res.status(200).json(song);
})