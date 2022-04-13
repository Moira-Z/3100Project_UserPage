import React from 'react';
import {Route, Link, Routes, useNavigate, useState} from "react-router-dom";
import './index.less';
import {Avatar, Button, Layout, Menu} from "antd";
import {ClusterOutlined, DatabaseOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons";
import MindForest from "../MindForest";
import MyRoom from "../MyRoom";
import Setting from "../Setting";
const {Content, Footer, Sider} = Layout;


export default class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            selected: "1",
            name: "username",
            id: "123",
            avatar: "",
            info: [{
                id: "111111",
                username: "Moira",
                password: "123456",
                email: "1155141582@link.cuhk.edu.hk",
                avatar: "https://joeschmoe.io/api/v1/random",
            }],
        }
    }

    //get user info
    componentDidMount() {
        fetch("http://localhost:8080/setting")
            .then(res=>res.json())
            .then(
                (result)=>{
                    this.setState({info:result})
                    this.setState({name: this.state.info[0]["username"]});
                    this.setState({id: this.state.info[0]["id"]});
                    this.setState({avatar: this.state.info[0]["avatar"]});
                },
                (error)=>{
                    console.log("Fetch failed")
                }
            )
        this.setState({name: this.state.info[0]["username"]});
        this.setState({id: this.state.info[0]["id"]});
        this.setState({avatar: this.state.info[0]["avatar"]});
    }

    // create new room
    onClick = (id) => {
        fetch("http://localhost:8080/newroom", {
            method: 'post',
            header: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: id,
            })
            }).then(function (res){
            window.location.replace("/canvas")
            console.log("Should change")
        });
    }

    select(){
        let path = window.location.pathname;
        console.log(path);
        if (path === "/main/*")
            return "1";
        if (path === "/main/myRoom")
            return "2";
        if (path === "/main/setting")
            return "3";
    }

    render(){

    return (
        <Layout hasSider>
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <div className="avatar">
                    <span style={{margin:10}}><Avatar size="large"  icon={<UserOutlined />} src={this.state.avatar}/></span>
                    {this.state.name}
                </div>
                <div className="button-new">
                    <Button type="primary" style={{ width: 125, margin: 20, marginLeft: 27.5}} onClick={this.onClick.bind(this, this.state.id)}>
                        + New
                    </Button>
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={[this.select()]} >
                    <Menu.Item key="1" icon={<ClusterOutlined />} style={{ height: 60}} >
                        <Link to="/main/*">Mind Forest</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DatabaseOutlined />} style={{ height: 60}} >
                        <Link to="/main/myRoom">My Room</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<SettingOutlined />} style={{ height: 60}} >
                        <Link to="/main/setting">Setting</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
                        <div>
                            <Routes>
                                <Route path="/myRoom" element={<MyRoom />} />
                                <Route path="/setting" element={<Setting />} />
                                <Route path="/*" element={<MindForest />} />
                            </Routes>
                        </div>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>MindForest@CSCI3100 Group E3</Footer>
            </Layout>
        </Layout>
    );}
}