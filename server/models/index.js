const db = require('../db');

module.exports = {
  orders: {
    get: (userId, callback) => {
      // TODO: 해당 유저가 작성한 모든 주문을 가져오는 함수를 작성하세요
      let sql = `
      select *, orders.id AS id 
      from orders
      left join order_items on orders.id = order_items.order_id
      left join items on items.id = order_items.item_id
      where user_id=${userId}`
      db.query(sql, (err, rows) => {
        callback(err, rows);
      })
      //callback(/* err, result */);
    },

    post: (userId, orders, totalPrice, callback) => {
      // TODO: 해당 유저의 주문 요청을 데이터베이스에 생성하는 함수를 작성하세요
      let sql = `
      insert into orders(user_id,total_price) 
      values (${userId},${totalPrice})`

      db.query(sql, (err, rows) => {
        let sql = `
        insert into order_items(order_id,item_id,order_quantity) 
        values ?`

        let orderId = rows.insertId;
        let values = orders.map((order) => [
          orderId, order.itemId, order.quantity
        ]);
        db.query(sql, [values], (err, rows) => {
          callback(err,rows);
        })
      })
      
      //callback(/* err, result */);
    }
  },

  items: {
    get: (callback) => {
      // TODO: Cmarket의 모든 상품을 가져오는 함수를 작성하세요
      let sql = `select * from items`;
      db.query(sql, (err, rows) => {
        callback(err, rows);
      })
      //callback(/* err, result */);
    }
  }

};
