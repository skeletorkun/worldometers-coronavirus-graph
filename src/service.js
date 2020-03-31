import HistoryDataDao from '../src/dao/dao';
import { queries } from './db';

const dao = new HistoryDataDao();

const applyParams = (data, params) => {
  let countries = params && params.countries;
  if(countries){
    data = data.filter( row => countries && countries.includes(row['entity_id_coronavirus']))
  }
  return data;
};

const prepareForGraph = (data) => {

  const countries = {};
  data.forEach(row => {
    let country = row['entity_id_coronavirus'];
    countries[country] = countries[country] || [];
    countries[country].push(row.cases);
  });

  const result = Object.entries(countries).map(([key, value]) => ({ name: key, data: value}));
  console.log('result ' + JSON.stringify(result));
  return result;

};


export const getData = async (params) => {
  return new Promise(((resolve, reject) => {
    dao.readEntities(queries.select_days_after_100_cases)
      .then(result => applyParams(result, params))
      .then(result => prepareForGraph(result, params))
      .then(result => {
      console.log('result ', JSON.stringify(result, null, 2));
      resolve(JSON.stringify(result));
    });
  }));
};