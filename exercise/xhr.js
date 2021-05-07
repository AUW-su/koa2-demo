// 步骤

// 创建 XMLHttpRequest 实例
// 发出 HTTP 请求
// 服务器返回 XML 格式的字符串
// JS 解析 XML，并更新局部页面
// 不过随着历史进程的推进，XML 已经被淘汰，取而代之的是 JSON。
// 了解了属性和方法之后，根据 AJAX 的步骤，手写最简单的 GET 请求。

// 版本1
function ajax() {
    let xhr = new XMLHttpRequest() //实例化，以调用方法
    xhr.open('get', 'https://www.google.com')  //参数2，url。参数三：异步
    xhr.onreadystatechange = () => {  //每当 readyState 属性改变时，就会调用该函数。
      if (xhr.readyState === 4) {  //XMLHttpRequest 代理当前所处状态。
        if (xhr.status >= 200 && xhr.status < 300) {  //200-300请求成功
          let string = xhr.responseText
          //JSON.parse() 方法用来解析JSON字符串，构造由字符串描述的JavaScript值或对象
          let object = JSON.parse(string)
        }
      }
    }
    xhr.send() //用于实际发出 HTTP 请求。不带参数为GET请求
}

// 版本2  promise实现
function ajax(url) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest()
      xhr.open('get', url)
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText))
          } else {
            reject('请求出错')
          }
        }
      }
      xhr.send()  //发送hppt请求
    })
  }
  
  let url = '/data.json'
  ajax(url).then(res => console.log(res))
    .catch(reason => console.log(reason))
    