import React from "react";
import {Card, List, Divider, Avatar, Layout, Input, Button} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {Content} from "antd/es/layout/layout";

const { Search } = Input;

const data = [
    {
        title: 'Title 1',
        id: "001"
    },
    {
        title: 'Title 2',
        id: "002"
    },
    {
        title: 'Title 3',
        id: "003"
    },
    {
        title: 'Title 4',
        id: "004"
    },
];

export default class MindForest extends React.Component {
    constructor(props) {
        super(props);
        this.state={
             searchText: null,
             searchRes: data,
        }
    }

    onSearch = value => {
        console.log(value);
        this.setState({searchText: value});
        let res = data.filter(item => item.id === value);
        console.log(res);
        this.setState({searchRes: res});
    }

    render () {
        return (
            <Layout>
                <Content className="site-layout-background" style={{paddingBottom: 20, textAlign:"left"}}>
                    <div className="title" style={{display:"inline-block", height:32, lineHeight:"32px"}}>
                        Find your interest here!
                    </div>
                    <Search style={{display:"inline-block", width:300, float:"right"}}
                            placeholder="please input room ID"
                            onSearch={this.onSearch}
                            enterButton />
                </Content>
                <Content className="site-layout-background" style={{textAlign:"left"}}>
                    <List
                        dataSource={this.state.searchRes}
                        renderItem={item => (
                                <Card
                                    type = "inner"
                                    title={<div><Avatar style={{marginRight: 15}} src="https://joeschmoe.io/api/v1/random" />
                                        {item.title} </div>}
                                    extra={<Button size="small" type="primary" style={{width: 70}}>
                                        Join
                                    </Button>}
                                    hoverable
                                    style={{marginBottom: 20, height: 100, width: "100%"}}>
                                    <List.Item style={{paddingTop: 0}}>
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