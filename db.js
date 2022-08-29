const mongoose=require('mongoose');


mongoose.connect('mongodb://localhost:27017/traslator',{
  
  useNewUrlParser:true,
  useUnifiedTopology:true

}).then(()=>{
  console.log("Conectd to monodb");
}).catch((e)=>{
  console.log("error in connectingin db",e);
});
  