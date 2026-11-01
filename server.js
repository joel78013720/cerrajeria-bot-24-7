const express = require('express');
const app = express();
app.use(express.json());

const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'cerrajeria123';
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;

app.get('/', (req,res)=>res.send('Bot Cerrajeria 24/7 ON 🔐'));
app.get('/webhook',(req,res)=>{
  if(req.query['hub.verify_token']===VERIFY_TOKEN){
    res.send(req.query['hub.challenge']);
  } else res.send('error token');
});

app.post('/webhook', async (req,res)=>{
  try {
    const message = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    if (message) {
      const from = message.from;
      let reply = `🔐 *CERRAJERIA 24/7 MANAGUA* 🔐\n\nHola! Estamos activos 24h.\n\nServicios:\n✅ Apertura casas\n✅ Apertura carros\n✅ Cambio chapas\n\nMandame tu ubicación y vamos de inmediato 🚀`;

      await fetch(`https://graph.facebook.com/v20.0/${PHONE_NUMBER_ID}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: from,
          text: { body: reply }
        })
      });
    }
    res.sendStatus(200);
  } catch(e){
    console.log(e);
    res.sendStatus(200);
  }
});
app.listen(process.env.PORT||3000,()=>console.log('BOT ON'));
