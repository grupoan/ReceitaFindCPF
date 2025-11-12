const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
var cors = require('cors')
const WebSocket = require('ws');
const cron = require('node-cron');

const md5 = require('md5')
const Grecaptcha = require('grecaptcha')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

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

});


//https://esportiva.bet.br/
app.get('/cpf/v1/:param*', (req, res) => {

    const ipAddress = req.header('x-forwarded-for');

    (async function() {

        const response = await fetch('https://esportiva.bet.br/api/documents/validate', {
            method: 'POST',
            headers: {
                'Referer': 'https://esportiva.bet.br/',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0.1 Safari/605.1.15',
                'Cookie': '_fbp=fb.2.1762895270266.573130884712741651; _ga_6JQLXHZNEM=GS2.1.s1762898491$o1$g0$t1762898491$j60$l0$h0; _ga_GRXQYD55KS=GS2.1.s1762898491$o2$g0$t1762898491$j60$l0$h0; _ga_SE085JM1MV=GS2.1.s1762898491$o2$g0$t1762898491$j60$l0$h0; _ga_TVDHCDVJM5=GS2.1.s1762898491$o2$g0$t1762898491$j60$l0$h0; _clsk=68th7w%5E1762898490618%5E1%5E1%5Eq.clarity.ms%2Fcollect; gravity_retrive_running=1762898490887; _hjSessionUser_6535523=eyJpZCI6IjhjNDIwY2EwLTg5YjEtNTE0Yi04YWNkLTg3Y2VkNTU3ZWJjNCIsImNyZWF0ZWQiOjE3NjI4OTUyNjc0MTUsImV4aXN0aW5nIjp0cnVlfQ==; _hjSession_6535523=eyJpZCI6ImU5MTcxYjNlLTk4NDMtNDA3YS04NDU4LTA4MjE4NDBlMzIyMiIsImMiOjE3NjI4OTg0ODkwNTksInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowLCJzcCI6MX0=; __cf_bm=dS4.EDjsBvDt1peuHQAjeRVGnln36p2ehPWqIxnApLM-1762898481-1.0.1.1-4s6oKayq.WynLuN8LwZ1YLeAq4pgX3tOnjtYhOhBxdwNFt26mmGtzFiR5fJIwhRolC_STLWD8Nqa_gMrGFI5QiyvGPi9aTZ1nuUdKw9kplg; _cfuvid=TMge5hF3BrvHRaZZHd5c_CkfsXNwxPk1FHQ2uASb7Y0-1762898481726-0.0.1.1-604800000; bet7k_session=eyJpdiI6ImhFaVZwb1hvbFRpVFFPUEVjV2wyYUE9PSIsInZhbHVlIjoidHF4eFI3cTFKd1FPd2hnamFoWUVDbko3UmVPMzNTeUZjeVlJbEhNdURhc2JkSUNmdTkzOU96ejdGZ3Vmdm92dTYvRWZFTVFhM0tuQ3A4MlN5UnlINkVtTjcwRTNhVFd1enlQeHQ1T245aUl3RjlndGc3SnFUdzliTHVHVlRsSEQiLCJtYWMiOiI5Y2EwYThjMWY5OWUyZDAxNGZiMmM1MTY0MDUxMjFjOWVjMTkxMTU5ODNjMWQyNDUwN2MxZDI1MzVlNDEyOWVhIiwidGFnIjoiIn0%3D; legal_age_popup_closed=true; advcake_trackid=c6fbb128-50ea-ed9b-b509-3bda14a03c73; advcake_url=https%3A%2F%2Fesportiva.bet.br%2F%3Fsrc%3Dejdpqcwzszoeyxutrktekxlvd%26utm_source%3D132251%26gad_source%3D1%26gad_campaignid%3D22933593111%26gbraid%3D0AAAAAqpQqyOpV6iiv6ox0528cBkk5VwQC%26gclid%3DCjwKCAiA2svIBhB-EiwARWDPjtfux1dxPMyX57d6IpX2iE8JMsbIITJ9e8TScmtGCgz0b7GboDgRgBoC8OkQAvD_BwE; advcake_utm_campaign=google; advcake_utm_content=google; user_unic_ac_id=5ba8f99e-99ee-167d-eb83-65e56dbdb186; _gcl_aw=GCL.1762895270.CjwKCAiA2svIBhB-EiwARWDPjtfux1dxPMyX57d6IpX2iE8JMsbIITJ9e8TScmtGCgz0b7GboDgRgBoC8OkQAvD_BwE; __track_id=tid-339f33023.3189861d9; _ga=GA1.1.1303633034.1762895268; _clck=10n5lzo%5E2%5Eg0x%5E0%5E2141; _gcl_au=1.1.1966943604.1762895268; _gcl_gs=2.1.k1$i1762895262$u116129170; cactusCookiesConsent=opened; geolocation-pristine=false; install_app_popup_closed=false; jwt_token=; ref_code=; src=ejdpqcwzszoeyxutrktekxlvd; utm_source=132251; v2_topbar_download_app_closed=false; v2_topbar_push_notify_closed=false; v2_topbar_referral_closed=false; v2_topbar_telegram_closed=false; v2_topbar_tournament_closed=false',
                'Sec-Fetch-Dest': 'empty',
                'Origin': 'https://esportiva.bet.br',
                'Sec-Fetch-Site': 'same-origin',
                'Content-Length': '43',
                'Authorization': 'Bearer',
                'Accept-Language': 'pt-BR,pt;q=0.9',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Accept-Encoding': 'gzip, deflate, br',
                'Sec-Fetch-Mode': 'cors',
                'tenant': 'esportiva.bet.br',
                'language': 'pt-br',
                'x-origin-access': '2',
                'lang': 'pt-br',
                'city': 'Maceio',
                'version': 'vz3b-deploy-4378dd6d110937afd4882fae128b92acb1d3e1c5-912db6ee80284076b1e2',
                'Priority': 'u=3, i',
                'x-log-info': '1-1762898498551-deploy-4378dd6d110937afd4882fae128b92acb1d3e1c5-912db6ee80284076b1e2',
                'origin-domain': 'esportiva.bet.br'
            },
            body: JSON.stringify({
                'number': req.params.param,
                'captcha_token': ''
            })
        });

        const text = await response.json();

        console.log(text);

        if (!text?.success) {
            console.log("CONSULTA CPF: " + req.params.param);
            res.json(text);

        } else {
            console.log("CONSULTA CPF: " + req.params.param + ", NOME: " + text.nome + ", IP: " + ipAddress);
            res.json(text);
        }

    })();

});


