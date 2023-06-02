import express from 'express'
import cors from "cors"
import urlencoded from "body-parser"
import ServerlessHttp from 'serverless-http'
import apiRouterV1 from './routes.js'

const app = express()
const port = 5000

app.use(urlencoded(
  {
    extended: true,
    limit: "50mb",
    parameterLimit: 100000
  }
))

app.use(cors());

app.use("/.netlify/functions/api/v1", apiRouterV1)


module.exports.handler = ServerlessHttp(app);