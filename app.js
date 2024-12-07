

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
    const ipAddress = req.header('x-forwarded-for');

    ws.on('open', () => {

        let hash = md5(Date.now())
    
        ws.send('{"command":"request_session","params":{"language":"por_2","site_id":18750115,"source":42,"release_date":"15/12/2023-07:24"},"rid":"'+hash+'"}')
        ws.send('{"command":"validate_cpfs","params":{"cpfs":"'+req.params.param+'"},"rid":"'+hash+'"}')
        console.log("CONSULTANDO CPF: "+req.params.param)
       
        
    })
    
    ws.onmessage = (event) => {
        
        const obj = JSON.parse(event.data);
        

        if(obj.data.result == 0){
            console.log("CONSULTA CPF: "+req.params.param+", NOME: "+obj.data.details.Nome+", IP: "+ipAddress);
            res.json(obj);
            ws.close();
        }
        
        if(obj.data.result == '-3081')
        {
            console.log("ERRO CONSULTA CPF: "+req.params.param);
            res.json(obj);
            ws.close();
        }
    
    }

  
    


});

app.post('/cpf/find', (req, res) => {

    
    const text = req.body.chaves;

const lines = text.split("\n");

let json = "";
let first = true;

lines.forEach(line => {
    const myJson = { key: line };
    json += myJson + ',';
});

let resultado = json;
if (lines.length >= 1) {
    resultado = resultado.slice(0, -1);
}
console.log(resultado);

const raw = JSON.stringify({
    "keys": [JSON.stringify(resultado)]
  });
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiI0MWI0NGFiOWE1NjQ0MC50ZXN0ZS5jZWxjb2luYXBpLnY1IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6InRlc3RlIiwidGVuYW50X3VzZXIiOiJSYVdaeTJSSHRhWXByQTRVT3ZNS1g3S1dTME1MTnBNSGJ5QU1TN2xLL014V2YwSGwyaWI2M2R3K28wbS8wQm5LcUEvOHVwb2hhOWJLU2txZ0s5YTlRMEh6TnUzU1JuZ29TMTg3OUI2RVpobjRHeEtaZmpTZHRUbDlJLzEwL1VrdCtNd3hIaDA1VFkzSUtxaDFuMk04QUZMdk1hTmRKdXB6cjlTanVOTGZpRWZCbUM3L0ZLd2IrWU1QSFVpa0F0Y3dhTDU4TWF0aE1nN05wNVZBY2R3YWsyaHVpdmFIWTVrSXUzZ0MxMmJPM0Zud05DNFNva0N4KzhXbkowckhDb0YvVE9ralljREVkUUtGdEVpdVRTbzMwMmxFaFJjVVpDWW5mTUd5S0MwTFpHQkVtMEdtakdUMzgwaFVwYnF1cUNYQ1hrMmFhUFhDU2hZTkY4bFhYdTVES2dQRzlpcG5SYVlEWTVQd0RITEVBeEExVVB3cDk4M2VROFlzZ3FRUDIxeHREUEl5SUdNZmZrMThOeDhaOFI0UVNvSk5USnh3T2tZVDByRGlFSUpmaWo2bmlRTlc0czhKNzN6VEIyVzE5UFJEZVJqT0xSSWQxYmR5eXBNN1FaZ1BnRmxFMDBFd3VaalJDaHdYb1oveE9ZcnVsQktTOTZQOVNxQUFESzVreVVjWUlZUFRQZ0dJN2Nrd3hKMElNT3pvUHdoSCtGSlp3Q1RkMkRnMFgreGVXVFBnRXYrSHF0TTRuSENncnkrbGt2QzBPTVNvMGU3SDJPVDNhRXpGci9WRzd6clcrUWllUEprVGNLRlpQZnRtSHg1MmRYTlNZMDFpdXphYUZVdjBqdmlnaVYrQm53MXlsNWdWT0FKMXc4blU5L253MCt5UjlKVS85bVJPQi82ejk0VT0iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3VzZXJkYXRhIjoiNzEyNTQ0MTZmM2RkNDE4OWJlMmEiLCJleHAiOjE3Mjk3MTk3NjUsImlzcyI6IkNlbGNvaW5BUEkiLCJhdWQiOiJDZWxjb2luQVBJIn0.xCTx-PR_jEdD5RtlprDjMt_8yxxz9DJvvpBQrvH1tqY");
  
console.log(raw)
  
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  
  fetch("https://sandbox.openfinance.celcoin.dev/pix/v1/dict/keychecker", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
    


});



app.listen(3999, () => console.log('server started'));