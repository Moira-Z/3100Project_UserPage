import React from "react";
import {Card, List, Avatar, Layout, Input, Button} from 'antd';
import {Content} from "antd/es/layout/layout";

const { Search } = Input;

const data = [
    {
        name: '',
        id: 1,
        avatar: "https://joeschmoe.io/api/v1/random",
        createDate: "",
    },
    {
        title: '',
        avatar: "https://joeschmoe.io/api/v1/random",
        id: 2,
        date: "",
    },
    {
        title: '',
        avatar: "https://joeschmoe.io/api/v1/random",
        id: 3,
        date: "",
    },
    {
        title: '',
        avatar: "https://joeschmoe.io/api/v1/random",
        id: 4,
        date: "",
    },
];

export default class MindForest extends React.Component {
    constructor(props) {
        super(props);
        this.state={
             data: data,
             searchText: null,
             searchRes: data,
             returnButton: false,
        }
    }

    // get all rooms
    componentDidMount() {
        fetch("/rooms")
            .then(res=>res.json())
            .then(
                (result)=>{
                    this.setState({data:result});
                    this.setState({searchRes: result});
                },
                (error)=>{
                    console.log("Fetch failed")
                }
            )

    }

    // search room
    onSearch = value => {
        console.log(value);
        this.setState({searchText: value});
        let res = data.filter(item => item.id === parseInt(value));
        console.log(res);
        this.setState({searchRes: res});
        this.setState({returnButton: true});
    }

    // return to all rooms
    onClick = () => {
        this.setState({searchRes: data});
        this.setState({returnButton: false});
    }

    //join room
    onButtonClick = (id) => {
        console.log(id)
        const url='/join'
        const info={
            id:id
        }
        fetch(url,{
            method:'POST',
            credentials:'include',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(info)
        }).then(()=> {
            window.location.replace("/canvas");
        })
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
                                    title={<div><Avatar style={{marginRight: 15}} src={item.avatar} />
                                        {item.name} </div>}
                                    extra={<Button size="small" type="primary" style={{width: 70}} onClick={this.onButtonClick.bind(this, item.id)}>
                                        Join
                                    </Button>}
                                    hoverable
                                    style={{marginBottom: 20, height: 100, width: "100%"}}>
                                    <List.Item style={{paddingTop: 0}}>
                                        <List.Item.Meta
                                            description= {<span>created: {item.createDate}</span>}
                                        />
                                    </List.Item>
                                </Card>
                        )}
                    />
                    {this.state.returnButton?
                        <div style={{marginTop: 20, float:"right"}}><Button type="primary" onClick={this.onClick}>Return</Button></div>
                    :<div> </div>}
                </Content>
            </Layout>
        );
    }
}