//https://www.seguro.bet.br/?accounts=%2A&register=%2A
app.get('/cpf/v2/:param*', (req, res) => {

    let ws = new WebSocket("wss://eu-swarm-springre.trexname.com/");
    const ipAddress = req.header('x-forwarded-for');

    ws.on('open', () => {

        let hash = GN(15);
        console.log(hash)
        ws.send('{"command":"request_session","params":{"language":"pt-br","site_id":"1866308","source":42,"is_wrap_app":false,"afec":"4GuZ-63YNfIE869KmCCpeTp69dWD1UQraJo0"},"rid":"request_session' + hash + '"}')
        ws.send('{"command":"validate_cpf","params":{"cpf":"' + req.params.param + '"},"rid":"command' + hash + '"}')
        console.log("CONSULTANDO CPF: " + req.params.param)

    })

    ws.onmessage = (event) => {
        console.log(event.data);

        const obj = JSON.parse(event.data);

        if (obj.data == null) {
            console.log("CONSULTA CPF: " + req.params.param);

        } else if (obj.data.result == 0) {
            console.log("CONSULTA CPF: " + req.params.param + ", NOME: " + obj.data.details.FirstName + ", IP: " + ipAddress);
            res.json(obj);
            ws.close();
        } else if (obj.data.result_text == 'InvalidCPF') {
            console.log("ERRO CONSULTA CPF: " + req.params.param);
            res.json(obj);
            ws.close();
        } else if (obj.data.result == '-3060') {
            console.log("ERRO CONSULTA CPF: " + req.params.param);
            res.json(obj);
            ws.close();
        }

    }

});

//https://www.galera.bet.br/register
app.get('/cpf/v3/:param*', (req, res) => {

    const ipAddress = req.header('x-forwarded-for');

    (async function() {

        const url = 'https://f-api.galera.bet.br/api/user/cpf-check';

        const data = '{"cpf":"' + req.params.param + '"}';

        const response = await fetch(url, {
            method: 'POST',
            body: data,
        });

        const text = await response.json();

        console.log(text);

        if (!text?.valid) {
            console.log("CONSULTA CPF: " + req.params.param);
            res.json(text);

        } else {
            console.log("CONSULTA CPF: " + req.params.param + ", NOME: " + text.firstName + ", IP: " + ipAddress);
            res.json(text);
        }

    })();

});

//https://7games.bet.br/pb/
app.get('/cpf/v4/:param*', (req, res) => {

    let ws = new WebSocket("wss://eu-swarm-springre.trexname.com/");
    const ipAddress = req.header('x-forwarded-for');

    ws.on('open', () => {

        let hash = GN(20);
        console.log(hash)
        ws.send('{"command":"request_session","params":{"language":"por_2","site_id":18751367,"source":42,"release_date":"04/25/2023-16:50"},"rid":"' + hash + '"}')

        ws.send('{"command":"kyc_r7_lookup_customer","params":{"personal_id":"' + req.params.param + '"},"rid":"' + hash + '"}')
        console.log("CONSULTANDO CPF: " + req.params.param)

    })

    ws.onmessage = (event) => {
        console.log(event.data);

        const obj = JSON.parse(event.data);

        if (obj.data == null) {
            console.log("CONSULTA CPF: " + req.params.param);

        } else if (obj.data.result == 200) {
            console.log("CONSULTA CPF: " + req.params.param + ", NOME: " + obj.data.details.name + ", IP: " + ipAddress);
            res.json(obj);
            ws.close();
        } else if (obj.data.result == '400') {
            console.log("ERRO CONSULTA CPF: " + req.params.param);
            res.json(obj);
            ws.close();
        }

    }

});

//https://www.h2.bet.br/?accounts=*&register=*
app.get('/cpf/v5/:param*', (req, res) => {

    let ws = new WebSocket("wss://eu-swarm-springre.trexname.com/");
    const ipAddress = req.header('x-forwarded-for');

    ws.on('open', () => {

        let hash = GN(15);

        ws.send('{"command":"request_session","params":{"language":"pt-br","site_id":18749751,"source":42,"is_wrap_app":false,"afec":"ZpqTA42hNAuQkN0yYAoYgrlpneUHL3bXiYUr"},"rid":"request_session' + hash + '"}')
        ws.send('{"command":"validate_cpf","params":{"cpf":"' + req.params.param + '"},"rid":"command' + hash + '"}')
        console.log("CONSULTANDO CPF: " + req.params.param)

    })

    ws.onmessage = (event) => {
        console.log(event.data);

        const obj = JSON.parse(event.data);

        if (obj.data == null) {
            console.log("CONSULTA CPF: " + req.params.param);

        } else if (obj.data.result == 0) {
            console.log("CONSULTA CPF: " + req.params.param + ", NOME: " + obj.data.details.FirstName + ", IP: " + ipAddress);
            res.json(obj);
            ws.close();
        } else if (obj.data.result == '-3064') {
            console.log("ERRO CONSULTA CPF: " + req.params.param);
            res.json(obj);
            ws.close();
        }

    }

});

