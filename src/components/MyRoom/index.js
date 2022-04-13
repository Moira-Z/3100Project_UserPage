import React from "react";
import {Modal, Card, List, Layout, Button, Divider} from 'antd';
import {Content} from "antd/es/layout/layout";
import {ExclamationCircleOutlined} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";

const { confirm } = Modal;

export default class MyRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            list: [
                {
                    name: 'Title 1',
                    date: "2022/4/5",
                    id: 1,
                },
                {
                    name: 'Title 2',
                    id: 2,
                },
                {
                    name: 'Title 3',
                    id: "",
                },
                {
                    name: 'Title 4',
                    id: "",
                },
            ],
        }

    }

    // get my rooms
    componentDidMount() {
        fetch("http://localhost:8080/myrooms")
            .then(res=>res.json())
            .then(
                (result)=>{
                    this.setState({list:result})
                },
                (error)=>{
                    console.log("Fetch failed")
                }
                )

    }


    showConfirm = (id, idx) => {
        confirm({
            title: 'Do you want to delete this mind map?',
            icon: <ExclamationCircleOutlined />,
            content: 'When clicked the OK button, this dialog will be closed after 1 second',
            onOk:()=> {
                this.handleDelete(id, idx);
            },
            onCancel() {},
        });
    }

     //delete room
    handleDelete = (id, idx) => {
        console.log(idx);
        fetch("http://localhost:8080/deleteRoom", {
            method: 'post',
            header: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: idx,
            })
        });
        let data = this.state.list;
        data.splice(id, 1);
        this.setState({list: data});
    }

    //join room
    onButtonClick = (id) => {
        fetch("http://localhost:8080/join", {
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

    render () {
        return (
            <Layout>
                <Content className="site-layout-background" style={{paddingBottom: 20, textAlign:"left"}}>
                    <div className="title">
                        My Rooms
                    </div>
                </Content>
                <Content className="site-layout-background" style={{textAlign:"left"}}>
                    <List
                        dataSource={this.state.list}
                        renderItem={(item, idx) => (
                            <Card
                                type = "inner"
                                title={item.name}
                                extra={[<Button onClick={this.showConfirm.bind(this, idx, item.id)} size="small" type="primary" style={{width: 60}}>
                                    Delete
                                    </Button>,
                                    <Divider type = "vertical" />,
                                    <Button size="small" type="primary" style={{width: 60}} onClick={this.onButtonClick.bind(this, item.id)}>
                                    Join
                                    </Button>]}
                                hoverable
                                style={{marginBottom: 20, height: 100}}>
                            <List.Item
                                style={{paddingTop: 0}}
                                >
                                <List.Item.Meta

                                    description= {<span>created: {item.createDate}</span>}
                                />
                            </List.Item>
                            </Card>
                        )}
                    />
                </Content>
            </Layout>
        );
    }
}