import React from "react";
import {Modal, Card, List, Layout, Button, Divider} from 'antd';
import {Content} from "antd/es/layout/layout";
import {ExclamationCircleOutlined} from '@ant-design/icons';
URL="http://localhost:8080/myrooms"

const { confirm } = Modal;

const data = [
    {
        title: 'Title 1',
        date: "2022/4/5"
    },
    {
        title: 'Title 2',
    },
    {
        title: 'Title 3',
    },
    {
        title: 'Title 4',
    },
];

export default class MyRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            list: data,
        }

    }

    componentDidMount() {
        fetch(URL)
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

    showConfirm = (id) => {
        confirm({
            title: 'Do you want to delete this mind map?',
            icon: <ExclamationCircleOutlined />,
            content: 'When clicked the OK button, this dialog will be closed after 1 second',
            onOk:()=> {
                this.handleDelete(id);
            },
            onCancel() {},
        });
    }

    handleDelete = (id) => {
        data.splice(id, 1);
        this.setState({list: data});
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
                                title={item.title}
                                extra={[<Button onClick={this.showConfirm.bind(this, idx)} size="small" type="primary" style={{width: 60}}>
                                    Delete
                                    </Button>,
                                    <Divider type = "vertical" />,
                                    <Button size="small" type="primary" style={{width: 60}}>
                                    Join
                                    </Button>]}
                                hoverable
                                style={{marginBottom: 20, height: 100}}>
                            <List.Item
                                style={{paddingTop: 0}}
                                >
                                <List.Item.Meta

                                    description= {<span>last modified: {item.date}</span>}
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