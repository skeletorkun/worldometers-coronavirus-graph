import { getData } from '../src/service';

import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  getData()
    .then(data => {
      res.render('index', { title: 'First graph', graphData: data });
    })
    .catch(reason => {
      res.render('index', { title: reason });
    });

});

module.exports = router;
