import { Input, Layout, message, Affix } from 'antd'
import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Unsubscribe } from 'redux'
import { utils, tt } from '../../common'
import { UserInfo, ItemInfo } from '../../models'
import store, { connect } from '../../Store'
import { updateMenu } from '../../store/actions'
import './index.less'
import { Z_BLOCK } from 'zlib';

import { Row, Col } from 'antd';//三段式布局
import { DatePicker } from 'antd';//时间选择
import moment, { isMoment } from 'moment';
import { Select } from 'antd';//select选择器
import { Button } from 'antd';//导出按钮选择
import { Table } from 'antd';//导出按钮选择
import { Empty } from 'antd';//空状态设置

const Search = Input.Search;//用户输入框中需要
const { Option } = Select;//选择器中需要

const dateFormat = 'YYYY/MM/DD hh:mm:ss';
const monthFormat = 'YYYY/MM';

const columns: any[]  = [
  {
    title: '序号',
    align:'center',
    dataIndex: 'order',
    width:'6.25%',
    className: 'order'
    //render: (text: React.ReactNode) => <a href="javascript:;">{text}</a>,
  },
  {
    title: '注册时间',
    align:'center',
    //className: 'column-money',
    dataIndex: 'createTime',
    width:'6.25%',
  },
  {
    title: '手机号',
    align:'center',
    dataIndex: 'tel',
    width:'6.25%',
  },
  {
    title: '头像图',
    align:'center',
    dataIndex: 'image',
    width:'6.25%',
  },
  {
    title: '昵称',
    align:'center',
    dataIndex: 'oName',
    width:'6.25%',
  },
  {
    title: '用户权限',
    align:'center',
    dataIndex: 'userRight',
    width:'6.25%',
  },
  {
    title: '微信号',
    align:'center',
    dataIndex: 'wx',
    width:'6.25%',
  },
  {
    title: '性别',
    align:'center',
    dataIndex: 'sex',
    width:'6.25%',
  },
  {
    title: '生日',
    align:'center',
    dataIndex: 'birth',
    width:'6.25%',
  },
  {
    title: '保证金余额(单位:￥)',
    align:'center',
    dataIndex: 'money',
    sorter: (a:any, b:any) => a.money - b.money,
    sortDirections: ['descend', 'ascend'],
    width:'6.25%',
    className: 'order'
  },
  {
    title: '订单数量',
    align:'center',
    dataIndex: 'oAmount',
    sorter: (a:any, b:any) => a.oAmount - b.oAmount,
    sortDirections: ['descend', 'ascend'],
    width:'6.25%',
    
  },
  {
    title: '收藏数量',
    align:'center',
    dataIndex: 'cAmount',
    sorter: (a:any, b:any) => a.cAmount - b.cAmount,
    sortDirections: ['descend', 'ascend'],
    width:'6.25%',
  },
  {
    title: '付款总额(单位￥)',
    align:'center',
    dataIndex: 'pAmount',
    sorter: (a:any, b:any) => a.pAmount - b.pAmount,
    sortDirections: ['descend', 'ascend'],
    width:'6.25%',
  },
  {
    title: '客服状态',
    align:'center',
    dataIndex: 'state',
    width:'6.25%',
  },
  {
    title: '客服',
    align:'center',
    dataIndex: 'kName',
    width:'6.25%',
  },
  {
    title: '备注',
    align:'center',
    dataIndex: 'note',
    width:'6.25%',
  }
  
];

const data: any[] = [

  // {
  //   oAmount: '1',
   
  // },
  // {
  //   oAmount: '2',
    
  // },
  // {
  //   oAmount: '3',
    
  // },
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
}

export default class User extends React.Component<RouteComponentProps<Props>, State> {
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
    store.dispatch(updateMenu('user'))
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

   onChangeTime(value: any, dateString: any) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }
  
   onOk(value:any) {
    console.log('onOk: ', value);
  }

  onChangeSelect(value:any) {
    console.log(`selected ${value}`);
  }

  onChangeSort(pagination:any, sorter:any) {
    console.log('params', pagination,sorter);
  }
  
   onBlur() {
    console.log('blur');
  }
  
   onFocus() {
    console.log('focus');
  }
  
   onSearch(val:any) {
    console.log('search:', val);
  }
  

  

  render() {
    return (
      <div className="user-page">

      <Row>
        <Col span={24}>
          用户总数：0
          <hr/>
        </Col>
      </Row>

      <br/>
      
      <Row>
        <Col span={12}>
          注册时间：<DatePicker showTime defaultValue={moment('2019/05/01 00:00:00', dateFormat)} format={dateFormat}  onChange={this.onChangeTime} onOk={this.onOk} />
            &nbsp;&nbsp; 至 &nbsp;&nbsp;  <DatePicker showTime defaultValue={moment()} format={dateFormat} onChange={this.onChangeTime} onOk={this.onOk} />
          <br />
        </Col>
        <Col span={12}>
          用户搜索：<Search 
            placeholder="请输入昵称、微信号、手机号" 
            style={{ width: 200 }}
            size="default"
            onSearch={value => console.log(value)} enterButton 
            />
        </Col>
      </Row>
      <br/>

      <Row>

        <Col span={6}>
          客服状态：
          <Select
            showSearch
            style={{ width: 200 }}
            size="default"
            //placeholder="全部"
            defaultValue="全部"
            optionFilterProp="children"
            onChange={this.onChangeSelect}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onSearch={this.onSearch}
            // filterOption={(input, option) =>
            //   option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            // }
          >
            <Option value="全部">全部</Option>
            <Option value="未发送邀请">未发送邀请</Option>
            <Option value="未搜到">未搜到</Option>
            <Option value="已发送邀请">已发送邀请</Option>
            <Option value="已接受邀请">已接受邀请</Option>
          </Select>
        </Col>

        <Col span={6}>
          客服：
          <Select
            showSearch
            style={{ width: 200 }}
            size="default"
            //placeholder="全部"
            defaultValue="全部"
            optionFilterProp="children"
            onChange={this.onChangeSelect}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onSearch={this.onSearch}
            // filterOption={(input, option) =>
            //   option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            // }
          >
            <Option value="全部">全部</Option>
            <Option value="茗探客服三">茗探客服三</Option>
            <Option value="茗探客服一">茗探客服一</Option>
            </Select>
        </Col>

        <Col span={6}>
          用户权限：
          <Select
            showSearch
            style={{ width: 200 }}
            size="default"
            //placeholder="全部"
            defaultValue="全部"
            optionFilterProp="children"
            onChange={this.onChangeSelect}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onSearch={this.onSearch}
            // filterOption={(input, option) =>
            //   option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            // }
          >
            <Option value="全部">全部</Option>
            <Option value="普通用户">普通用户</Option>
            <Option value="商家">商家</Option>
            </Select>
        </Col>

        <Col span={6}>
        <div className="right-stand">
          <Button type="primary">导出</Button>
         </div>
        </Col>

      </Row>
      <br/>

      <Row>
        <Col span={24}>
          <Table columns={columns} dataSource={data} onChange={this.onChangeSort} bordered/>
        </Col>
      </Row>


    </div> 
     

    )
  }
}
