const mongoose=require('mongoose');

const playListSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    songs:[
        {
            type:mongoose.Types.ObjectId,
            ref:"song"
        }
    ],
    collaborators:[
        {
            type:mongoose.Types.ObjectId,
            ref:"user"
        }
    ]
})

module.exports=mongoose.model("Playlist",playListSchema);