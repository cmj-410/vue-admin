const mobileValidate = (rule, value, callback) => {
  if (!value) {
    callback()
  } else {
    const valueArr = Array.from(value)
    if (valueArr.length !== 11) {
      callback(new Error('电话号码为11位'))
    } else {
      const res = valueArr.every(item => !isNaN(item))
      if (res) {
        callback()
      } else {
        callback(new Error('电话号码只能为数字'))
      }
    }
  }
}

export default {
  userName: [
    {
      required: true,
      message: '请填入用户名'
    }
  ],
  mobile: [
    {
      validator: mobileValidate
    }
  ],
  state: [
    {
      required: true,
      message: '请选择状态'
    }
  ]
}
