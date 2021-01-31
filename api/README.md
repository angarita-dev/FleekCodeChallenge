# API module

This is the documentation for the `api` module you can check the whole challenge documentation [here](../README.md)

> **NOTE :warning::** File `config/keys.js` holds the mongodb `uri` and application secret, this implementation is not secured but allows the project to be runned without setting up local db, this in production should be handled using `.env`

This module serves an `express` API that connects to a `mongodb` remote database.

Table of contents:                       |
----------------------                   |
[Models documentation](#models)          |
[API documentation](#api)                |

## Models

> **NOTE:** Models specified here are only for the implementation of the `api` module, the `proxy` module specifies other models like `requests`.

<details>
  <summary>Expand to see model documentation</summary>
  
  ### User

  Field | Description | Type |
  :----:|:-----------:|:----:|
  `email`| User email (unique) | `String` |
  `password`| User password (encrypted) | `String` |
  `keys`| User generated keys (unique) | `[ObjectId]` |

  ### Key

  Field | Description | Type |
  :----:|:-----------:|:----:|
  `key`| Api key (unique) | `String` |
  `requestCount`| Times this key has been used (encrypted) | `String` |
  `owner`| User that created the key | `ObjectId` |

</details>


## API
The API can be accessed on the port especified by enviroment variable `PORT`, if not especified it defaults to `5000`

<details>
  <summary>Expand to see API documentation</summary>
  
  ### Endpoints

  Model | Overview | Documentation |
  :----:|:--------:|:-------------:|          
  `User` | `POST /api/users/login` | [User login]() |
  `User` | `POST /api/users/register` | [User register]() |
  `User` | `POST /api/users/keys` | [User keys]() |
  `Key` | `POST /api/keys/create` | [Generate Key]() |
  `Key` | `POST /api/keys/remove` | [Remove Key]() |

</details>
