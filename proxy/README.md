# Proxy module module

This is the documentation for the `proxy` module you can check the whole challenge documentation [here](../README.md)

> **NOTE :warning::** File `config/keys.js` holds the mongodb `uri` and application secret, this implementation is not secured but allows the project to be runned without setting up local db, this in production should be handled using `.env`

This module serves an `express` API that connects to a `mongodb` remote database.

Table of contents:                       |
----------------------                   |
[Models documentation](#models)          |
[API documentation](#api)                |

## Models

> **NOTE:** Models specified here are only for the implementation of the `proxy` module, the `api` module specifies other models like `users`.

<details>
  <summary>Expand to see model documentation</summary>
  
  ### Request

  Field | Description | Type |
  :----:|:-----------:|:----:|
  `path`| IPFS HTTP endpoint requested | `String` |
  `httpMethod`| HTTP method of the requested | `String` |
  `startTime`| Time the initial request was made | `String` |
  `apiKey`| key used to access the api | `ObjectId` |

  ### Key

  Field | Description | Type |
  :----:|:-----------:|:----:|
  `key`| IPFS HTTP endpoint requested | `String` |
  `requestCount`| Times this key has been used (encrypted) | `String` |
  `requests`| Requests made using the key | `[ObjectId]` |

</details>


## API
The proxy API can be accessed on the port `3000` using `http://localhost:3000/ipfs` as a base url.

<details>
  <summary>Expand to see API documentation</summary>
  
  ### Authorization
  All the requests made to the `proxy` api have to include an api key in the header as such:
  
  ```
    Header:
      Authorization: Bearer <api_key>
  ```	
  
  ### Endpoints
  
  This module is only a `proxy` to the an `ipfs` node, all the endpoints can be checked [here](https://docs.ipfs.io/reference/http/api/#http-commands).
 
  For example:
  
  To access:
  ```
  <ipfs_url>/api/v0/add
  ``` 
  the proxy equivalent would be:
  ```
  http://localhost:3000/ipfs/add
  ```
  
  ### Error responses
  Overview of the error responses and the explanation.
  
  Code | Content | Explanantion |
  -----|---------|--------------|
  `401`| `{ error: 'Missing or invalid API key' }` | Authorization header not present |
  `401`| `{ error: 'Missing or invalid API key' }` | Authorization header is not valid |
  `401`| `{ error: 'Missing or invalid API key' }` | API key isn't valid |
</details>
