const Ctl = require('ipfsd-ctl');
const createClient = require('ipfs-http-client');

Ctl.createController({
  ipfsHttpModule: require('ipfs-http-client'),
  ipfsBin: require('go-ipfs').path()
})
  .then(ipfsd => {
    console.log('Spawned node');
  })
  .catch(err => console.log(err));
