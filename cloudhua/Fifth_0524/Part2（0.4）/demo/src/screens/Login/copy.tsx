import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Input, Form, Icon, Button, Modal, message, Timeline, Avatar } from 'antd'

import './index.less'
import { Auth } from '../../services'
import { user } from '../../logics'
import { tt, toast } from '../../common'
import {
  Layout, Menu, Breadcrumb,
} from 'antd';
import { formatDateTime } from '../../common/utils';
import { supportsGoWithoutReloadUsingHash } from 'history/DOMUtils';

const { SubMenu } = Menu;
const {
  Header, Content, Footer, Sider,
} = Layout;
interface Props {

}

interface State {
  name: string
  pwd: string
  loading: boolean
}

export default class Login extends React.Component<RouteComponentProps<Props>, State> {

  state: State = {
    name: '',
    pwd: '',
    loading: false
  }

  get disabled() {
    return (
      this.state.name === '' ||
      this.state.pwd === '' ||
      this.state.loading === true
    )
  }

  get loginText() {
    if (this.state.loading === true) return '正在登录'
    return '登录'
  }

  async getUserInfo() {
    try {
      let result = await user.getUserInfo()
      tt.check(result)
      this.props.history.push('/home')
      message.success('登录成功')
    } catch (error) {
      toast.catchError(error)
    }
  }

  async login() {
    try {
      let { name, pwd } = this.state
      tt.verify(!!name, "nameError", 'name 不为空');
      let result = await Auth.login(name, pwd)
      tt.check(result)
      this.props.history.push('/home')
      message.success('登录成功')
    } catch (error) {
      if (error.stat === "nameError") {
        /////
      }
      toast.catchError(error)
    }
  }

  componentWillMount() {
    this.getUserInfo()
  }


  Welcome(Props: any) {
    return <h1>Hello, {Props.name}</h1>
  }

  Comment(props: any) {
    return (
      <div>
        <div className="Comment">
          <div className="Userinfo">
            <img className="Avatar"
              src={props.author.avatarUrl}
              alt={props.author.name} />
            <div className="UserInfo-name">
              {props.author.name}
            </div>
          </div>
        </div>
        <div className="Comment-text">
          {props.text}
        </div>
        <div className="Comment-date">
          {}
        </div>
      </div>
    )
  }

  Bars(props: any) {
    return (
      <div className='tool-tags'>
        {props.tags.map((words: string) => {
          return (
            <div>
              <a className="one-tag">
                {words}
              </a>
            </div>
          )
        })}
      </div>
    )
  }

  Blcoks(props: any) {
    return (
      <div>
        <div className="proportion-50 has-right-border">
          <div className="tool-inner">
            <a className="app-icon">
              <img src={props.tags.src} />
            </a>
            <div className="tool-info">
              <h3 className="app-name">
                <a className="app-namelink">{props.tags.name}</a>
              </h3>
              <div className="app-desc">
                <span>{props.tags.explains}</span>
              </div>
              <div className='tool-tags'>
                {props.tags.tags && props.tags.tags.map((word:string) => {
                  return (
                    <div>
                      <a className="one-tag">
                        {word}
                      </a>
                    </div>
                  )
                })}
              </div>
            </div>

          </div></div></div>)
  }



