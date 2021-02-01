# FleekCodeChallenge

This challenge has been split in 4 well defined and loosely copuled modules to learn more about each module check:
- [Api](./api/README.md)
- [Proxy](./proxy/README.md)
- [Client](./client/README.md)


Table of contents:                       |
----------------------                   |
[Written questions](#written-questions)  |
[How to use](#how-to-use)                |


## Written questions
### How would you improve this assignment for a production ready solution (e.g., security,deployment)?

For this assignment to be a production ready solution it requires a couple of important changes:
- Storing keys using secret `.env` for storing sensitive data like `api` secret for hashing passwords & jwt, and information like db `uri`. This is an easy task to implement but I choose so the assignment could be built and run by you guys much easier and without too much configuration.

- Improve `client <-> api` authentication, implementing a `Sessions` model and using cookies for storing session token instead of `localStorage`.
- Implementing `tls` for the `proxy` module, to secure the connection to the `ipfsServer`.
- Allow for horizontal scalability if needed, adding a `load balancing`.
- Even though the solution is split into loosely coupled modules, each module could be a `docker` component, making it easier for deployment.
- Add a `ci/cd ` and making more robust tests, even though there are tests in modules like `api` and `proxy`, more thorough tests are pending because of time constraints.
- Add flash messages on `client` and overall `ui/ux` improvements.


### Describe IPFS and compare it to other protocols e.g., HTTP?

The key feature of IPFS is that it offers a peer to peer distributed file system, there is no centralized server, HTTP on the other hand encourages centralization, every HTTP request goes to a single `host`, if the `host` is not available, the request fails. This is a huge weakness, in IPFS instead of having a single source of truth, every resource is stored in a resilient network, not depending on a single machine.

Another of the advantages of IPFS over HTTP is that it saves bandwidth, HTTP gets data from one source at a time, IPFS can distribute high volumes of data across a whole network.

IPFS also allows for file versioning allowing every existent version to be accessed as long as it's still stored by any node in the network.

These are only a few of IPFS advantages, there are also some drawbacks, like having a large enough network to ensure that there are enough copies of every file, but these challenges are being solved by initiatives like [filecoin](https://filecoin.io/).


You can get more info about IPFS [here](https://ipfs.io/).


## How to use?
> This is an overview of how running the package looks like
![install](https://i.imgur.com/95nwu07.gif)

### Instructions

Clone this repository 

```
git clone git@github.com:angarita-dev/FleekCodeChallenge.git
```

`cd` in to created directory

```
cd FleekCodeChallenge
```

Install all the modules

```
npm run-script install-modules
```

Build all the modules
```
npm run-script build
```

Start all the modules
```
npm start
```

**Optional:** You can monitor every module by using:

```
npm run-script monitor
```

You can now access all the modules, for example you could head over to checkout the [client](http://localhost:4000/)
