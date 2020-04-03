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

  select_history_data_for_world: `SELECT entity_id_coronavirus as entity_id,
                                         cca3_coronavirus as cca3,
                                         cases,
                                         deaths,
                                         h.current_date
                                  FROM wm_dt_coronavirus_history_new h;`,

  select_days_after_100_cases: `SELECT *,
                                       DATEDIFF(
                                               (SELECT hist2.current_date
                                                from wm_dt_coronavirus_history_new as hist2
                                                where hist2.id = hist.id
                                                  and hist2.entity_id_coronavirus = hist.entity_id_coronavirus),
                                               (SELECT min(hist3.current_date)
                                                from wm_dt_coronavirus_history_new as hist3
                                                where hist3.entity_id_coronavirus = hist.entity_id_coronavirus
                                                  and cases > 100)
                                           ) AS day_num
                                FROM wm_dt_coronavirus_history_new as hist
                                where entity_id_coronavirus in ('italy', 'china', 'france')
                                  and cases > 100
                                order by entity_id_coronavirus, day_num;`,
};