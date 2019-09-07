
import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Unsubscribe } from 'redux'
import { utils, tt, toast } from '../../common'
import { UserInfo, ItemInfo, ListItem } from '../../models'
import store, { connect } from '../../Store'
import { updateMenu } from '../../store/actions'
import './index.less'
import { Layout, Menu, Icon, List as list } from 'antd';
import './index.less'
import { Auth, User, List } from '../../services'
import { user } from '../../logics'
import { number } from 'prop-types';

const { Header, Content, Footer, Sider } = Layout;
import { Row, Col } from 'antd'

interface Props {

}

interface State {
  list: ListItem[]
  total: string
  phone: string
}

export default class extends React.Component<RouteComponentProps<Props>, State> {
  state: State = {
    list: [],
    total: '',
    phone: ''
  }

  unsub: Unsubscribe

  async componentWillMount() {
    this.unsub = connect(state => {
      this.setState({
      })
    })
    await this.getUserInfo()
    await this.getList()
  }

  componentDidMount() {
    utils.setTitle('首页')
    store.dispatch(updateMenu('user'))
  }

  componentWillUnmount() {
    this.unsub && this.unsub()
    this.setState = () => {
      return
    }
  }

  async getList() {
    try {
      let { phone } = this.state
      let result = await List.getList(phone)
      tt.check(result)
      this.setState({
        list: result.data.list,
        total: result.data.total
      })
    } catch (error) {
      toast.catchError(error)
    }
  }

  async getUserInfo() {
    try {
      let result = await User.getUserInfo()
      tt.check(result)
      this.setState({
        phone: result.data.user.phone
      })
    } catch (error) {
      toast.catchError(error)
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
    let { list } = this.state
    return (
      <div className="user-page">5月19日学生签到信息：
      <Row>
          <Col span={8} >
            <div className='colColorS'>学生姓名</div></Col>
          <Col span={8} >
            <div className='colColorS'>学生性别</div></Col>
          <Col span={8} >
            <div className='colColorS'>学生电话</div></Col>
        </Row>
        {
          list && list.map((item, index) => {
            return (
              // <div>
              //   <div>学生姓名</div>
              <Row >
                <Col span={8} key={`${index}`}>
                  <div className='colColorP'>
                    {
                      item.name
                    }
                  </div>
                </Col>
                <Col span={8} >
                  <div className='colColorB'>
                    {
                      item.sex
                    }
                  </div>
                </Col>
                <Col span={8} >
                  <div className='colColorP'>
                    {
                      item.tel
                    }
                  </div>
                </Col>
              </Row>
            )
          })
        }
      </div>
    )
  }
}
