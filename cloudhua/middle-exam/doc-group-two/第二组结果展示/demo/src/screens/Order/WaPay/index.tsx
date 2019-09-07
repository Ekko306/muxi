import { Input, Layout, message, Affix } from 'antd'
import * as React from 'react'
import { RouteComponentProps,Route } from 'react-router'
import { Unsubscribe } from 'redux'
import { utils, tt ,toast} from '../../../common'
import { UserInfo, ItemInfo } from '../../../models'
import store, { connect } from '../../../Store'
import { updateMenu } from '../../../store/actions'
import { BreakItem2,BreakItem } from '../../../models'
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
    dataIndex: 'order',
    width: '31px',
    className: 'order'
    //render: (text: React.ReactNode) => <a href="javascript:;">{text}</a>,
  },
  {
    title: '拍中时间',
    align: 'center',
    //className: 'column-money',
    dataIndex: 'Time',
    width: '75px',
  },
  {
    title: '订单编号',
    align: 'center',
    dataIndex: 'numberOrder',
    width: '99px',
  },
  {
    title: '订单状态',
    align: 'center',
    dataIndex: 'state',
    width: '63px',
  },
  {
    title: '拍品图片',
    align: 'center',
    dataIndex: 'pic',
    width: '63px',
  },
  {
    title: '图录号',
    align: 'center',
    dataIndex: 'numberPic',
    width: '77px',
  },
  {
    title: '拍品名称',
    align: 'center',
    dataIndex: 'nameObj',
    width: '90px',
  },
  {
    title: '所属专场',
    align: 'center',
    dataIndex: 'class',
    width: '64px',
  },
  {
    title: '店铺名称',
    align: 'center',
    dataIndex: 'buy_auction.seller.name',
    width: '49px',
  },
  {
    title: '用户昵称',
    align: 'center',
    dataIndex: 'oName',
    width: '64px',
  },
  {
    title: '手机号',
    align: 'center',
    dataIndex: 'tel',
    width: '77px',
  },
  {
    title: '拍中时间',
    align: 'center',
    dataIndex: 'aucTime',
    width: '79px',
  },
  {
    title: '成交价单位(￥)',
    align: 'center',
    dataIndex: 'money',
    width: '70px',
  },
  {
    title: '服务费单位(￥)',
    align: 'center',
    dataIndex: 'serve-money',
    width: '70px',
  },
  {
    title: '保证金抵扣单位(￥)',
    align: 'center',
    dataIndex: 'prove-money',
    width: '70px',
  },
  {
    title: '买方结算单位(￥)',
    align: 'center',
    dataIndex: 'sell-mone',
    width: '70px',
  },
  {
    title: '违约时间',
    align: 'center',
    dataIndex: 'createTime',
    width: '77px',
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
  typewp:string
  order:BreakItem2[]
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
    typewp: 'NotPay',
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

  async getOrder() {
    try {
      let { typewp } = this.state
      let result = await Orderone.getOrderInfo(typewp)
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