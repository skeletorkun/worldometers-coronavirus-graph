var express = require('express');
var router = express.Router();

import HistoryDataDao from '../src/dao/dao'
const dao = new HistoryDataDao();

/* GET home page. */
router.get('/', function(req, res, next) {

  const loadData = async () => {
    let data = await dao.readEntities();
    console.log("Data --> ", data);
  };

  loadData().then(result => {
    res.render('index', { title: result });
  });

});

module.exports = router;
