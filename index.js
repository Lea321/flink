const express = require('express');
const cheerio = require('cheerio')
const axios = require('axios')
const bodyParser = require('body-parser');

const app = express()

app.use(bodyParser.json());

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

app.get('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.send('ok')
})
app.post('/api/checkUrl', async(req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    // let m = req.get('origin');
    let m = 'blog.leonus.cn'
    let f = req.body.url

    let body = ''
    try {
        body = await axios.get(f)
    } catch (error) {}
    if (body != '') {
        const $ = cheerio.load(body.data);
        let ls = $('.flink-list a')
        if (ls.length == 0) {
            ls = $('.flink a')
        }
        if (ls.length == 0) {
            ls = $('.friends a')
        }
        for (let i = 0; i < ls.length; i++) {
            if (ls[i].attribs.href.indexOf(m) != -1) {
                res.send('1')
                return
            }
        }
        res.send('0')
        return
    }
    res.send('null')
    return
})



app.listen(3000, () => {
    console.log('开始监听');
})