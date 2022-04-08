import React from 'react';
import { Route, Link, Routes, useLocation} from "react-router-dom";
import './index.less';
import {Avatar, Button, Layout, Menu} from "antd";
import {ClusterOutlined, DatabaseOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons";
import MindForest from "../MindForest";
import MyRoom from "../MyRoom";
import Setting from "../Setting";

const {Content, Footer, Sider} = Layout;

function Home(){
    const path=useLocation()["pathname"];
    let selected='1';
    if(path === "/myRoom")
        selected = '2';
    else
        if(path === "/setting")
            selected = '3';

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
                    <span style={{margin:10}}><Avatar size="large"  icon={<UserOutlined />} /></span>
                    user name
                </div>
                <div className="button-new">
                    <Button type="primary" style={{ width: 125, margin: 20, marginLeft: 27.5}}>
                        + New
                    </Button>
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={[selected]} >
                    <Menu.Item key="1" icon={<ClusterOutlined />} style={{ height: 60}} selected={useLocation()["pathname"]==='"/*"'}>
                        <Link to="/main">Mind Forest</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DatabaseOutlined />} style={{ height: 60}} selected={useLocation()["pathname"]==='"/myRoom"'}>
                        <Link to="/main/myRoom">My Room</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<SettingOutlined />} style={{ height: 60}} selected={useLocation()["pathname"]==='"/setting"'}>
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
                                <Route path="/main" element={<MindForest />} />

                            </Routes>
                        </div>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>MindForest@CSCI3100 Group E3</Footer>
            </Layout>
        </Layout>
    );
}


export default Home;