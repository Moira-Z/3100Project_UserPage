import React from "react";
import {Card, List, Layout} from 'antd';
import {Content} from "antd/es/layout/layout";

const data = [
    {
        title: 'Title 1',
        content: "https://focus.meisterlabs.com/wp-content/uploads/2016/08/Basic-Mind-Map-Structure.png"
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
    render () {
        return (
            <Layout>
                <Content className="site-layout-background" style={{paddingBottom: 20, textAlign:"left"}}>
                    <div className="title">
                        My Rooms
                    </div>
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
                                    style={{ height: 352, position:"relative"}}
                                    cover={<img style={{maxHeight:352}} alt="example" src= {item.content} />}
                                >
                                    <div
                                        style={{padding:0, width:"100%", height: 50, position: "absolute", left: 0,bottom: 0,
                                            textAlign:"left",
                                            backgroundColor: "rgba(219,242,219,0.33)"}}
                                    >
                                        <div style={{lineHeight:"50px", display:"inline-block", position: "relative", float: "left", marginLeft:8}}>
                                            <span style={{fontWeight:"bold"}}>mind map title</span>
                                        </div>
                                        <div style={{lineHeight:"50px",display:"inline-block", fontSize:10, position: "relative", float: "right", marginRight:8, marginTop:2}}>Last modified: date by xxx</div>
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