const LISTEN_PORT = 8000 //Port to listen for changes on

const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()

const url = 'https://coinmarketcap.com/currencies/dogecoin/'

axios(url)
.then(response => {
    const html = response.data

    const savedHtml = cheerio.load(html)
    const articles = []


    savedHtml('priceValue', html).each(function() {
        const title = savedHtml(this).text()
        console.log(title)
        const url = savedHtml(this).find('span')
        articles.push({
            title,
            url
        })
    })
    console.log(articles)
}).catch(err=> console.log(err))

app.listen(LISTEN_PORT, () => console.log('server running on PORT {LISTEN_PORT}'))
