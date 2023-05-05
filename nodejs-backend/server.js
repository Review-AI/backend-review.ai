import express from 'express'
import cors from "cors"
import urlencoded from "body-parser"
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

app.use("/api/v1", apiRouterV1)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
.on("error", (err)=>{
  console.log(err)
});

