import { LocaleProvider, Spin, Modal, message } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import * as React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import HomeScreen from '../Home'
import LoginScreen from '../Login'
import { toast, log } from '../../common';
import { LOG_LEVEL } from '../../common/log';

export default class extends React.Component {

  componentWillMount() {
    log.init(LOG_LEVEL.DEBUG, this);
    toast.setErrorHandler(this);
  }

  log(type: string, prefix: string, ...args: any[]) {
    if (prefix && (prefix == "catchError"))
      return;
    console.log(prefix, ...args);
  }

  onError(stat: string, msg: string, data: any) {
    if (stat === "AdminTokenNotFound") {
      message.destroy()
      message.error('请先登录')
      // 延迟1秒跳转
      setTimeout(() => {
        location.href = '/login'
      }, 1000)
    } else {
      message.error(msg);
    }
  }

  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <BrowserRouter>
          <Switch>
            <Redirect from="/" exact to="/login" />
            <Route path="/login" exact component={LoginScreen} />
            <Route path="/home" component={HomeScreen} />
          </Switch>
        </BrowserRouter>
      </LocaleProvider>
    )
  }
}
