import HistoryDataDao from '../src/dao/dao';
import { queries } from './db';

const dao = new HistoryDataDao();

/**
 * Convert the DB rows to a Highcharts-ready array
 * @param data
 * @return {*}
 */
const prepareForWorldMap = (data) => {

  const dates = {};

  // create an object like
  // {
  //  '2020-03-01' : [{country:'china', cases:8000 }, {country: 'italy', cases:500}...]
  //  '2020-03-02' : [{country:'china', cases:9000 }, {country: 'italy', cases:500}...]
  // }
  data.forEach(row => {
    let date = row['current_date'];
    let country = row['entity_id'];
    let cca3 = row['cca3']; //iso-a3
    let cases = row['cases'];
    let deaths = row['deaths'];

    if (cases) {
      const data = { cca3, value: cases, country };
      dates[date] = dates[date] || [];
      dates[date].push(data);
    }
  });

  const result = Object.entries(dates).map(([key, value]) => ({ name: key, data: value }));
  console.log('result ' + JSON.stringify(result));
  return result;
};


export const getDataForWorldMap = async (params) => {
  return new Promise(((resolve, reject) => {
    dao.readEntities(queries.select_history_data_for_world)
      .then(result => prepareForWorldMap(result, params))
      .then(result => {
        console.log('result ', JSON.stringify(result, null, 2));
        resolve(JSON.stringify(result));
      });
  }));
};