import { Input, Layout, message, Affix } from 'antd'
import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Unsubscribe } from 'redux'
import { utils, tt } from '../../common'
import { UserInfo, ItemInfo } from '../../models'
import store, { connect } from '../../Store'
import { updateMenu } from '../../store/actions'
import './index.less'

interface Props {

}

interface State {
  userInfo: UserInfo
  loading: Boolean
  pageSize: number
  pageIndex: number
  items: ItemInfo[]
  total: number
}

export default class Market extends React.Component<RouteComponentProps<Props>, State> {
  state: State = {
    userInfo: null as UserInfo,
    loading: false,
    pageSize: 10,
    pageIndex: 1,
    items: [],
    total: 0
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
    store.dispatch(updateMenu('market'))
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

  render() {
    let { } = this.state
    return (
      <div className="market-page">
        market-page
      </div>
    )
  }
}