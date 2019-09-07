import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Input, Form, Icon, Button, Modal, message } from 'antd'

import './index.less'
import { Auth ,User } from '../../services'
import { user } from '../../logics'
import { tt, toast } from '../../common'

interface Props {

}

interface State {
  name: string
  pwd: string
  loading: boolean
}

export default class Login extends React.Component<RouteComponentProps<Props>, State> {

  state: State = {
    name: '',
    pwd: '',
    loading: false
  }

  get disabled() {
    return (
      this.state.name === '' ||
      this.state.pwd === '' ||
      this.state.loading === true
    )
  }

  get loginText() {
    if (this.state.loading === true) return '正在登录'
    return '登录'
  }

  async login() {
    try {
      let { name, pwd } = this.state
      tt.verify(!!name, "nameError", 'name 不为空');
      tt.verify(!!pwd, "pwdError", 'pwd 不为空');
      let result = await Auth.login(name, pwd)
      tt.check(result)
      this.props.history.push('/home')
      message.success('登录成功')
    } catch (error) {
      if (error.stat === "nameError") {
        /////
      }
      toast.catchError(error)
    }
  }

  

  componentWillMount() {
  }

  render() {
    return (
      <div className="login-wrap">
        <div className="login-box">
          <Form.Item className="login-title">
            管理平台
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<Icon type="user" />}
              placeholder="请输入账号"
              value={this.state.name}
              autoFocus
              onChange={event => {
                this.setState({
                  name: event.target.value.trim()
                })
              }}
              onPressEnter={this.login.bind(this)}
            />
          </Form.Item>
          <Form.Item>
            <Input
              type="password"
              prefix={<Icon type="lock" />}
              placeholder="请输入密码"
              value={this.state.pwd}
              onChange={event => {
                this.setState({
                  pwd: event.target.value.trim()
                })
              }}
              onPressEnter={this.login.bind(this)}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              block
              className="login-form-button"
              disabled={this.disabled}
              onClick={this.login.bind(this)}
            >
              {this.loginText}
            </Button>
          </Form.Item>
        </div>
      </div>
    )
  }
}

