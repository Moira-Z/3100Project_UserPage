import React from "react";
import {Content} from "antd/es/layout/layout";
import {CheckOutlined} from '@ant-design/icons';
import {Card, List, Divider, Statistic, Layout, Input, Button} from 'antd';

export default class Setting extends React.Component {
    render () {
        return (
            <Layout>
                <Content className="site-layout-background" style={{textAlign: "left"}}>
                    <div className="title">Profile</div>
                    <Divider />
                    <div>Name</div>
                    <Input placeholder="type your name" defaultValue="user name" style={{width: 200}}/>
                    <div style={{display:"inline-block", paddingLeft: 10}}>
                        <Button type="primary" shape="circle" size="small" icon={<CheckOutlined />} />
                    </div>

                </Content>
            </Layout>
        );
    }
}