import { ElMessage } from 'element-plus'

export default function(fn, delay = 3000) {
  let timer = null
  return function() {
    if (timer) {
      ElMessage.info('请不要频繁点击')
      return
    }
    fn.apply(this, arguments)
    timer = setTimeout(() => {
      timer = null
    }, delay)
  }
}
