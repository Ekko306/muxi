import { Input, Layout, message, Affix, Row, Col, DatePicker, Select, Table, Button } from 'antd'
import * as React from 'react'
import { RouteComponentProps, Route } from 'react-router'
import { Unsubscribe } from 'redux'
import { utils, tt, toast } from '../../../common'
import { UserInfo, ItemInfo } from '../../../models'
import store, { connect } from '../../../Store'
import { updateMenu } from '../../../store/actions'
import './index.less'
import { Menu, Icon } from 'antd';
import moment from 'moment';
import { BreakItem2, BreakItem } from '../../../models'
import { Orderone } from "../../../services"
import { OrderResponse,OrderRequest } from '../../../models'

interface Props {

}

interface State {
  userInfo: UserInfo
  loading: Boolean
  pageSize: number
  pageIndex: number
  items: ItemInfo[]
  total: number
  menu: string
  typea: string
  order: BreakItem2[]
  a: number[]
  data: OrderRequest
}

export default class Order extends React.Component<RouteComponentProps<Props>, State> {
  state: State = {
    userInfo: null as UserInfo,
    loading: false,
    pageSize: 10,
    pageIndex: 1,
    items: [],
    total: 0,
    menu: '',
    typea: 'All',
    order: [],
    a: [],
    data: {type:'All',start_time: -1,end_time: -1,order_status: -1,orderNumberKeyword: null,auctionKeyword: null,userKeyword: null}
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
    this.getOrder()
  }

  componentWillUnmount() {
    this.unsub && this.unsub()
    this.setState = () => {
      return
    }
  }

  handleChange(value: string) {
    console.log(`你selected ${value}`)
    this.setState({
      typea: value,
      total: 1,
      data: {type : value}
    }, () => {
      // console.log(`你好${this.state.typea}`)
      this.getOrder()
    })
  }

  handleChangeCus(value:string) {
    console.log(`店铺名称： ${value}`)
    this.setState({
      data: {type: 'All',userKeyword : value},
    }, () => {
      // console.log(`你好${this.state.typea}`)
      this.getOrder()
    })
  }
  handleChangeOrd(value:string) {
    console.log(`订单号： ${value}`)
    this.setState({
      data: {type: 'All',orderNumberKeyword : value},
    }, () => {
      // console.log(`你好${this.state.typea}`)
      this.getOrder()
    })
  }

  handleChangeObj(value:string) {
    console.log(`订单号： ${value}`)
    this.setState({
      data: {type: 'All',auctionKeyword : value},
    }, () => {
      // console.log(`你好${this.state.typea}`)
      this.getOrder()
    })
  }

  handleChangeMar(value:string) {
    console.log(`订单号： ${value}`)
    this.setState({
      data: {type: 'All',marketKeyword : value},
    }, () => {
      // console.log(`你好${this.state.typea}`)
      this.getOrder()
    })
  }

  async getOrder() {
    try {
      let { data } = this.state
      let result = await Orderone.getOrderInfo(data)
      tt.check(result)
      this.setState({
        order: result.items,
        total: result.total
      })
    } catch (error) {
      toast.catchError(error)
    }
  }

  // test() {
  //   let { order } = this.state
  //   let a = order.map(elem => {
  //     return elem.id
  //   })
  //   console.log(a)
  //   this.setState({
  //     a
  //   })
  // }

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
    const url = this.props.match.url
    const SubMenu = Menu.SubMenu;
    const MenuItemGroup = Menu.ItemGroup;
    const Search = Input.Search;
    const dateFormat = 'YYYY/MM/DD HH:mm:ss';
    const { Option } = Select;
    const data: any[] = this.state.order