  render() {
    const comment = {
      date: new Date(),
      text: 'I hope you enjoy learning React!',
      author: {
        name: 'Hello Kitty',
        avatarUrl: 'https://placekitten.com/g/64/64',
      },
    };
    const words = {
      words: 'Hello World!',
      word: 'Hello!'
    }
    const tags1 = 
      { src: "https://www.cmcm.com/includes/assets/91d06f7ef0157c20234060ddde086888.png" ,
       name: "Security Master" ,
       explains: "World's leading mobile security app featuring intelligent threat detection, the world's highest rated antivirus system, app lock and intruder selfies. Its industry leading 'cloud + AI' deep cleaning system removes 30% more junk than other apps." ,
       tags: ["1.1 billion downloads globally"] }
       const tags2 = 
      { src: "https://www.cmcm.com/includes/assets/2563aed5a2150e38134ff24aaffebb75.png" ,
       name: "CM Launcher" ,
       explains: "The world's most popular smartphone personalization app for Android, CM Launcher offers a large number of themes, in-depth customization options and smart lock-screen functionality, providing comprehensive protection for privacy and safety." ,
       tags: ["300 mln total downloads"] }
    
    return (
      <div>
        {/* <this.Comment
          date={comment.date}
          text={comment.text}
          author={comment.author} /> */}
        {/* <this.Blcoks tags = {tags1} />
        <this.Blcoks tags = {tags2} /> */}
        <div className="top">
    <div className="container">
      <div className="top-logo">
     </div>
      <ul className="top-holder style" >
        <li className="top-blocks style">
          <a className="top-blocks-a">
          Spider-Man
          </a>
        </li>
        <li className="top-blocks style">
          <a className="top-blocks-a">
          Iron Man
         </a>
        </li>
    
        <li className="top-blocks style">
          <a className="top-blocks-a">
          Caption America
          </a>
        </li>
        
        <li className="top-blocks style">
          <a className="top-blocks-a">
          Hulk
          </a>
        </li>
      
        <li className="top-blocks style">
          <a className="top-blocks-a">
          Wolverine
          </a>
        </li>
        
        <li className="top-blocks style">
          <a className="top-blocks-a">
          Deadpool
         </a>
        </li>
        <li className="top-blocks style">
         <a className="top-blocks-a">
            简 | 繁 | EN
        </a>
          </li>
        </ul>
    </div>
  </div>
  

    <div className="billboard">
      <div className="linesblocks">
      <a>此处输入大型文字与动态图片/视屏（后面学习）</a>
      </div>
    </div>
  
    <div className="block1">
      <div className="spanblocks"></div>
      <div className="head1">
        <h3 className="lines1">
          <span>
            "Cheetah Mobile-invested artificial intelligence company OrionStar possesses completely self-developed,"
          </span>
          <br/>
          <span>
            "industry-leading technology, including far-field voice interaction, image recognition and visual navigation systems."
          </span>
        </h3>
      </div>
      <div className="head1-block">
        <a>(上方文字AI大写后期学习)此处作为容器插入图片和文字 </a>
      </div>
    </div>
  
    <div className="block2">
      <div className="spanblocks"></div>
      <div className="head2">
        <h3 className="lines1">
          <span>
            "As the #1 developer in Google Play's tool app category, Cheetah Mobile offers"
          </span>
          <br/>
          <span>
            "the world's leading security, cleaning, personalization and safe browser software."
          </span>
        </h3>
      </div>
      <div className="head2-block1">
        <a>(上方文字大写Utility后期学习）此处为容器1</a>
      </div>
      <div className="head2-block2">
        <a>此处为容器2</a>
      </div>
      <div className="head2-block3">
        <a>此处为容器3</a>
      </div>
      <div className="head2-block4">
        <a>此处为容器4</a>
      </div>
      <div className="head2-block5">
        <a>此处为容器5</a>
      </div>
      <div className="head2-block6">
        <a>此处为容器6</a>
      </div>
    </div>
    
    <div className="block3">
      <div className="spanblocks31"></div>
      <div className="head3">
        <h3 className="lines3">
          <span>
            "With combined MAUs surpassing 1 billion globally"
          </span>
          <br/>
          <span>
            "Cheetah Games is one of the largest casual game developers in the world"
          </span>
        </h3>
      </div>
      <div className="spanblocks32"></div>
      <div className="head3-block1">
        <a>(上方文字大写Games后期学习)此处为容器1</a>
      </div>
      <div className="head3-block2">
        <a>此处为容器2</a>
      </div>
    </div>

    <div className="blocks4">
      <div className="blocks4-system">
        <a>此处为而外联系功能实现容器，含有文字竖直排版与超链接</a>
      </div>
    </div>
      </div>
      
    )
  }
}




