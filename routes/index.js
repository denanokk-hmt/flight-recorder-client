
var express = require('express')
var router = express.Router()

//Unix socket client module
const { Writer } = require('../unix_socket_client')


/**
 * ///////////////////////////////////////////////////
 * socket tester
 */
router.get('/index', async (req, res) => {

  let data = req.query.data || 'Hello...'

  //Sample logging key data
  //-->flight_recorderで、sessionをsearchして、logging
  data = [{
    kind: 'Session',
    api: 'put_signin',
    logiD: '12345678zxy',
    ns: 'WhatYa-svc-dev',
    session_id: '0GMhYjA0XWUNEPGokmSCwC2NNKl8vE2RjOXAEwEAwC1ibEwnB9UfU/s5GxcBOIVVCqkD0I7FC8a6pplgPStjssHHxMCt51aB',
    customer_uuid: 'e193c86d-4748-4de8-b708-ca705076b657',
  },
  {
    kind: 'Session',
    api: 'put_signin',
    logiD: '12345678zxy',
    ns: 'WhatYa-svc-dev',
    session_id: '0GMhYjA0XWUNEPGokmSCwC2NNKl8vE2RjOXAEwEAwC1ibEwnB9UfU/s5GxcBOIVVCqkD0I7FC8a6pplgPStjssHHxMCt51aB',
    customer_uuid: 'e193c86d-4748-4de8-b708-ca705076b657',
  }]

  //Logging data async sendding
  //flight_recorder(JSON.stringify(data))
  const socket = new Writer()
  socket.write(JSON.stringify(data))
  

  //Next exec...
  let result = data
  res.json(result);
});

module.exports = router;