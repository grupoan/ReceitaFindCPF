

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
var cors = require('cors')
const WebSocket = require('ws');

const md5 = require('md5')
const Grecaptcha = require('grecaptcha')


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(cors())



app.get('/api/regular/:param*', (req, res) => {

    let ws = new WebSocket("wss://eu-swarm-ws-re.betcoswarm.com/");

    ws.on('open', () => {

        let hash = md5(Date.now())
    
        ws.send('{"command":"request_session","params":{"language":"por_2","site_id":18750115,"source":42,"release_date":"15/12/2023-07:24"},"rid":"'+hash+'"}')
        ws.send('{"command":"validate_cpfs","params":{"cpfs":"'+req.params.param+'"},"rid":"'+hash+'"}')

       
        
    })
    
    ws.onmessage = (event) => {
        
        const obj = JSON.parse(event.data);
        console.log(obj);


        if(obj.data.result == 0)
        res.json(obj);
        if(obj.data.result == '-3081')
        res.json(obj);
    
    }

  
    


});



app.listen(3000, () => console.log('server started'));