const express = require("express");
const authenticate = require("../middlware/auth");
const Playlist = require("../models/Playlist");
const User = require("../models/User");
const Song = require("../models/Song");
const router = express.Router();

// Create a playlist
router.post("/createPlaylist",authenticate, async(req,res)=>{
    const currentUser = req.user;
    const { name, thumbnail, songs} = req.body;

    if(!name || !thumbnail || !songs){
        return res.status(201).json({"err":"Data Insufficient"})
    }

    const playListData = {name, thumbnail, songs, owner:currentUser._id, collaborators:[]}

    const createdPlayList = await Playlist.create(playListData);
    await createdPlayList.save();

    return res.status(200).json({message:"Playlist Created Successfully",data:createdPlayList})
})

// Get the platlist by ID
router.get("/getPlayList/:playListId", async(req, res)=>{
    const playListId = req.params.playListId;

    const playListFound = await Playlist.findOne({_id:playListId});

    if(!playListFound){
        return res.status(301).json({"err":"Playlist not found"})
    }

    return res.status(200).json({"data":playListFound});
})


// Get all the playlist made by an artist
router.get("/get/playlist/:artistID", authenticate, async(req, res)=>{
    const artistID = req.params.artistID;
    
    const artist = await User.findOne({_id:artistID});

    if(!artist){
        return res.status(300).json({err:"Artist not found ! Invalid ID"});
    }

    const playlists = await Playlist.find({owner:artistID});
    
    if(!playlists){
        return res.status(300).json({err:"No Playlist Found"});
    }

    return res.status(200).json({data: playlists});
})

// Add a song to a playlist
router.post("/add/song", authenticate,async(req,res)=>{
    const {playlistId, songId} = req.body;

    if(!playlistId || !songId){
        return res.status(300).json({"err":"Playlist and song name is required"});
    }

    const currentUser = req.user;

    // check 0 valid playlist
    const validPlaylist = await Playlist.findOne({_id:playlistId});

    if(!validPlaylist){
        return res.status(300).json({"err":"Playlist is not valid or not present."})
    }
   console.log(validPlaylist.owner.toString()!= currentUser._id);
    // check 1 user is allowed to add song
    if(validPlaylist.owner.toString() != currentUser._id && !validPlaylist.collaborators.includes(currentUser._id)){
        return res.status(300).json({"err":"User is not allowed to add in this playlist"})
    }

    // check 2 song is valid or not
    const validSong = await Song.findOne({_id:songId});

    if(!validSong){
        return res.status(300).json({"err":"Song is not valid"});
    }

    // add song to the playlist
    validPlaylist.songs.push(songId);
    await validPlaylist.save();

    return res.status(200).json({validPlaylist});
})


module.exports = router;

