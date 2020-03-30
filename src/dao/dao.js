import { connection, queries } from '../db';

export default class HistoryDataDao {

  async readEntities() {
    let con = await connection();
    try {
      await con.query('START TRANSACTION');
      let data = await con.query(queries.read_history_data);
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