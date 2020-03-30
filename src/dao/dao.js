import { connection, queries } from '../db';

export default class HistoryDataDao {

  async readEntities(query) {
    let con = await connection();
    try {
      await con.query('START TRANSACTION');
      let data = await con.query(query);
      await con.query('COMMIT');
      data = JSON.parse(JSON.stringify(data));
      return data;
    } catch (ex) {
      console.log(ex);
      throw ex;
    } finally {
      await con.release();
      await con.destroy();
    }
  }
};