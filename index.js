const Koa = require('koa');
const app = new Koa();

app.use((ctx, next) => {
    ctx.body = {
        name: 'tom',
    }
});

app.listen(3000, () => {
    console.log('koa start')
})