    const columns: any[] = [
      {
        title: '序号',
        dataIndex: 'id',

      },
      {
        title: '下单时间',
        dataIndex: 'buy_auction.ctime',
      },
      {
        title: '订单编号',
        dataIndex: 'number',
      },
      {
        title: '订单状态',
        dataIndex: 'order_status',
      },
      {
        title: '拍品图片',
        dataIndex: 'buy_auction.cover',
        render: (record: string) =>
          //   console.log("record的内容",record)
          <img src={'http://auction.taoke93.com' +record} width="100px" height="100px" />
      },
      {
        title: '图录号',
        dataIndex: 'src_market.serial_number',
      },
      {
        title: '拍品名称',
        dataIndex: 'buy_auction.name',
      },
      {
        title: '所属专场',
        dataIndex: 'src_market.name',
      },
      {
        title: '专场编号',
        dataIndex: 'src_market.id',
      },
      {
        title: '店铺名称',
        dataIndex: 'buy_auction.seller.name',
      },
      {
        title: '用户昵称',
        dataIndex: 'buyer.nickName',
      },
      {
        title: '手机号',
        dataIndex: 'buyer.phone',
      },
      {
        title: '成交价单位（￥）',
        dataIndex: 'buy_auction.done_amount',
      },
      {
        title: '服务费单位（￥）',
        dataIndex: 'service_charge',
      },
      {
        title: '调价金额单位（￥）',
        dataIndex: 'order_price',
      },
      {
        title: '保证金抵扣单位（￥）',
        dataIndex: 'deposit_price',
      },
      {
        title: '订单结算单位（￥）',
        dataIndex: 'buyer_price',
      },
      {
        title: '买方结算单位（￥）',
        dataIndex: 'real_price',
      }
    ];
    return (
      <div className="home-content" style={{ marginTop: '10px' }}>
        <div className="gutter-example">
          <Row gutter={10}>
            <Col className="gutter-row" span={12}>
              <div className="gutter-box">
                下单时间：
                <DatePicker showTime defaultValue={moment('2015/01/01 00:00:00', dateFormat)} format={dateFormat} />
                <span>&nbsp;&nbsp;至&nbsp;&nbsp;</span>
                <DatePicker showTime defaultValue={moment('2019/05/28 16:23:38', dateFormat)} format={dateFormat} />
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="gutter-box">
                订单状态：
                <Select defaultValue="All" style={{ width: 120 }} onChange={this.handleChange.bind(this)}>
                  <Option value="All">全部</Option>
                  <Option value="NotPay">待支付</Option>
                  <Option value="Received">
                    代发货
                  </Option>
                  <Option value="Breach">已违约</Option>
                </Select>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="gutter-box">
                店铺名称：
                <Search placeholder="请输入店铺名称" style={{ width: 200 }} onSearch={value => console.log(value)} />
              </div>
            </Col>

          </Row>
        </div>
        <div className="gutter-example">
          <Row gutter={16}>
            <Col className="gutter-row" span={6}>
              <div className="gutter-box">
                订单搜索：
                <Search placeholder="请输入订单编号" style={{ width: 200 }} onSearch={this.handleChangeOrd.bind(this)} />
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="gutter-box">
                拍品搜索：
                <Search placeholder="请输入图录号、拍品号" style={{ width: 200 }} onSearch={this.handleChangeObj.bind(this)} />
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="gutter-box">
                客户搜索：
                <Search placeholder="请输入昵称、手机号" style={{ width: 200 }} onSearch={this.handleChangeCus.bind(this)} />
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="gutter-box">
                专场搜索：
                <Search placeholder="请输入专场号、名单号" style={{ width: 200 }} onSearch={this.handleChangeMar.bind(this)} />
              </div>
            </Col>
          </Row>
        </div>
        <div className="ant-row-flex ant-row-flex-end ant-row-private-margin" style={{ marginLeft: '10px', marginRight: '10px', marginBottom: '10px', marginTop: '5px' }}>
          <div style={{ paddingLeft: '8px', paddingRight: '8px' }}>
            <Button type="primary"  >导出</Button>
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          bordered
        />

      </div>
    )
  }
}
