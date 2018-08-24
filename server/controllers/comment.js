const DB = require('../utils/db.js')

module.exports = {

  add: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    let name = ctx.state.$wxInfo.userinfo.nickName
    let avatar = ctx.state.$wxInfo.userinfo.avatarUrl
    let content = ctx.request.body.content || null

    await DB.query('INSERT INTO chat_list(user, name, avatar, content) VALUES (?, ?, ?, ?)', [user, name, avatar, content])

    ctx.state.data = {}
  },

  list: async ctx => {
    ctx.state.data = await DB.query('SELECT * FROM chat_list ORDER BY id DESC')
  }

}