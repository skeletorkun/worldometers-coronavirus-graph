import { getData, getDataForWorldMap } from '../src/service';

import express from 'express';
const router = express.Router();

const handleGraph1 = (req, res, next) => {

  const countries = ['italy', 'france', 'china'];

  getData({countries})
    .then(data => {
      res.render('index', { title: 'Demo', page: 'chart1', graphData: data });
    })
    .catch(reason => {
      res.render('index', { title: reason });
    });
};


const handleGraph2 = (req, res, next) => {

  getDataForWorldMap()
    .then(data => {
      res.render('index', { title: 'Demo of the new graphs', page: 'chart2', graphData: data });
    })
    .catch(reason => {
      res.render('index', { title: reason });
    });

};



/* GET graph-1. */
router.get('/', handleGraph1);
router.get('/graph-1', handleGraph1);
router.get('/graph-2', handleGraph2);

module.exports = router;
