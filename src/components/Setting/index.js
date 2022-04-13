import React from "react";
import {Content} from "antd/es/layout/layout";
import {UploadOutlined, ExclamationCircleOutlined, UserOutlined} from '@ant-design/icons';
import {Divider, Avatar, Layout, Popover, Button, Input, Tooltip, message, Modal, Upload} from 'antd';
import {Link} from "react-router-dom";
URL="http://localhost:8080/setting";

const { confirm } = Modal;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

export default class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            disabledName: true,
            name: "a",
            pw: "1234",
            id: 100,
            email: "11",
            avatar: "https://joeschmoe.io/api/v1/random",
            checkPw: false,
            newPw: false,
            info: [{
                id: 123,
                username: "Moira",
                password: "123456",
                email: "1155141582@link.cuhk.edu.hk",
                avatar: "https://joeschmoe.io/api/v1/random",
            }],
        }
    }

    componentDidMount() {
        fetch(URL)
            .then(res=>res.json())
            .then(
                (result)=>{
                    this.setState({info:result})
                    this.setState({name: result.username});
                    this.setState({id: result.id});
                    this.setState({avatar: result.avatar});
                    this.setState({email: result.email});
                    this.setState({password: result.password});
                },
                (error)=>{
                    console.log("Fetch failed")
                }
            )
    }

    onNameClick (){
         this.setState({disabledName: false});
    };

    // modify name
    onNamePressEnter = (e) => {
        console.log(e.target.value);
        this.setState({name: e.target.value});
        this.setState({disabledName: true});
        message.success("your nickname is modified successfully:)");
        fetch("http://localhost:8080/changeName", {
            method: 'post',
            header: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.id,
                name: e.target.value,
            })
        });
    };

    onPwClick (){
        this.setState({checkPw: true});
    };

    onPwPressEnter = (e) => {
        console.log("here");
        console.log(this.state.pw);
        if (e.target.value === this.state.pw)
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

    // modify password
    handleModify = (e) => {
        this.setState({pw: e.target.value});
        message.success("change password successfully");
        this.setState({newPw: false});
        fetch("http://localhost:8080/changePassword", {
            method: 'post',
            header: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.id,
                password: e.target.value,
            })
        });
    }

    onAvatarClick = (info) => {
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    avatar: imageUrl,
                    loading: false,
                }),
            );
        }
    }

    render () {
        return (
            <Layout>
                <Content className="site-layout-background" style={{textAlign: "left", paddingLeft: "50px", paddingRight: "50px"}}>
                    <div className="title">Profile</div>
                    <Divider />
                    <div>
                        <div style={{float: "right", paddingRight: 100, paddingTop:20}}>
                            <Popover content={<Upload
                                name="avatar"
                                showUploadList={false}
                                action="http://localhost:8080/changeAvatar"
                                onChange={this.onAvatarClick}
                            >
                                <Button icon={<UploadOutlined />}>Upload</Button>
                            </Upload>} placement="bottom">
                                    <Avatar
                                        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 100, xxl: 100 }}
                                        icon={<UserOutlined />}
                                        src={this.state.avatar}
                                    />
                            </Popover>
                        </div>
                        <div style={{float: "left"}}>
                            <div className="subtitle">Email</div>
                            <Tooltip title = {<span>you cannot edit email</span>} placement="right" color="#1DA57A">
                                <div style={{width: 400, height: 35, border: "1px solid #d9d9d9", color: "rgba(0, 0, 0, 0.25)",
                                    backgroundColor: "#f5f5f5", lineHeight: "30px", paddingLeft: 11}}>
                                    {this.state.email}
                                </div>
                            </Tooltip>
                        <div className="subtitle">Name</div>
                            <Input placeholder="type your name"
                                   defaultValue = {this.state.name}
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
                                <div><span style={{color: "#105c21"}}>Original password: </span>
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