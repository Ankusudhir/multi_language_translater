const mongoose=require('mongoose');


const textSchema=new mongoose.Schema({
    id_num:{
        type:Number,
        // required:true,
        
    },
    src_lang:{
        type:String,
        required:true,
    

    },
    dest_lang:{
        type:String,
        required:true,

    },
    translated_text:{
        type:String,
        required:true,
    },
    original_text:{
        type:String,
        required:true
    }

});

const Text=new mongoose.model('Text',textSchema);
module.exports=Text;

