import React from "react";
import {Card, List, Divider, Statistic, Layout, Input} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {Content} from "antd/es/layout/layout";

const { Search } = Input;

const onSearch = value => console.log(value);

const data = [
    {
        title: 'Title 1',
        content: "https://i0.wp.com/therightquestions.co/wp-content/uploads/2013/01/THE-Right-QUESTIONS-MindMap.jpg?fit=1906%2C1070&ssl=1"
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

export default class MindForest extends React.Component {
    render () {
        return (
            <Layout>
                <Content className="site-layout-background" style={{paddingBottom: 20, textAlign:"left"}}>
                    <div className="title" style={{display:"inline-block", height:32, lineHeight:"32px"}}>
                        Find all your interest here
                    </div>
                    <Search style={{display:"inline-block", width:300, float:"right"}} placeholder="input search text" onSearch={onSearch} enterButton />
                </Content>
                <Content className="site-layout-background">
                    <List
                        grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 1,
                            md: 1,
                            lg: 2,
                            xl: 2,
                            xxl: 2,
                        }}
                        dataSource={data}
                        renderItem={item => (
                            <List.Item>
                                <Card
                                    hoverable
                                    style={{ height: 300, position:"relative" }}
                                    cover={<img style={{maxHeight:352}} alt="example" src= {item.content} />}
                                >
                                    <div
                                        style={{padding:0, width:"100%", position: "absolute", left: 0,bottom: 0,
                                            textAlign:"left",
                                            backgroundColor: "rgba(219,242,219,0.33)"}}
                                    >
                                        <div style={{display:"inline-block", position: "relative", float: "left", marginLeft:8}}>
                                            <span style={{fontWeight:"bold"}}>mind map title</span>
                                            <br/>
                                            author
                                            <Divider type="vertical" />
                                            date
                                        </div>
                                        <div style={{display:"inline-block", fontSize:10, position: "relative", float: "right", marginRight:8, marginTop:2}}><Statistic value={5} prefix={<UserOutlined />} /></div>
                                    </div>
                                </Card>
                            </List.Item>
                        )}
                    />
                </Content>
            </Layout>
        );
    }
}