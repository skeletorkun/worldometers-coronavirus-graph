import HistoryDataDao from '../src/dao/dao';
import { queries } from './db';

const dao = new HistoryDataDao();

export const getData = async () => {
  return new Promise(((resolve, reject) => {
    dao.readEntities(queries.read_history_data_for_countries).then(result => {
      console.log('result ', JSON.stringify(result, null, 2));
      resolve(JSON.stringify(result));
    });
  }));
};