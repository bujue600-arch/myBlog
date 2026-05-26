事件循环不是一个孤立概念，它连接了调用栈、Web API、宏任务和微任务。理解它之后，再看 Promise、setTimeout、async/await 的输出顺序就会稳定很多。

### 我的理解方式

同步代码先进入调用栈执行；异步能力交给浏览器或运行时处理；回调在合适的时机回到任务队列。每次宏任务结束后，运行时会尽量清空微任务队列，然后再进入下一轮渲染和任务。

```js
console.log("start");
setTimeout(() => console.log("timer"));
Promise.resolve().then(() => console.log("promise"));
console.log("end");
```

这段代码的输出顺序是 start、end、promise、timer。原因是同步代码先执行，Promise 回调进入微任务，setTimeout 回调进入宏任务。
