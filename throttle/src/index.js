window.onload = () => {
  document.querySelector('.container').addEventListener('click', throttle(() => {
    console.log('aaaa')
  }))

  // 记录所有的点击事件，并间隔相同的时间依次执行
  function throttle(fn) {
    let timer = null
    const queue = []
    return () => {
      queue.push(fn)
      if (!timer && queue.length > 0) {
        timer = setInterval(() => {
          if (queue.length === 0) {
            clearInterval(timer)
            return
          }
          const newFn = queue.shift()
          newFn && newFn.apply(this, arguments)
          timer = null
        }, 1000)
      }
    }
  }
}
