const validatePassword = () => {
  return (rule, value, callback) => {
    if (value.length < 6) {
      callback(new Error('密码长度需要大于6位'))
    } else {
      callback()
    }
  }
}
export default {
  userName: [
    {
      required: true,
      trigger: 'blur',
      message: '请填入用户名'
    }
  ],
  password: [
    {
      required: true,
      validator: validatePassword(),
      trigger: 'blur'
    }
  ]
}