//https://papigames.bet.br/signup
app.get('/cpf/v6/:param*', (req, res) => {

    const ipAddress = req.header('x-forwarded-for');

    (async function() {

        const url = 'https://webapi.papi.bet.br/api_v2/validateCPF';

        const data = '{"nationalId":"' + req.params.param + '","skinId":192347}';

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

        if (!text?.success) {
            console.log("CONSULTA CPF: " + req.params.param);
            res.json(text);

        } else {
            console.log("CONSULTA CPF: " + req.params.param + ", NOME: " + text.result.firstname + ", IP: " + ipAddress);
            res.json(text);
        }

    })();

});

//https://play.bet.br/
app.get('/cpf/v7/:param*', (req, res) => {

    const ipAddress = req.header('x-forwarded-for');

    (async function() {

        const response = await fetch('https://play.bet.br/api/documents/validate', {
            method: 'POST',
            headers: {
                'Referer': 'https://play.bet.br/register?src=miooeqzddeukzglkorydzrzziv&utm_source=504549&utm_source=504549&utm_source=google&afp=pmax&utm_medium=paid_search&utm_campaign=campanha_de_teste&utm_content=grupo_de_anuncio_de_teste&utm_term=_-_&ad_id=&utm_id=23138627735&gclid=CjwKCAiA2svIBhB-EiwARWDPjghnFmQC86eSNJQn7Qt2QDFQvOdQUstqGgbiPsImKK1cGH2IoP1TUBoCGCMQAvD_BwE&gad_source=1&gad_campaignid=23133067917&gbraid=0AAAABBtfB3J-vG974PRmEHuGRm5hVdawq',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0.1 Safari/605.1.15',
                'Cookie': 'ttcsid=1762895690780::ohbEVQcs7eSs67SvpEv4.1.1762895691040.0; ttcsid_D3QOTFRC77U1N95E4JH0=1762895690777::4GNBV2u6t0aG43K-n6ss.1.1762895691042.0; FPAU=1.1.912682075.1762895690; FPGCLAW=2.1.kCjwKCAiA2svIBhB-EiwARWDPjghnFmQC86eSNJQn7Qt2QDFQvOdQUstqGgbiPsImKK1cGH2IoP1TUBoCGCMQAvD_BwE$i1762895691; FPGCLGS=2.1.k1$i1762895685$u38717154; FPID=FPID2.3.5xtlzIHDsCXp8YofuEbQBxZwfsg5OOOIXD5Qi%2FfXtKw%3D.1762895690; FPLC=aXQquzrppOwtvsxBnLQBA2Nh1F5QekfZJHF25Uo8DVU8tkfTJ3B25pcKRlx81eVSZifGmDxyBSQhGjuNBivvsDySIdf69zWmhNCCE84yjY6wChapM4zDPyggKMvHFA%3D%3D; _fbp=fb.2.1762895688959.1614159738; _ga=GA1.1.233998411.1762895690; _ga_8FLQS68FGB=GS2.1.s1762895690$o1$g0$t1762895690$j60$l0$h1646915107; _gcl_au=1.1.912682075.1762895690; _gcl_aw=GCL.1762895690.CjwKCAiA2svIBhB-EiwARWDPjghnFmQC86eSNJQn7Qt2QDFQvOdQUstqGgbiPsImKK1cGH2IoP1TUBoCGCMQAvD_BwE; _gcl_gs=2.1.k1$i1762895684$u38717154; _tt_enable_cookie=1; _ttp=01K9TCAZ0GX5MFQC4DW14GY07M_.tt.2; _dcid=dcid.1.1762895688937.817604951; _gtmeec=e30%3D; cf_clearance=xJIi9taFEdBgxVuJnhn.uPq6mHNhFwSJGs1RzqSDEpo-1762895689-1.2.1.1-.F3QHrg3e9HHPB0WMQ.ivX_iSgyP0k5pESbhaNDGzwv962bL2QDQcHE9mwqQnpJjoloWY5Zmg1sJAjRFIUyKaI5YZTjjAvEsR2RkizH619R4gJVJOtdv9JtEsUjJ_M7eY1E3ZcyN62h69giJfGH5uhm9EtZeM0f4r6OLarThyI8wlmzztmPZGUZNwqJXGJgkmXvp3DDlqUurfOeScsNQ2xH1hny7iu7WeTMmHB6qVzI; st_user_id=b5358d67896ba108035830c5fa2d4452; stape=%7B%22utm_source%22%3A%22504549%22%2C%22utm_medium%22%3A%22paid_search%22%2C%22utm_campaing%22%3A%22campanha_de_teste%22%2C%22utm_term%22%3A%22_-_%22%2C%22utm_content%22%3A%22grupo_de_anuncio_de_teste%22%2C%22gclid%22%3A%22CjwKCAiA2svIBhB-EiwARWDPjghnFmQC86eSNJQn7Qt2QDFQvOdQUstqGgbiPsImKK1cGH2IoP1TUBoCGCMQAvD_BwE%22%2C%22gbraid%22%3A%220AAAABBtfB3J-vG974PRmEHuGRm5hVdawq%22%2C%22utm_id%22%3A%2223138627735%22%7D; jwt_token=; ref_code=; src=miooeqzddeukzglkorydzrzziv; utm_campaign=campanha_de_teste; utm_content=grupo_de_anuncio_de_teste; utm_medium=paid_search; utm_source=504549,504549,google; __cf_bm=Fq3ex3p9lb8A8a0dm4j1C2oQm0qug.txkK8s8S0GxGs-1762895686-1.0.1.1-iG911xwMwmO7z8vCBWDaxH2W59l08rVZN1er7moW1zRVaAgFG7EcmRlvglytXKXuIZLZB0.V1JRFkoQE1882idNKLWmaOG.hlNphnH96HUs; _cfuvid=YnfNJ7nl4aYDiY2a6cNvkfpnU93sc6RdY3ffBmAUbmk-1762895686551-0.0.1.1-604800000',
                'Sec-Fetch-Dest': 'empty',
                'Origin': 'https://play.bet.br',
                'Sec-Fetch-Site': 'same-origin',
                'Content-Length': '43',
                'Authorization': 'Bearer',
                'Accept-Language': 'pt-BR,pt;q=0.9',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Accept-Encoding': 'gzip, deflate, br',
                'Sec-Fetch-Mode': 'cors',
                'tenant': 'play.bet.br',
                'language': 'pt-br',
                'x-origin-access': '2',
                'lang': 'pt-br',
                'city': 'Maceio',
                'version': 'vz3b-deploy-30fdc1ea4e270736b277b4bf8d501c810bacd64d-255acf3016964dbbe5e7',
                'Priority': 'u=3, i',
                'x-log-info': '1-1762895831303-deploy-30fdc1ea4e270736b277b4bf8d501c810bacd64d-255acf3016964dbbe5e7',
                'origin-domain': 'play.bet.br'
            },
            body: JSON.stringify({
                'number': req.params.param,
                'captcha_token': ''
            })
            });

        const text = await response.json();

        console.log(text);

        if (!text?.success) {
            console.log("CONSULTA CPF: " + req.params.param);
            res.json(text);

        } else {
            console.log("CONSULTA CPF: " + req.params.param + ", NOME: " + text.nome + ", IP: " + ipAddress);
            res.json(text);
        }

    })();

});

