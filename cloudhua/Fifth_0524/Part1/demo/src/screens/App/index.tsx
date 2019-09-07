import { LocaleProvider, Spin, Modal, message } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import * as React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import HomeScreen from '../Home'
import LoginScreen from '../Login'
import { toast, log } from '../../common';
import { LOG_LEVEL } from '../../common/log';

export default class extends React.Component {

  componentWillMount(){
    log.init(LOG_LEVEL.DEBUG, this);
    toast.setErrorHandler(this);
  }

  log(type:string, prefix:string, ...args:any[]){
    if (prefix && (prefix == "catchError"))
      return;
    console.log(prefix, ...args);
  }

  onError(stat:string, msg:string, data:any){
    if(stat === "NOT_LOGIN"){
      message.destroy()
      message.error('请先登录')
      location.hash = '#/login'
    }else{
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
