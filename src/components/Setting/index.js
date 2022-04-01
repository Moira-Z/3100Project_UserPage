import React from "react";
import {Content} from "antd/es/layout/layout";
import {CheckOutlined, UserOutlined} from '@ant-design/icons';
import {Divider, Avatar, Layout, Popover, Button, Input} from 'antd';
import {Link} from "react-router-dom";

export default class Setting extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            disabledName: true,
            disabledEmail: true,
            disabledPw: true,
        }
    }

    onNameClick (){
         this.setState({disabledName: false});
    };

    onEmailClick (){
         this.setState({disabledEmail: false});
    };

    onPwClick (){
        this.setState({disabledPw: false});
    };

    render () {
        return (
            <Layout>
                <Content className="site-layout-background" style={{textAlign: "left", paddingLeft: "50px", paddingRight: "50px"}}>
                    <div className="title">Profile</div>
                    <Divider />
                    <div>
                        <div style={{float: "right", paddingRight: 100, paddingTop:20}}>
                            <Popover content={<div>change avatar</div>} placement="bottom">

                                    <Avatar
                                        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 100, xxl: 100 }}
                                        icon={<UserOutlined />}
                                    />

                            </Popover>
                        </div>
                        <div style={{float: "left"}}>
                        <div className="subtitle">Name</div>
                            <Input placeholder="type your name" defaultValue="user name" style={{width: 200}} disabled ={this.state.disabledName}/>
                        <div style={{display:"inline-block", paddingLeft: 10}}>
                            <Button type="link" size="small"
                                    onClick={() => this.onNameClick()}
                                     >
                                edit
                            </Button>
                        </div>
                        <div className="subtitle">Email</div>
                            <Input placeholder="type your address" defaultValue="email address display" style={{width: 400}} disabled={this.state.disabledEmail}/>
                            <div style={{display:"inline-block", paddingLeft: 10}}>
                                <Button type="link" size="small"
                                        onClick={() => this.onEmailClick()}>
                                    edit
                                </Button>
                            </div>
                        <div className="subtitle">Password</div>
                            <Input.Password placeholder="type your password" defaultValue="1234" style={{width: 200}} disabled={this.state.disabledPw}/>
                            <div style={{display:"inline-block", paddingLeft: 10}}>
                                <Button type="link" size="small"
                                        onClick={() => this.onPwClick()}>
                                    edit
                                </Button>
                            </div>
                        </div>
                    </div>
                </Content>
            </Layout>
        );
    }
}