import { Input, Layout, message, Affix } from 'antd'
import * as React from 'react'
import { RouteComponentProps, Route } from 'react-router'
import { Unsubscribe } from 'redux'
import { utils, tt, toast } from '../../../common'
import { UserInfo, ItemInfo, BreakItem2, } from '../../../models'
import store, { connect } from '../../../Store'
import { updateMenu } from '../../../store/actions'
import './index.less'
import { Menu, Icon } from 'antd';
import { Row, Col } from 'antd';//三段式布局
import { DatePicker } from 'antd';//时间选择
import moment, { isMoment } from 'moment';
import { Select } from 'antd';//select选择器
import { Button } from 'antd';//导出按钮选择
import { Table } from 'antd';//导出按钮选择
import { Empty } from 'antd';//空状态设置
import { Orderone } from "../../../services"

const columns: any[] = [
  {
    title: '序号',
    align: 'center',
    dataIndex: 'id',
    width: '46px',
    className: 'order'
    //render: (text: React.ReactNode) => <a href="javascript:;">{text}</a>,
  },
  {
    title: '支付时间',
    align: 'center',
    //className: 'column-money',
    dataIndex: 'pay_time',
    width: '103px',
  },
  {
    title: '订单编号',
    align: 'center',
    dataIndex: 'number',
    width: '87px',
  },
  {
    title: '订单状态',
    align: 'center',
    dataIndex: 'order_status',
    width: '103px',
  },
  {
    title: '拍品图片',
    align: 'center',
    dataIndex: 'buy_auction.cover',
    width: '97px',
    render: (record: string) => 
            //   console.log("record的内容",record)
            <img src={record} /> 
  },
  {
    title: '图录号',
    align: 'center',
    dataIndex: 'src_market.serial_number',
    width: '87px',
  },
  {
    title: '拍品名称',
    align: 'center',
    dataIndex: 'buy_auction.name',
    width: '88px',
  },
  {
    title: '所属专场',
    align: 'center',
    dataIndex: 'src_market.name',
    width: '88px',
  },
  {
    title: '店铺名称',
    align: 'center',
    dataIndex: 'buy_auction.seller.name',
    width: '88px',
  },
  {
    title: '收货人',
    align: 'center',
    dataIndex: 'address.contacts',
    width: '88px',
  },
  {
    title: '用户手机号',
    align: 'center',
    dataIndex: 'buyer.phone',
    width: '108px',
  },
  {
    title: '收货人手机号',
    align: 'center',
    dataIndex: 'address.phone',
    width: '108px',
  },
  {
    title: '收获地址',
    align: 'center',
    dataIndex: 'address.location',
    width: '88px',
  }

];


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
  typews: string
  order: BreakItem2[]

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
    typews: 'Received',
    order: []
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

  async getOrder() {
    try {
      let { typews } = this.state
      let result = await Orderone.getOrderInfo(typews)
      tt.check(result)
      this.setState({
        order: result.items,
        total: result.total
      })
    } catch (error) {
      toast.catchError(error)
    }
  }

  onChangeTime(value: any, dateString: any) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }

  onOk(value: any) {
    console.log('onOk: ', value);
  }

  onChangeSelect(value: any) {
    console.log(`selected ${value}`);
  }

  onChangeSort(pagination: any, sorter: any) {
    console.log('params', pagination, sorter);
  }

  onBlur() {
    console.log('blur');
  }

  onFocus() {
    console.log('focus');
  }

  onSearch(val: any) {
    console.log('search:', val);
  }

  render() {
    const data: any[] = this.state.order
    // for (let i = 0 ;i< this.state.total;i++){
    //   data[i].push({
    //     SerialNumber: i+1
    //   })
    // }
    return (
      <div className=".ant-layout-content">
        <br />
        <Row>
          <Col span={24}>
            <div className="right-stand">
              <Button type="primary">导出表格</Button>
            </div>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <Table columns={columns} dataSource={data} onChange={this.onChangeSort} bordered />
          </Col>
        </Row>
      </div>
    )
  }
}