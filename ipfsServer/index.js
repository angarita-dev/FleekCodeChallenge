const IPFS = require('ipfs-core')

IPFS.create(
  {
    "API": {
      "HTTPHeaders": {
        "Access-Control-Allow-Origin": [
          "http://127.0.0.1:3000"
        ]
      }
    }
  }
)
