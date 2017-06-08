import React, {Component} from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import {menuOpenChange,loadTopics,setNavBarTitle,setLoginModalVisible} from 'REDUX/action';
import {Drawer, List,WhiteSpace,Badge} from 'antd-mobile';
import {getTopicAndBg} from 'SYSTEM/tool'
class Menu extends Component {
    constructor(props) {
        super(props);
    }
    handleLoginModal() {
        const {dispatch,loginModal}=this.props;
        dispatch(setLoginModalVisible(!loginModal.visible))
    }
    onOpenChange() {
        let {dispatch}=this.props;
        dispatch(menuOpenChange());
    }
    _loadMoreData(tabName) {
        const {dispatch,topics} = this.props;
        this.onOpenChange();
        hashHistory.push('tab='+tabName);
        let title=getTopicAndBg(tabName).type;
        dispatch(setNavBarTitle(title));
        if(topics[tabName].page) return;
        dispatch(loadTopics(tabName,++topics[tabName].page));
    }
    render() {
        let {menu,loginModal,account}=this.props;
        let {avatar_url,loginname}=account.info;
        const bgStyle={
            backgroundColor:'rgb(247, 247, 247)'
        };
        const sidebar = (<List >
            <div className="logo">
                <img src="http://o4j806krb.qnssl.com/public/images/cnodejs_light.svg"/>
            </div>
            {loginModal.isLogin?<List.Item
                style={bgStyle}
                arrow="horizontal"
            >
                <div onClick={()=>{hashHistory.push(`user/${loginname}`)}}>
                    <span>
                        <img src={avatar_url} className="border_img"/>
                    </span>
                    <span className="vertical-md"><span className="dark">{loginname} </span></span>
                </div>
            </List.Item>:<List.Item onClick={()=>{this.handleLoginModal();this.onOpenChange();}} style={bgStyle}
            >登录</List.Item>}
            <List.Item onClick={()=>{this._loadMoreData('all')}} style={bgStyle}
            >全部</List.Item>
            <List.Item onClick={()=>{this._loadMoreData('good')}} style={bgStyle}
            >精华</List.Item>
            <List.Item onClick={()=>{this._loadMoreData('share')}} style={bgStyle}
            >分享</List.Item>
            <List.Item onClick={()=>{this._loadMoreData('ask')}} style={bgStyle}
            >问答</List.Item>
            <List.Item onClick={()=>{this._loadMoreData('job')}} style={bgStyle}
            >招聘</List.Item>
            <WhiteSpace style={{backgroundColor:'#ececed'}} />
            {loginModal.isLogin?<div>
                <List.Item onClick={()=>{this.onOpenChange();hashHistory.push(`user/collections/${loginname}`)}} style={bgStyle}
                >收藏</List.Item>
                <List.Item onClick={()=>{this.onOpenChange();hashHistory.push(`my/messages`)}} style={bgStyle}
                >
                    消息
                    <Badge text={account.mesCount} style={{ marginLeft: 12 }} />
                </List.Item>
            </div>:''}
            <List.Item onClick={()=>{this.onOpenChange();hashHistory.push('about')}} style={bgStyle}
            >关于</List.Item>
        </List>);
        const drawerProps = {
            open: menu.open,
            position: 'left',
            onOpenChange: this.onOpenChange.bind(this)
        };
        return (
            <Drawer sidebar={sidebar}
                    overlayStyle={{position:'fixed'}}
                    sidebarStyle={Object.assign({},bgStyle,{position:'fixed',paddingTop:'0.87rem',width:'4.5rem'})}
                {...drawerProps}
            >{''}
            </Drawer>
        )

    }
}
export default connect(state=>({
    menu: state.menu,
    account:state.account,
    topics: state.topics,
    loginModal:state.loginModal
}))(Menu)