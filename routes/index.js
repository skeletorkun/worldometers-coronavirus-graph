import { getData } from '../src/service';

import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  const countries = ['italy', 'france', 'china'];

  getData({countries})
    .then(data => {
      res.render('index', { title: 'Demo of the new graphs', graphData: data });
    })
    .catch(reason => {
      res.render('index', { title: reason });
    });

});

module.exports = router;
