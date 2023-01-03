const express = require('express')
const app = express()
const axios = require('axios');
const { servers } = require('./config');

let current = 0, server;

const handleRequest = async (req, res) => {
  const { method, url, headers, body: data } = req
  server = servers[current]
  current === (servers.length - 1) ? current = 0 : current++
  try {
    const response = await axios({
      url: `${server}${url}`,
      method,
      headers,
      data
    })
    console.log(`proxy to  ${server} succeded`)
    res.send(response.data)
  }
  catch (err) {
    console.log(`proxy to ${server} failed`)
    handleRequest(req, res)
  }
}

app.use((req, res) => { handleRequest(req, res) })

app.listen(80, () => console.log('Proxy server listening on port 80!'))