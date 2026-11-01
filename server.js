const express = require('express');
const app = express();
app.use(express.json());
app.get('/', (req,res)=>res.send('Bot Cerrajeria 24/7 ON 🔐'));
app.get('/webhook',(req,res)=>{
  if(req.query['hub.verify_token']==='cerrajeria123'){
    res.send(req.query['hub.challenge']);
  } else res.send('error');
});
app.post('/webhook',(req,res)=>{
  console.log(req.body);
  res.sendStatus(200);
});
app.listen(process.env.PORT||3000,()=>console.log('ON'));
