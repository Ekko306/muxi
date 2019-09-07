import { Input, Layout, message, Affix } from 'antd'
import * as React from 'react'
import { RouteComponentProps,Route } from 'react-router'
import { Unsubscribe } from 'redux'
import { utils, tt } from '../../common'
import { UserInfo, ItemInfo } from '../../models'
import store, { connect } from '../../Store'
import { updateMenu } from '../../store/actions'
import './index.less'
import { Menu, Icon } from 'antd';

import All from './All'
import WaSend from './WaSend'
import WaPay from './WaPay'
import Break from './Break'
interface Props {

}

interface State {
  userInfo: UserInfo
  loading: Boolean
  pageSize: number
  pageIndex: number
  items: ItemInfo[]
  total: number
  menu1: string
}

export default class Order extends React.Component<RouteComponentProps<Props>, State> {
  state: State = {
    userInfo: null as UserInfo,
    loading: false,
    pageSize: 10,
    pageIndex: 1,
    items: [],
    total: 0,
    menu1: ''
  }

  unsub: Unsubscribe

  componentWillMount() {
    this.unsub = connect(state => {
      this.setState({
        userInfo: state.auth.user
      })
    })
    this.search(1)
  }

  componentDidMount() {
    utils.setTitle('首页')
    store.dispatch(updateMenu('order'))
  }

  componentWillUnmount() {
    this.unsub && this.unsub()
    this.setState = () => {
      return
    }
  }

  async search(pageIndex: number) {
    // try {
    //   let { value, pageSize, items, loading } = this.state

    //   if (loading) {
    //     return
    //   }

    //   this.setState({
    //     loading: true
    //   })

    //   var closeLoading = message.loading('数据加载中', 0)

    //   let result = await example.search({
    //     keyword: value,
    //     pageSize: pageSize,
    //     pageIndex: pageIndex
    //   })

    //   tt.check(result.stat)
    //   closeLoading && closeLoading()

    //   this.setState({
    //     items: result.items,
    //     pageIndex,
    //     loading: false,
    //     total: result.total
    //   })

    // } catch (error) {
    //   closeLoading && closeLoading()
    //   this.setState({
    //     loading: false
    //   })
    //   tt.catchError("search", error)
    // }
  }
  menuSelect(key: string) {
    
    if (key && location.hash !== `#/home/order/${key}`) {
      try {
        this.props.history.push('/home/order/' + key)
      } catch (error) { }
    }
  }

  render() {
    const url = this.props.match.url
    const SubMenu = Menu.SubMenu;
    const MenuItemGroup = Menu.ItemGroup;
    return (
      <div>
        <div className="ant-row-flex top style1">
          <div className="style2">"订单数：0"</div>
        </div>
      <Menu mode="horizontal"
               onClick={data => {
                this.menuSelect(data.key)
              }}
              selectedKeys={this.state.menu1 ? [this.state.menu1] : []}
              >
        <Menu.Item key="all" >
          <Icon type="smile" />
          全部
        </Menu.Item>
        <Menu.Item key="waPay">
          <Icon type="star" />
          待支付
        </Menu.Item>
        <Menu.Item key="waSend">
          <Icon type="shopping-cart" />
          待发货
        </Menu.Item>
        <Menu.Item key="break">
          <Icon type="solution" />
          已违约
        </Menu.Item>
      </Menu>
      <div className="allOrder-style ant-layout">
        <div className="home-content">
        <Route path={`${url}/all`} exact component={All} />
        <Route path={`${url}/waPay`} exact component={WaPay} />
        <Route path={`${url}/waSend`} exact component={WaSend} />
        <Route path={`${url}/break`} exact component={Break} />
        <Route path={`${url}`} exact component={All} />
        </div>
      </div>
      </div>
    )
  }
}