//https://nossa.bet.br/br/new-register
app.get('/cpf/v8/:param*', (req, res) => {

    const ipAddress = req.header('x-forwarded-for');

    (async function() {

        const response = await fetch('https://api.nossa.bet.br/utils/check-cpf/'+req.params.param, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json, text/plain, */*',
                'Sec-Fetch-Site': 'same-site',
                'Accept-Language': 'pt-BR,pt;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Sec-Fetch-Mode': 'cors',
                'Origin': 'https://nossa.bet.br',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0.1 Safari/605.1.15',
                'Referer': 'https://nossa.bet.br/',
                'Cookie': '_ga_9KLNCNZQS6=GS2.1.s1762898474$o3$g1$t1762899651$j54$l0$h0; _fbp=fb.2.1760584790031.1962695414.AQYAAQIA; _dcid=dcid.1.1762895688577.837318169; _gtmeec=eyJjdCI6IjhhMTBjMjU0OGE2ZWJiZDU4ZDI0MTI2N2RlOTllMWUyNzc3Yjc4ZTJiZDYxMGQ4ZGY1MDFkMTVjYWFkMDNjYWYiLCJzdCI6IjYzNTE4MjUwMzAxNTU4MzY2NjQ4NzY2ODZkY2ZmNjFiNmE5MTI1NGEwNDU4NTM3MDcyYTFiMjZhZDE1MWI1Y2UiLCJjb3VudHJ5IjoiODg1MDM2YTBkYTNkZmYzYzNlMDViYzc5YmY0OTM4MmIxMmJjNTA5ODUxNGVkNTdjZTA4NzVhYmExYWEyYzQwZCIsImV4dGVybmFsX2lkIjoiMDdhZDhlMDE0MTQ5NmMyYjQxMjU0NDVkYmZiNjhhYWZlYzdjODRkNTFlZDUyMjM4MDQyYzI0YTA5ZThhMDI1YyJ9; cf_clearance=i4PFAr4ddmTtSk0tPxGr7gAoXIvSt.BI9MJ41WlvZho-1762899645-1.2.1.1-t3PAR3xdtFZ5tyca_ZyBlwoF.Tue2ZcHxh5IGga7EUaqx0uTLYhzFd_e7ThBhdoVkqfz29l.9aAUcn.AfQbdZv2SgaxOkAqUs7sZtMMv6RjmATMjiGXKLT4H7RVRjQmIfYpnUmPtG1ZTwTdz9ZLdCWR1alpuBevxihSgcD6QwlP7QwK06KkAx2KzmkRnvuR.qd9s7U4l3b0.TZZL0PUaYSQu7vbFa9vH8E2lwFXyiGk; __gtm_campaign_url=https%3A%2F%2Fnossa.bet.br%2Fbr%2F%3Fgad_source%3D1%26gad_campaignid%3D23048593378%26gbraid%3D0AAAABBSExeKo4l2U4DW9ewX02NNgrMUO0%26gclid%3DCjwKCAiA2svIBhB-EiwARWDPjiziL60VG4upF2NzLkcvDwNiyPY4GFVyGFF7uojHCiUStF6MBGju7xoCSTsQAvD_BwE; _gcl_aw=GCL.1762895689.CjwKCAiA2svIBhB-EiwARWDPjiziL60VG4upF2NzLkcvDwNiyPY4GFVyGFF7uojHCiUStF6MBGju7xoCSTsQAvD_BwE; _gcl_gs=2.1.k1$i1762895685$u18072102; _ga=GA1.1.846704915.1760584791; _gcl_au=1.1.126974052.1760584790',
                'Sec-Fetch-Dest': 'empty',
                'X-Client-Token': 'eyJjbGllbnRJZCI6Ii91dGlscy9jaGVjay1jcGYvODU4MzE4Nzc1NDAiLCJ0aW1lc3RhbXAiOjE3NjI4OTk2NTU1NTR9.00a7bcbb0d446f66b3ebf81ad37acc1c216f35d3524034cf9acf1fe28e468e25',
                'Priority': 'u=3, i'
            }
        });

        const text = await response.json();

        console.log(text);

        if (!text?.success) {
            console.log("CONSULTA CPF: " + req.params.param);
            res.json(text);

        } else {
            console.log("CONSULTA CPF: " + req.params.param + ", NOME: " + text.name + ", IP: " + ipAddress);
            res.json(text);
        }

    })();

});

//https://mcgames.bet.br/
app.get('/cpf/v9/:param*', (req, res) => {

    const ipAddress = req.header('x-forwarded-for');

    (async function() {

        const response = await fetch('https://mcgames.bet.br/api/documents/validate', {
            method: 'POST',
            headers: {
                'Referer': 'https://mcgames.bet.br/',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0.1 Safari/605.1.15',
                'Cookie': 'ttcsid=1762899816717::Z3bSccIU3MiSpZq1iF_4.1.1762899839224.0; ttcsid_D3OM7VJC77U53GBVOBK0=1762899816716::UEnllJrR8Rb-k5xX6N42.1.1762899839225.0; legal_age_popup_closed=true; _fbp=fb.2.1762899814531.1317152484; FPAU=1.1.1849795171.1762899814; FPID=FPID2.3.He0lRkzvAkhq9627ovx%2FZY2PjO7EtZ6Kwuh3sjcotxM%3D.1762899817; FPLC=J6xFrzbVRw%2BXrVz1KCPk9Lg0GxW%2FXBfltoEfgjdxtZAafFn3LM1%2F2YgF8hWHNFln9vtEO30gL%2FpQMhKPJsSLeGk7asOVIeW8aDrO8tnjb996uvzWsXlWUp8X%2FCE%2BBw%3D%3D; _ga=GA1.1.2066971746.1762899817; _ga_ESHLHYBCTZ=GS2.1.s1762899817$o1$g0$t1762899817$j60$l0$h39292881; _ga_YB6LF2X181=GS2.1.s1762899817$o1$g0$t1762899817$j60$l0$h244642926; _dcid=dcid.1.1762899814519.596944187; _gtmeec=e30%3D; _tt_enable_cookie=1; _ttp=01K9TG8W853NS64VFX15CZ5AYH_.tt.2; st_user_id=76b1800194a579435808da500adb7168; __user_id=uid-7799799703.0140737478; _gcl_au=1.1.1849795171.1762899814; stape=%7B%22landing_page%22%3A%22https%3A%2F%2Fmcgames.bet.br%2F%22%7D; mcidtrk=afd89e6e-6cd3-478e-99a1-2ffb4ff2911b; cactusCookiesConsent=opened; geolocation-pristine=false; install_app_popup_closed=false; jwt_token=; v2_topbar_download_app_closed=false; v2_topbar_push_notify_closed=false; v2_topbar_referral_closed=false; v2_topbar_telegram_closed=false; v2_topbar_tournament_closed=false; ref_code=; __cf_bm=rs0vQfdECyDan5JpffDVFm5a.U8ogRfenjeHY2mUU3o-1762899809-1.0.1.1-wJfWXm_0d3z0hF8G2dQ_Cc_qlmevGsve8Rw1ke73NmpWU27Ar1jpU8.n_wei8EP03pOYKjTrSlqTtvN199EQwfVmZ1fq7Hq9tEHVv0JfS28; _cfuvid=Dx9BBCpScJD4DuP2exIjChtJDXC7IdLnSZmS_CdcMvk-1762899809156-0.0.1.1-604800000',
                'Sec-Fetch-Dest': 'empty',
                'Origin': 'https://mcgames.bet.br',
                'Sec-Fetch-Site': 'same-origin',
                'Content-Length': '43',
                'Authorization': 'Bearer',
                'Accept-Language': 'pt-BR,pt;q=0.9',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Accept-Encoding': 'gzip, deflate, br',
                'Sec-Fetch-Mode': 'cors',
                'tenant': 'mcgames.bet.br',
                'language': 'pt-br',
                'x-origin-access': '2',
                'lang': 'pt-br',
                'city': 'Maceio',
                'version': 'vz3b-deploy-2b8c66936dfe420ab600668bc3df85b1ba763907-7613bfaa55a069833653',
                'Priority': 'u=3, i',
                'x-log-info': '1-1762899846529-deploy-2b8c66936dfe420ab600668bc3df85b1ba763907-7613bfaa55a069833653',
                'origin-domain': 'mcgames.bet.br'
            },
            body: JSON.stringify({
                'number': req.params.param,
                'captcha_token': ''
            })
        });

        const text = await response.json();

        console.log(text);

        if (!text?.success) {
            console.log("CONSULTA CPF: " + req.params.param);
            res.json(text);

        } else {
            console.log("CONSULTA CPF: " + req.params.param + ", NOME: " + text.nome + ", IP: " + ipAddress);
            res.json(text);
        }

    })();

});

//https://www.seguro.bet.br
app.get('/cpf/v10/:param*', (req, res) => {

    let ws = new WebSocket("wss://eu-swarm-springre.trexname.com/");
    const ipAddress = req.header('x-forwarded-for');

    ws.on('open', () => {

        let hash = GN(15);

        ws.send('{"command":"request_session","params":{"language":"pt-br","site_id":1866308,"source":42,"is_wrap_app":false,"afec":"4GuZ-63YNfIE869KmCCpeTp69dWD1UQraJo0"},"rid":"request_session' + hash + '"}')
        ws.send('{"command":"validate_cpf","params":{"cpf":"' + req.params.param + '"},"rid":"command' + hash + '"}')
        console.log("CONSULTANDO CPF: " + req.params.param)

    })

    ws.onmessage = (event) => {
        console.log(event.data);

        const obj = JSON.parse(event.data);

        if (obj.data == null) {
            console.log("CONSULTA CPF: " + req.params.param);

        } else if (obj.data.result == 0) {
            console.log("CONSULTA CPF: " + req.params.param + ", NOME: " + obj.data.details.FirstName + ", IP: " + ipAddress);
            res.json(obj);
            ws.close();
        } else if (obj.data.result == '-3064') {
            console.log("ERRO CONSULTA CPF: " + req.params.param);
            res.json(obj);
            ws.close();
        }

    }

});

//https://mcgames.bet.br/
app.get('/cpf/v11/:param*', (req, res) => {

    const ipAddress = req.header('x-forwarded-for');

    (async function() {

        const response = await fetch('https://bullsbet.bet.br/api/documents/validate', {
            method: 'POST',
            headers: {
                'Referer': 'https://bullsbet.bet.br/?ref=0a450b95e2b4&utm_source=351236&utm_term=bulls+bet&gclid=CjwKCAiA2svIBhB-EiwARWDPjjyVam0KNWYaKwb9zCiBBt5OP1CN2YKqIGQzdXNM79XNk7au3S2tFxoC7loQAvD_BwE&utm_creative=781143097358&utm_campaign=23187820788&utm_position=&utm_network=g&utm_target=&utm_placement=&utm_match=b&utm_content=generico_jogos&gad_source=1&gad_campaignid=23187820788&gbraid=0AAAAA9chXYxz1rEEyZfNDOKJjKOoY0pmU',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0.1 Safari/605.1.15',
                'Cookie': '_fbp=fb.2.1762900665012.31526170974081249; _ga_80YH39XFEL=GS2.1.s1762900665$o1$g0$t1762900704$j21$l0$h0; _ga_N8QF776BGT=GS2.1.s1762900665$o1$g1$t1762900704$j21$l0$h1052402742; legal_age_popup_closed=true; utm_campaign=23187820788; utm_content=generico_jogos; utm_source=351236; _ga=GA1.1.727636500.1762900665; _gcl_aw=GCL.1762900665.CjwKCAiA2svIBhB-EiwARWDPjjyVam0KNWYaKwb9zCiBBt5OP1CN2YKqIGQzdXNM79XNk7au3S2tFxoC7loQAvD_BwE; _gcl_au=1.1.1261202872.1762900662; _gcl_gs=2.1.k1$i1762900654$u38059312; cactusCookiesConsent=opened; geolocation-pristine=false; jwt_token=; ref_code=0a450b95e2b4; v2_topbar_download_app_closed=false; v2_topbar_push_notify_closed=false; v2_topbar_referral_closed=false; v2_topbar_telegram_closed=false; v2_topbar_tournament_closed=false; __cf_bm=_xDFMcT_vM0IMMg_cgB3.yc4242GqVyqdBb2kMFlXB8-1762900656-1.0.1.1-QEe.3.j_K3ze5QvTDl6pUvlxnPRUvdzNe9d3101s2nuKPdmz.VJ4ruK7.i55XjXxK0U4.SaKjrxEKiROZ6rtj4VQNeTHP1jfEhmSdbph45s; _cfuvid=x3ocjajHG.YIy1ynOpLFXj2cFG6Yl0e6wDovfiQfvww-1762900656655-0.0.1.1-604800000',
                'Sec-Fetch-Dest': 'empty',
                'Origin': 'https://bullsbet.bet.br',
                'Sec-Fetch-Site': 'same-origin',
                'Content-Length': '43',
                'Authorization': 'Bearer',
                'Accept-Language': 'pt-BR,pt;q=0.9',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Accept-Encoding': 'gzip, deflate, br',
                'Sec-Fetch-Mode': 'cors',
                'tenant': 'bullsbet.bet.br',
                'language': 'pt-br',
                'x-origin-access': '2',
                'lang': 'pt-br',
                'city': 'Maceio',
                'version': 'vz3b-deploy-5dbb2fea9e360bd7fc839de5d54fc12a9a0d1797-1a308576824df5250cea',
                'Priority': 'u=3, i',
                'x-log-info': '1-1762900711265-deploy-5dbb2fea9e360bd7fc839de5d54fc12a9a0d1797-1a308576824df5250cea',
                'origin-domain': 'bullsbet.bet.br'
            },
            body: JSON.stringify({
                'number': req.params.param,
                'captcha_token': ''
            })
        });

        const text = await response.json();

        console.log(text);

        if (!text?.success) {
            console.log("CONSULTA CPF: " + req.params.param);
            res.json(text);

        } else {
            console.log("CONSULTA CPF: " + req.params.param + ", NOME: " + text.nome + ", IP: " + ipAddress);
            res.json(text);
        }

    })();

});

//https://jogao.bet.br/
app.get('/cpf/v12/:param*', (req, res) => {

    const ipAddress = req.header('x-forwarded-for');

    (async function() {

        const response = await fetch('https://jogao.bet.br/api/documents/validate', {
            method: 'POST',
            headers: {
                'Referer': 'https://jogao.bet.br/?utm_source=348952&utm_term=&gclid=CjwKCAiA2svIBhB-EiwARWDPjirixi46FnJF60jhosxDdZCLZp5BDJZNVsKjVR8SA4aKFdTRNHk3oRoC1MQQAvD_BwE&utm_creative=&utm_campaign=23102521348&utm_position=&utm_network=x&utm_target=&utm_placement=&utm_match=&gad_source=1&gad_campaignid=23092425771&gbraid=0AAAAArCEHbC4NthWmsnsL41zFRm_9nXJQ',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0.1 Safari/605.1.15',
                'Cookie': '_fbp=fb.2.1762901608495.361560162792974024; _gcl_au=1.1.658801412.1762901607; _gcl_aw=GCL.1762901607.CjwKCAiA2svIBhB-EiwARWDPjirixi46FnJF60jhosxDdZCLZp5BDJZNVsKjVR8SA4aKFdTRNHk3oRoC1MQQAvD_BwE; cactusCookiesConsent=opened; _ga_S9BZ8KXZHM=GS2.1.s1762901605$o1$g1$t1762901606$j59$l0$h1714122002; _ga=GA1.1.2144264721.1762901605; _gcl_gs=2.1.k1$i1762901601$u235178010; geolocation-pristine=false; jwt_token=; legal_age_popup_closed=false; ref_code=348952; utm_campaign=23102521348; utm_source=348952; v2_topbar_download_app_closed=false; v2_topbar_push_notify_closed=false; v2_topbar_referral_closed=false; v2_topbar_telegram_closed=false; v2_topbar_tournament_closed=false; __cf_bm=ZwBJF72FMopb7Kf.nof3CUR3ytS14nNX.LX6gOeiaz4-1762901602-1.0.1.1-5VahRjTUO19ti0tOuk7mC81f7kdiQmesPWNlSBMnrtKFIjVfFEg0BKHibuQtpqWf9AgmSQCVctGYaqhNTucCPgplXnkx09xCQCKOTnKxTHs; _cfuvid=o5yjNs1UmZ_fRAGDAIUcY56qsgJXS7jnKJ6j5r9B5Bw-1762901602886-0.0.1.1-604800000',
                'Sec-Fetch-Dest': 'empty',
                'Origin': 'https://jogao.bet.br',
                'Sec-Fetch-Site': 'same-origin',
                'Content-Length': '43',
                'Authorization': 'Bearer',
                'Accept-Language': 'pt-BR,pt;q=0.9',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Accept-Encoding': 'gzip, deflate, br',
                'Sec-Fetch-Mode': 'cors',
                'tenant': 'api.bs2bet.com',
                'language': 'pt-br',
                'x-origin-access': '2',
                'lang': 'pt-br',
                'city': 'Maceio',
                'version': 'vz3b-deploy-e93ff9f64046be372b0fe9e821bdc84e20aeb003-e2f84579cc07ef5c41a4',
                'Priority': 'u=3, i',
                'x-log-info': '1-1762901672359-deploy-e93ff9f64046be372b0fe9e821bdc84e20aeb003-e2f84579cc07ef5c41a4',
                'origin-domain': 'api.bs2bet.com'
            },
            body: JSON.stringify({
                'number': req.params.param,
                'captcha_token': ''
            })
        });

        const text = await response.json();

        console.log(text);

        if (!text?.success) {
            console.log("CONSULTA CPF: " + req.params.param);
            res.json(text);

        } else {
            console.log("CONSULTA CPF: " + req.params.param + ", NOME: " + text.nome + ", IP: " + ipAddress);
            res.json(text);
        }

    })();

});

//https://ice.bet.br/
app.get('/cpf/v13/:param*', (req, res) => {

    const ipAddress = req.header('x-forwarded-for');

    (async function() {

        const response = await fetch('https://api.ice.bet.br/v1/kyc/identities/lookup?identifier='+req.params.param+'&originId=1', {
            headers: {
                'Sec-Fetch-Dest': 'empty',
                'Accept': 'application/json, text/plain, */*',
                'Sec-Fetch-Site': 'same-site',
                'Accept-Language': 'pt-BR,pt;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Sec-Fetch-Mode': 'cors',
                'Origin': 'https://ice.bet.br',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0.1 Safari/605.1.15',
                'Referer': 'https://ice.bet.br/',
                'Connection': 'keep-alive',
                'Cookie': 'FPID=FPID2.3.WGzpNzdgX0zm4SXjv%2BDej6SJSzFv0c2HqDDJMOqA%2FRc%3D.1762901784; _ga_722YY5Q9LM=GS2.1.s1762901783$o1$g0$t1762901790$j53$l0$h728957782; FPAU=1.1.1008716844.1762901783; FPLC=ancUz%2BNJdl8rMChcrZ%2FyigUuNX%2FvaUxIXYDfM3dhD7QZH4ZwyGfweZoJrmNi9oYQ5uCTXiccJjsU6v6YwiHf3lZz4Jh3uxg%2FONesIRwInxxdDA2rxksH3fSaKw6vwA%3D%3D; _fbp=fb.2.1762901784074.1108518587; _gtmeec=eyJjdCI6IjhhMTBjMjU0OGE2ZWJiZDU4ZDI0MTI2N2RlOTllMWUyNzc3Yjc4ZTJiZDYxMGQ4ZGY1MDFkMTVjYWFkMDNjYWYiLCJzdCI6IjYzNTE4MjUwMzAxNTU4MzY2NjQ4NzY2ODZkY2ZmNjFiNmE5MTI1NGEwNDU4NTM3MDcyYTFiMjZhZDE1MWI1Y2UiLCJjb3VudHJ5IjoiODg1MDM2YTBkYTNkZmYzYzNlMDViYzc5YmY0OTM4MmIxMmJjNTA5ODUxNGVkNTdjZTA4NzVhYmExYWEyYzQwZCIsImV4dGVybmFsX2lkIjoiNDNkNGM1MmYzYzhjMTFiOWMzZGEwNzI0ODJjZDIwYTZjMWViODhhNTZhYjk1Y2EyODEzMGIxMmYyZmViYzczMiJ9; cf_clearance=nPwLYhLZElpLzw0ZB6C.8byU4SvwcZsynbgR4yn2aFk-1762901784-1.2.1.1-bF_VcT3m9ovTQLB9BOm.UlnhwLlEynaNueCgwRwJ8J1P2H2deY9Ol0SqtjwrqHd7SUVWQef.q9MKprJ60f6uVjQSNEbDWzlA5XJQW7RglbGMVTmUPOj11i7U9nOmT6uoB9AJXmzET3q58Ph6.9MhHBkKobWXMYx8.NqDST7nhcQF4fSFa_dr.GI4dDUYkH2DtD_SM2PIYl2YPK65cZGun2zi818pQJuJxE2_04v..uE; _ga=GA1.1.301279789.1762901784; _gcl_au=1.1.1008716844.1762901783',
                'x-tenant-id': 'ice',
                'Priority': 'u=3, i',
                'x-lang': 'pt'
            }
        });

        const text = await response.json();

        console.log(text);

        if (!text?.success) {
            console.log("CONSULTA CPF: " + req.params.param);
            res.json(text);

        } else {
            console.log("CONSULTA CPF: " + req.params.param + ", NOME: " + text.name + ", IP: " + ipAddress);
            res.json(text);
        }

    })();

});


