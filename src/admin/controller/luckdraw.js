const Base = require('./base.js');

module.exports = class extends Base {
  async listAction() {
    const page = this.get('page') || 1;
    const size = this.get('size') || 10;
    const goodsname = this.get('goodsname') || '';
    // const consignee = this.get('consignee') || '';
    console.log(goodsname);
    const model = this.model('luckdraw');
    const data = await model.where({luck_goods_name: ['like', `%${goodsname}%`],is_del:0}).order(['id DESC']).page(page, size).countSelect();
    console.log(data);
    return this.success(data);
  }
  async setluckableAction() {
    const id = this.post('id');
    const is_able = this.post('data');
    const model = this.model('luckdraw');
    const data = await model.where({id: id}).update({
      abled:is_able
    });
    return this.success({
      id:id,
      data:data
    });
  }
  async delluckAction() {
    const id = this.post('id');
    const data = await this.model('luckdraw').where({id: id}).update({
      is_del: 1
    });

    return this.success(data);
  }
  async luckstoreAction() {
    const luck = this.post('Luck')
    const goods = this.post('goods')
    console.log(luck,goods);
    const have = await this.model('luckdraw').where({luck_goods_id:goods.id}).select()
    if (have.length > 0) {
      return this.fail(17,'已存在此商品的抽奖 ！')
    }else{
      const data = await this.model('luckdraw').add({
        abled:0, 
        luck_goods_id: goods.id,
        luck_people_num: luck.LuckPeople,
        luck_goods_num: luck.LuckGoodsNum,
        luck_create_time: luck.create_time,
        luck_limit_time: luck.limit_time_local,
        luck_open_time: luck.open_time_local,
        luck_goods_detail: luck.LuckDetailEdit,
        luck_goods_pic: goods.list_pic_url,
        luck_goods_price: goods.retail_price,
        luck_goods_name: goods.name
      })
      return this.success(data)
    }

  }
};
