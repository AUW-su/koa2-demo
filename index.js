const Koa = require('koa')
const app = new Koa()

app.use( async ( ctx ) => {
    console.log('111')
    console.log(ctx)
    let url = ctx.request.url
    ctx.body = url
    // ctx.body = {
    //     name: 'tom',
    // }
})
app.listen(3000)