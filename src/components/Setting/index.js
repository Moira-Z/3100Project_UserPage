import React from "react";
import {Content} from "antd/es/layout/layout";
import {CheckOutlined, ExclamationCircleOutlined, UserOutlined} from '@ant-design/icons';
import {Divider, Avatar, Layout, Popover, Button, Input, Tooltip, message, Modal} from 'antd';
import {Link} from "react-router-dom";

const { confirm } = Modal;

export default class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            disabledName: true,
            name: "Moira",
            pw: "123456",
            checkPw: false,
            newPw: false,
        }
    }

    onNameClick (){
         this.setState({disabledName: false});
    };

    onNamePressEnter = (e) => {
        console.log(e.target.value);
        this.setState({name: e.target.value});
        this.setState({disabledName: true});
        message.success("your nickname is modified successfully:)");
    };

    onPwClick (){
        this.setState({checkPw: true});
    };

    onPwPressEnter = (e) => {
        if (e.target.value == this.state.pw)
        {
            message.success("Correct");
            this.setState({checkPw: false});
            this.setState({newPw: true});
        }
        else{
            message.error("Wrong! Please try again");
        }
    };

    onNewPwPressEnter = (e) => {
        if(e.target.value){
        confirm({
            title: 'Do you want to change your password?',
            icon: <ExclamationCircleOutlined />,
            onOk:()=> {
                this.handleModify(e);
            },
            onCancel() {},
        });}
        else{
            message.error("empty input");
        }
    };

    handleModify = (e) => {
        this.setState({pw: e.target.value});
        message.success("change password successfully");
        this.setState({newPw: false});
    }

    render () {
        return (
            <Layout>
                <Content className="site-layout-background" style={{textAlign: "left", paddingLeft: "50px", paddingRight: "50px"}}>
                    <div className="title">Profile</div>
                    <Divider />
                    <div>
                        <div style={{float: "right", paddingRight: 100, paddingTop:20}}>
                            <Popover content={<a>change avatar</a>} placement="bottom">

                                    <Avatar
                                        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 100, xxl: 100 }}
                                        icon={<UserOutlined />}
                                    />

                            </Popover>
                        </div>
                        <div style={{float: "left"}}>
                            <div className="subtitle">Email</div>
                            <Tooltip title = {<span>you cannot edit email</span>} placement="right" color="#1DA57A">
                                <div style={{width: 400, height: 35, border: "1px solid #d9d9d9", color: "rgba(0, 0, 0, 0.25)",
                                    backgroundColor: "#f5f5f5", lineHeight: "30px", paddingLeft: 11}}>
                                    email address display
                                </div>
                            </Tooltip>
                        <div className="subtitle">Name</div>
                            <Input placeholder="type your name"
                                   defaultValue= {this.state.name}
                                   onPressEnter={this.onNamePressEnter}
                                   style={{width: 200, height: 35}}
                                   disabled ={this.state.disabledName}/>
                        <div style={{display:"inline-block", paddingLeft: 10}}>
                            <Button type="link" size="small"
                                    onClick={() => this.onNameClick()}
                                     >
                                edit
                            </Button>
                        </div>
                        <div className="subtitle">Password</div>
                            <div style={{display:"inline-block", width: 200, height: 35, border: "1px solid #d9d9d9", color: "rgba(0, 0, 0, 0.25)",
                                backgroundColor: "#f5f5f5", lineHeight: "35px", paddingLeft: 11}}>
                                ******
                            </div>
                            <div style={{display:"inline-block", paddingLeft: 10}}>
                                <Button type="link" size="small"
                                        onClick={() => this.onPwClick()}>
                                    edit
                                </Button>
                            </div>
                            {this.state.checkPw ?
                                <div style={{paddingTop: 20}}>
                                <Divider/>
                                    <Tooltip title = {<span>press Enter to confirm</span>} placement="right" color="#1DA57A">
                                <div ><span style={{color: "#105c21"}}>Original password: </span>
                                    <Input.Password placeholder="please type your original password"
                                                    onPressEnter={this.onPwPressEnter}
                                           style={{width: 300, height: 35}}/>
                                </div>
                                    </Tooltip>
                                </div>
                                : <div></div>}
                            {this.state.newPw ?
                                <div style={{paddingTop: 20}}>
                                    <Divider/>
                                    <Tooltip title = {<span>press Enter to confirm</span>} placement="right" color="#1DA57A">
                                    <div>
                                        <span style={{color: "#105c21"}}>New password: </span>
                                        <Input.Password placeholder="please type your new password"
                                                    onPressEnter={this.onNewPwPressEnter}
                                                    style={{width: 300, height: 35}}/>
                                    </div>
                                    </Tooltip>
                                </div>
                                :<div></div>}
                        </div>
                    </div>
                </Content>
            </Layout>
        );
    }
}