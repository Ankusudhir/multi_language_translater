const express=require('express');
const db=require('./db');
const Text=require('./models');
const translate = require('@iamtraction/google-translate');
const app=express();
const router = express.Router()
const port=process.env.port || 8080;// port number on which server will run
app.use(express.json());




// app.use('/api',require('./api'));
app.get('/',(req,res)=>
{
  res.send('Home page of our server ');

});




// this is api which will take the text , whose language will be autofetched by the api and then it will translted accordily what use want
let input;
app.post('/api/input',(req,res)=>{
  input=req.body.text;
  console.log(input);
  res.end(JSON.stringify(input));

});


//if in case user want to apecify the language in which he/she is giving input , can apecify with the help of this api
let src_lang;
app.post('/api/from',(req,res)=>
{
  console.log(req.body,"req");
  src_lang=req.body.text;
  // console.log(src.from);
  res.send('Home page from');

});


//api for taking input ,to which lang string will be translated
let dest_lang;
app.post('/api/to',function(req,res){
  console.log(req.body.text);
  dest_lang=req.body.text;
  res.send('home to');
});

app.get('/fill',(req,res)=>{
  id=id+1;
  let out=new Text({
    id_num:id,
    src_lang:'en',
    dest_lang:'hi',
    translated_text:'thank you this is sanu',
    original_text:'ghdfay'

  });
  out.save();
  console.log(out);
  res.end(" inside the function");

})
//adding data to db

//searching in db
app.get('/find', async function(req,res){//cahnge it inot async await

  let val;
  const [data, err]=await Text.find({src_lang:'en',dest_lang:'hi',original_text:'ghdfay'});
  if(data)
  {
    val=data;
    console.log(data);
  }
  else{
    console.log(err,'errr555555555555rrv');
  }


  console.log(val,"ffff");
  res.end(JSON.stringify(val));

});



let translatedtext1;

app.get('/translate',  async function(req,res)
{

  try{
    const [data, err]=await Text.find({src_lang:src_lang,dest_lang:dest_lang,original_text:input});
    if(data)
    {
      val=data;
      console.log(data);
    }
    else{
      console.log(err,'doesnot found in cache need to search in db');
      let response = await translate(input, { from: src_lang, to: dest_lang });
        if (response.err) { console.log('error');}
        else { 
          console.log(response.text)
          let save_db=new Text({
            
            src_lang:src_lang,
            dest_lang:dest_lang,
            translated_text:response.text,
            original_text:input
          })
          save_db.save();
          console.log(save_db,"save in db");
          translatedtext1=response.text;
        };
    
        console.log(translatedtext1);

    }
  }
  catch(err){
    console.log(err);
  }
      
   
  res.send(JSON.stringify(translatedtext1));
  // res.send(translatedtext1);


  
});


// app.get('/translate',  async function(req,res)
// {

//     let response = await translate('Thank you', { from: 'auto', to: 'it' });
//       if (response.err) { console.log('error');}
//       else { 
//         console.log(response.text)
//         translatedtext1=response.text;
//       };
  
//       console.log(translatedtext1);

//   res.send(translatedtext1);



  
// });









// app.get('/transleted-text',function(req,res)
// {
//   // res.send.json(200)
//   res.end(JSON.stringify({ text:translatedtext1 }));
// })


// let out=[];
// function tempcahce()
// {

//   let arr=['en','hi','it'];
//   for(var i=0;i<arr.length;i++)
//   {
//       let temp=arr[i];
//       let translatedtext;

//       translate(input, { from: 'auto', to:dest_lang }).then(res => {
//         console.log(res.text); // OUTPUT: Je vous remercie
//         translatedtext=res.text;
//         out.push(translatedtext);
//         console.log(translatedtext);
//         // console.log(res.from.autoCorrected); // OUTPUT: true
//         // console.log(res.from.text.value); // OUTPUT: [Thank] you
//         // console.log(res.from.text.didYouMean); // OUTPUT: false
//       }).catch(err => {
//         console.error(err);
//       });
      
//   }
  

// }
  


// // let arr=['en','hi','it'];
// // let out=[];
// // for(var i=0;i<arr.length;i++)
// // {
// //     let temp=arr[i];
// //     let translatedtext;

// //     translate('Thank you', { from: 'auto', to: temp }).then(res => {
// //       console.log(res.text); // OUTPUT: Je vous remercie
// //       translatedtext=res.text;
// //       out.push(translatedtext);
// //       console.log(translatedtext);
// //       // console.log(res.from.autoCorrected); // OUTPUT: true
// //       // console.log(res.from.text.value); // OUTPUT: [Thank] you
// //       // console.log(res.from.text.didYouMean); // OUTPUT: false
// //     }).catch(err => {
// //       console.error(err);
// //     });
    
// // }






//mkaing server listen to the port
app.listen(port,function(){
  console.log('server is running on port 8080');
});







