import * as React from 'react'
import { Menu, Button, Icon, Switch } from 'antd'
import { RouteComponentProps, Route } from 'react-router-dom'
import { Unsubscribe } from 'redux'
import { utils, tt } from '../../common'
import store, { connect } from '../../Store'
import './index.less'
import { auth, user } from '../../logics'

import User from '../User'
import Welcome from '../Welcome'
import Account from '../Account'

interface Props {

}

interface State {
  userInfo: any
  folded: boolean
  menu: string
}

export default class Home extends React.Component<RouteComponentProps<Props>, State> {
  state: State = {
    folded: sessionStorage.getItem('folded') === 'true' || false,
    userInfo: {} as any,
    menu: ''
  }

  unsub: Unsubscribe

  componentWillMount() {
    this.unsub = connect(state => {
      this.setState({
        userInfo: state.auth.user,
        menu: state.params.menu
      })
    })
    this.getUserInfo()
  }

  componentDidMount() {
    utils.setTitle('首页')
  }

  componentWillUnmount() {
    this.unsub && this.unsub()
    this.setState = () => {
      return
    }
  }

  menuSelect(key: string) {
    if (key && location.hash !== `#/home/${key}`) {
      try {
        this.props.history.push('/home/' + key)
      } catch (error) { }
    }
  }

  async logout() {
    if (location.hash !== `#/login`) {
      try {
        auth.userLogout()
        this.props.history.push('/login')
      } catch (error) { }
    }
  }

  getUserInfo() {
    user.getUserInfo()
  }

  toggleFolded() {
    let value = !this.state.folded
    this.setState({
      folded: value
    })
    sessionStorage.setItem('folded', value + '')
  }

  render() {
    const url = this.props.match.url
    if (!this.state.userInfo || !this.state.userInfo.id) return null
    return (
      <div className="home-layout">
        <div className="home-header logo home-logo">
          <div className="home-title">后台</div>
          <div className="header-right">
            {
              this.state.userInfo && this.state.userInfo.nickName &&
              <span style={{ color: 'white' }}>{this.state.userInfo.nickName}</span>
            }
            <Button
              icon="home"
              onClick={() => {
                this.props.history.push('/home')
              }}
            >
              首页
            </Button>
            <Button
              type="danger"
              icon="logout"
              onClick={this.logout.bind(this)}
            >
              退出
            </Button>
          </div>
        </div>
        <div
          className={
            this.state.folded === true ? 'home-body folded' : 'home-body'
          }
        >
          <div className="home-side">
            <Menu
              mode="inline"
              onClick={data => {
                this.menuSelect(data.key)
              }}
              selectedKeys={this.state.menu ? [this.state.menu] : []}
              className="menu-wrap"
            >
              <Menu.Item key="user">
                <Icon type="cluster" theme="outlined" />
                用户管理
              </Menu.Item>
              <Menu.SubMenu
                key="system"
                title={
                  <span>
                    <Icon type="setting" theme="outlined" />
                    系统设置
                  </span>
                }
              >
                <Menu.Item key="account">我的账号</Menu.Item>
              </Menu.SubMenu>
            </Menu>
          </div>
          <div className="home-content">
            <Route path={`${url}/user`} exact component={User} />
            <Route path={`${url}/account`} exact component={Account} />
            <Route path={`${url}`} exact component={Welcome} />
          </div>
          <div className="side-bar">
            <div className="fold-btn" onClick={this.toggleFolded.bind(this)}>
              <div className="fold-bg" />
              <Icon type="menu-fold" className="fold-icon" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