//bndes.gov.br - novo cartão
app.get('/cnpj/v1/:param*', (req, res) => {

    const ipAddress = req.header('x-forwarded-for');

    (async function() {

        const url = 'https://ws.bndes.gov.br/canal-mpme/rest/public/receita/'+ req.params.param;

        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Sec-Fetch-Site': 'same-origin',
                'Cookie': '_fbp=fb.2.1761331075119.477422043643171599; _ga=GA1.1.520822218.1761331075; _ga_4H51WV497X=GS2.1.s1761331075$o1$g1$t1761331075$j60$l0$h0; PME_UX_JSESSIONID=0000drXGII9n-pDlj1HFXn0zkkM:98357716-7f37-4f9b-b294-608d19c1c26d',
                'Referer': 'https://ws.bndes.gov.br/canal-mpme/index.html',
                'Sec-Fetch-Dest': 'empty',
                'Accept-Language': 'pt-BR,pt;q=0.9',
                'Sec-Fetch-Mode': 'cors',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.6 Safari/605.1.15',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
                'Priority': 'u=3, i',
            },
        });


        const text = await response.json();

        console.log(text);

        if (!text?.cpfCnpjOkNaReceita) {
            console.log("CONSULTA CNPJ: " + req.params.param);
            res.json(text);

        } else {
            console.log("CONSULTA CNPJ: " + req.params.param + ", NOME: " + text.nome + ", IP: " + ipAddress);
            res.json(text);
        }

    })();

});

