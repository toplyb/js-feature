window.onload = async () => {
  const sliderList = document.querySelector('#slide #slideList')
  const sliderItems = document.querySelectorAll('#slide #slideList div')
  const hintListDom = document.querySelector('#hint')
  let timer
  let currentSliderIndex = 0
  let delay = 2000
  const transitionTime = 500
  let flag = true

  // 新增开始一张
  await handlerDom()

  // 添加圆点
  addDotDom(hintListDom, sliderItems.length)

  // 上一张
  function handlerSliderLeft() {
    if (!flag) {
      return
    }
    clearInterval(timer)
    currentSliderIndex--
    if (currentSliderIndex === -1) {
      currentSliderIndex = sliderItems.length
      sliderList.style.left = `-${currentSliderIndex * 700}px`
      sliderList.style.transition = 'none'
      currentSliderIndex--
      setTimeout(() => {
        hasTimeAndLeft()
      }, 0)
    } else {
      hasTimeAndLeft()
    }
    flag = false
    setTimeout(() => {
      addDotSelectClass(hintListDom, currentSliderIndex)
      autoPlay()
      flag = true
    }, transitionTime)
  }

  function hasTimeAndLeft() {
    sliderList.style.left = `-${currentSliderIndex * 700}px`
    sliderList.style.transition = `${transitionTime}ms linear`
  }

  // 下一张
  function handlerSliderRight() {
    if (!flag) {
      return
    }
    clearInterval(timer)
    currentSliderIndex++
    baseHandlerRight()
    flag = false
    setTimeout(() => {
      addDotSelectClass(hintListDom, currentSliderIndex)
      autoPlay()
      flag = true
    }, transitionTime)
  }

  function baseHandlerRight() {
    hasTimeAndLeft()
    if (currentSliderIndex === sliderItems.length) {
      currentSliderIndex = 0
      setTimeout(() => {
        sliderList.style.left = '0'
        sliderList.style.transition = 'none'
      }, transitionTime)
    }
  }

  // 循环播放
  function autoPlay() {
    clearInterval(timer)

    timer = setInterval(() => {
      handlerSliderRight()
    }, delay)
  }

  autoPlay()

  // 点击小圆点
  function handlerDot(index) {
    return () => {
      clearInterval(timer)
      addDotSelectClass(hintListDom, index)
      currentSliderIndex = index
      baseHandlerRight(index)
    }
  }

  // 鼠标移入
  function handlerMouseOver() {
    clearInterval(timer)
  }

  // 鼠标移出
  function handlerMouseOut() {
    autoPlay()
  }

  sliderList.addEventListener('mouseenter', handlerMouseOver)

  sliderList.addEventListener('mouseleave', handlerMouseOut)

  document.querySelector('#sliderLeft').addEventListener('click', handlerSliderLeft)

  document.querySelector('#sliderRight').addEventListener('click', handlerSliderRight)

  document.querySelector('#hint').childNodes.forEach((item, index) => {
    item.addEventListener('click', handlerDot(index), false)
  })

  // 新增dom
  async function handlerDom() {
    await sliderList.appendChild(sliderItems[0].cloneNode())
  }
}

// 添加小圆点
function addDotDom(hintListDom, len) {
  let dotDom = ''
  for (let i = 0; i < len; i++) {
    if (i === 0) {
      dotDom += '<span class="dot dot-select"></span>'
    } else {
      dotDom += '<span class="dot"></span>'
    }
  }
  hintListDom.innerHTML = dotDom
}

// 添加选中的小圆点样式
function addDotSelectClass(hintListDom, currentSliderIndex) {
  hintListDom.childNodes.forEach((dot, index) => {
    if (currentSliderIndex === index) {
      dot.classList.add('dot-select')
    } else {
      dot.classList.remove('dot-select')
    }
  })
}
