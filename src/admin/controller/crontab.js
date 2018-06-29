module.exports = class extends think.Controller {
  async testAction() {
    // 如果不是定时任务调用，则拒绝
    // if(!this.isCli) return this.fail(1000, 'deny');
      const collsgelist = await this.model('collage_user').select()
      console.log(collsgelist);
      for (var i = 0; i < collsgelist.length; i++) {
        console.log(i);
        console.log(collsgelist[i].end_time);
        if (parseInt(collsgelist[i].end_time) <= new Date().getTime() ) {
          await this.model("collage_user").where({id:collsgelist[i].id}).update({
            is_outtime:1
          })
          await this.model("order").where({id:collsgelist[i].order_id}).update({
            collage_isouttime: 1
          })
        }
      }
      const bargainlist = await this.model('bargain_user').select()
      console.log(bargainlist);
        for (var j = 0; j < bargainlist.length; j++) {
          if (parseInt(bargainlist[j].end_time) <= new Date().getTime() ) {
            await this.model("bargain_user").where({id:bargainlist[j].id}).update({
              is_outtime:1
            })
        }
      }
      const luckdrawlist = await this.model('luckdraw').where({abled:1,is_del:0,is_open:0}).select()
      for (var k = 0; k < luckdrawlist.length; k++) {
        if (parseInt(luckdrawlist[k].luck_limit_time) <= new Date().getTime() ) {
          await this.model("luckdraw").where({id:luckdrawlist[k].id}).update({
            is_out_time:1
          })
        }
        if (parseInt(luckdrawlist[k].luck_open_time) <= new Date().getTime() ) {
          let looppeople = luckdrawlist[k].luck_goods_num
          let alljoinpeople = await this.model('luckdraw_user').where({luckdraw_main_id:luckdrawlist[k].id}).select()
          let aii = []
          // console.log(looppeople);
          // console.log(alljoinpeople);
          for (var l = 0; l < parseInt(looppeople); l++) {
            let obj = Math.floor(Math.random() * alljoinpeople.length )
            aii.push(obj)
          }
          let aiistr = aii.join(',')
          console.log(aiistr);
          await this.model("luckdraw").where({id:luckdrawlist[k].id}).update({
            is_open:1,
            luck_draw_user_id: aiistr
          })
        }
      }
      // console.log();
      console.log('定时任务__清理砍价，拼团，抽奖的过期时间和中奖,5分钟一次');
    }

}
