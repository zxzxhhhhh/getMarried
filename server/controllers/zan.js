const DB = require('../utils/db.js')

module.exports = {

  add: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    let name = ctx.state.$wxInfo.userinfo.nickName
    let avatar = ctx.state.$wxInfo.userinfo.avatarUrl

    let zanLog = await DB.query('SELECT * FROM zan_log where zan_log.user = ?', [user])
    
    if(zanLog.length == 0)
    {
      await DB.query('INSERT INTO zan_log(user, name, avatar) VALUES (?, ?, ?)', [user, name, avatar])
      ctx.state.data = { msg:'感谢您的祝福'}
    }else{
      ctx.state.data = { msg: '您已经祝福过了' }
    }
      
    
  },

  list: async ctx => {
    let zanLog = await DB.query('SELECT * FROM zan_log')
    let zanNum = (await DB.query('SELECT COUNT(*) AS NumberOfOrders FROM zan_log'))[0].NumberOfOrders
    ctx.state.data = { zanLog, zanNum}
  }

}