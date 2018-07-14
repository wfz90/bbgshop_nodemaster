module.exports = class extends think.Controller {
  async testAction() {
    // 如果不是定时任务调用，则拒绝
    // if(!this.isCli) return this.fail(1000, 'deny');
      const collsgelist = await this.model('collage_user').select()
        // console.log(collsgelist);
        ////////////////////////////定时清理砍价和拼团
        for (var i = 0; i < collsgelist.length; i++) {
          // console.log(i);
          // console.log(collsgelist[i].end_time);
          if (parseInt(collsgelist[i].end_time) <= new Date().getTime() ) {
            await this.model("collage_user").where({id:collsgelist[i].id}).update({
              is_outtime:1
            })
            await this.model("order").where({id:collsgelist[i].order_id}).update({
              collage_isouttime: 1
            })
          }
      }
      console.log("拼团过期时间已清理 ！");
      const bargainlist = await this.model('bargain_user').select()
        for (var j = 0; j < bargainlist.length; j++) {
          if (parseInt(bargainlist[j].end_time) <= new Date().getTime() ) {
            await this.model("bargain_user").where({id:bargainlist[j].id}).update({
              is_outtime:1
            })
        }
      }
      console.log("拼团过期时间已清理 ！");
      //清理未支付订单
      const orderlist = await this.model('order').where({
          add_time: {'>': new Date().getTime() - 7200000, '<': new Date().getTime() , _logic: 'AND'},is_del: 0,pay_time: 0
        }).select();
        console.log(orderlist);
        for (var h = 0; h < orderlist.length; h++) {
          console.log(h);
          if (orderlist[h].add_time < new Date().getTime() - 7200000) {
            await this.model('order').where({id:orderlist[h].id}).update({
              is_del: 2
            })
          }
      }
      console.log("未支付订单超时已清理 ！");
      const luckdrawlist = await this.model('luckdraw').where({abled:1,is_del:0,is_open:0}).select()
      for (var k = 0; k < luckdrawlist.length; k++) {
          if (parseInt(luckdrawlist[k].luck_limit_time) <= new Date().getTime() ) {
            console.log('已达到开奖截止时间 !');
            if (Number(luckdrawlist[k].luck_people_num) > Number(luckdrawlist[k].have_join_people_num)) {
              await this.model("luckdraw").where({id:luckdrawlist[k].id}).update({
                luck_limit_time: new Date().getTime() + 86000000,
                luck_open_time: new Date().getTime() + 172000000
              })
              console.log('未达到开奖人数___开奖失败___开奖截止时间与开奖时间都已延迟 !');
            }else {
              console.log('已达到开奖人数___开奖已截止__准备开奖 !');
              await this.model("luckdraw").where({id:luckdrawlist[k].id}).update({
                is_out_time:1 //抽奖已达到截止时间
              })
              if (parseInt(luckdrawlist[k].luck_open_time) <= new Date().getTime() ) {
                console.log('已达到开奖人数___已达到开奖时间___正在开奖 !');
                let looppeople = luckdrawlist[k].luck_goods_num
                let alljoinpeople = await this.model('luckdraw_user').where({luckdraw_main_id:luckdrawlist[k].id}).select()
                let aii = []
                for (var l = 0; l < parseInt(looppeople); l++) {
                  let obj = Math.floor(Math.random() * alljoinpeople.length )
                  aii.push(obj)
                }
                let point_user_id_list = []
                for (var m = 0; m < aii.length; m++) {
                  let point_user = alljoinpeople[aii[m]]
                  point_user_id_list.push(point_user.join_user_id)
                }
                let aiistr = point_user_id_list.join(',')
                console.log(aiistr);
                await this.model("luckdraw").where({id:luckdrawlist[k].id}).update({
                  is_open:1,
                  luck_draw_user_id: aiistr
                })
                console.log('已达到开奖人数___已达到开奖时间___开奖成功 !');
                if (point_user_id_list.length == 0) {
                  console.log('异常 ! ! 没有产生中奖者 !');
                }else {
                  console.log('中奖者已产生 !');
                  console.log(point_user_id_list);
                }
              }else {
                console.log('已达到开奖人数___未达到开奖时间 !');
              }
            }
          }else {
            console.log("未达到开奖截止时间 ！");
          }
        }
      console.log('定时任务__5分钟一次');
    }

}
