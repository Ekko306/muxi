import { Input, Layout, message, Affix } from 'antd'
import * as React from 'react'
import { RouteComponentProps,Route } from 'react-router'
import { Unsubscribe } from 'redux'
import { utils, tt , toast} from '../../../common'
import { UserInfo, ItemInfo ,BreakItem2,BreakItem } from '../../../models'
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

// import {  Order1 } from '../../../services'
import { order } from '../../../logics'
import { type } from 'os';
import { types } from 'util';
import { Orderone } from "../../../services"


const columns: any[] = [
  {
    title: '序号',
    align: 'center',
    dataIndex: 'id',
    width: '31px',
    className: 'order'
    //render: (text: React.ReactNode) => <a href="javascript:;">{text}</a>,
  },
  {
    title: '违约时间',
    align: 'center',
    //className: 'column-money',
    dataIndex: 'pay_expired_time',
    width: '77px',
  },
  {
    title: '订单编号',
    align: 'center',
    dataIndex: 'number',
    width: '102px',
  },
  {
    title: '订单状态',
    align: 'center',
    dataIndex: 'order_status',
    width: '79px',
  },
  {
    title: '拍品图片',
    align: 'center',
    dataIndex: 'buy_auction.cover',
    width: '100px',
    render: (record: string) => 
            //   console.log("record的内容",record)
            <img src={record} /> 
  },
  {
    title: '图录号',
    align: 'center',
    dataIndex: 'src_market.serial_number',
    width: '79px',
  },
  {
    title: '拍品名称',
    align: 'center',
    dataIndex: 'buy_auction.name',
    width: '65px',
  },
  {
    title: '所属专场',
    align: 'center',
    dataIndex: 'src_market.name',
    width: '65px',
  },
  {
    title: '店铺名称',
    align: 'center',
    dataIndex: 'buy_auction.seller.name',
    width: '52px',
  },
  {
    title: '昵称',
    align: 'center',
    dataIndex: 'buyer.nickName',
    width: '52px',
  },
  {
    title: '手机号',
    align: 'center',
    dataIndex: 'buyer.phone',
    width: '79px',
  },
  {
    title: '拍中时间',
    align: 'center',
    dataIndex: 'ctime',
    width: '79px',
  },
  {
    title: '成交价单位(￥)',
    align: 'center',
    dataIndex: 'buy_auction.done_amount',
    width: '79px',
  },
  {
    title: '服务费单位(￥)',
    align: 'center',
    dataIndex: 'service_charge',
    width: '80px',
  },
  {
    title: '保证金抵扣单位(￥)',
    align: 'center',
    dataIndex: 'deposit_price',
    width: '80px',
  },
  {
    title: '买方结算单位(￥)',
    align: 'center',
    dataIndex: 'real_price',
    width: '80px',
  }
];

// const data: any[] = [

//   {
//     oAmount: '1',
//     createTime: 12

//   },
//   {
//     oAmount: '2',

//   },
//   {
//     oAmount: '3',

//   },
// ];




// [

//   {
//     oAmount: '1',
//     service_charge: `${this.state}`,
//   },
//   {
//     oAmount: '2',

//   },
//   {
//     oAmount: '3',

//   },
// ];

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
  order: BreakItem2[]
  orderId :number
  typeb :string
  BreakItems:BreakItem[]
}


// const data: any[] = [

//   {
//     oAmount: '1',
//     createTime: 12

//   },
//   {
//     oAmount: '2',

//   },
//   {
//     oAmount: '3',

//   },
// ];


export default class Order extends React.Component<RouteComponentProps<Props>, State> {
  state: State = {
    userInfo: null as UserInfo,
    loading: false,
    pageSize: 10,
    pageIndex: 1,
    items: [],
    total: 0,
    menu: '',
    order: [],
    orderId: 8,
    typeb : 'Breach',
    BreakItems: []
  }

  unsub: Unsubscribe

  async componentWillMount() {
   await this.getOrder()
   await console.log(this.state.order)
  }

  

  
  saveDataB() {
    // let BreakItems:BreakItem[] = [];
    // BreakItems.push({order_price:`${this.state.order[1].id}`,)
    // for (let i = 0; i <this.state.total; i++)
    // this.state.BreakItems[i].total_deposit=this.state.order[i].number
  }


  componentDidMount() {
    utils.setTitle('首页')
    store.dispatch(updateMenu('order'))
  }

  componentWillUnmount() {
    this.unsub && this.unsub()
    this.setState = () => {
      
    }
  }

  async getOrder() {
    try {
      let { typeb } = this.state
      let result = await Orderone.getOrderInfo(typeb)
      tt.check(result)
      this.setState({
          order: result.items,
          total: result.total
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
      // const data: BreakItem[] =this.state.BreakItems 
    return (
      <div className=".ant-layout-content">
        <br/>
        <Row>
        <Col span={24}>
          <div className="right-stand">
            <Button type="primary">导出表格</Button>
          </div>
        </Col>
        </Row>
        <br/>
        <Row>
          <Col span={24}>
            <Table columns={columns} dataSource={data} onChange={this.onChangeSort} bordered />
          </Col>
        </Row>
      </div>
    )
  }
}