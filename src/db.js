'user strict';
import mysql from 'promise-mysql';
import { dbConfig } from '../config/dbconfig';

export const connection = async () => {
  try {
    let pool;
    let con;
    if (pool) con = pool.getConnection();
    else {
      pool = await mysql.createPool(dbConfig);
      con = pool.getConnection();
    }
    return con;
  } catch (ex) {
    throw ex;
  }
};

export const queries = {
  read_new: `SELECT *
             FROM wm_dt_coronavirus_new`,
  read_history_data: `SELECT *
                      FROM wm_dt_coronavirus_history_new`,

  read_history_data_for_countries: `SELECT *
                      FROM wm_dt_coronavirus_history_new where entity_id_coronavirus in (\'italy\', \'france\')`
};