//cnpja.com
app.get('/cnpj/v2/:param*', (req, res) => {

    const ipAddress = req.header('x-forwarded-for');

    (async function() {

        const url = 'https://ws.bndes.gov.br/canal-mpme/rest/public/receita/'+ req.params.param;

        const response = await fetch('https://bff.cnpja.com/search?query='+ req.params.param, {
            headers: {
                'Accept': '*/*',
                'Sec-Fetch-Site': 'same-site',
                'Origin': 'https://cnpja.com',
                'Sec-Fetch-Dest': 'empty',
                'Accept-Language': 'pt-BR,pt;q=0.9',
                'Sec-Fetch-Mode': 'cors',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0.1 Safari/605.1.15',
                'Accept-Encoding': 'gzip, deflate, br',
                'Referer': 'https://cnpja.com/',
                'Priority': 'u=3, i'
            }
        });


        const text = await response.json();

        console.log(text);

        if (!text?.records[0].office?.company?.name) {
            console.log("CONSULTA CNPJ: " + req.params.param);
            res.json(text);
        } else {
            console.log("CONSULTA CNPJ: " + req.params.param + ", NOME: " + text?.records[0].office?.company?.name + ", IP: " + ipAddress);
            res.json(text?.records[0]);
        }

    })();

});

app.post('/cpf/find', (req, res) => {


    const text = req.body.chaves;

    const lines = text.split("\n");

    let json = "";
    let first = true;

    lines.forEach(line => {
        const myJson = {
            key: line
        };
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



app.listen(3999, () => console.log('Validate CPF/CNPJ ON V7'));

// Export the Express API
module.exports = app;