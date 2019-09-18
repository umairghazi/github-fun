import React, { Component } from "react";
import { Layout } from "antd";
import { Button, Radio } from "antd";
import { Input } from "antd";
import { Row, Col } from "antd";
import { List, Avatar, Icon } from "antd";
import { StoreContext } from "../contexts";
import { dialogFlowReq } from "../utils/dialogFlow";
import ScrollAnim from "rc-scroll-anim";
import { Spin } from "antd";
import { Tooltip } from "antd";

import "./App.css";
import "./theme.less";
const { Header, Footer, Sider, Content } = Layout;
const Search = Input.Search;
const ScrollParallax = ScrollAnim.Parallax;

class App extends Component {
  state = {
    error: "",
    data: null
  };

  onSearch = async searchText => {
    this.setState({
      loading: true
    });
    const ghResponse = await dialogFlowReq(searchText);
    if (ghResponse.type === "error") {
      this.setState({ error: ghResponse.msg, loading: false });
    }
    this.setState({ data: ghResponse, loading: false });
  };

  handleSearchTextChange = evt => {
    this.setState({
      searchText: evt.target.value
    });
  };

  render() {
    console.log(this);
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );
    return (
      <Layout>
        <Header style={{ background: "#3772FF", fontSize: 24, color: "#fff" }}>
          <Icon type="github" style={{ fontSize: 24, margin: 10 }} />
          Github Fun
        </Header>
        <Content style={{ margin: 10 }}>
          <Row>
            <Col span={12} offset={6}>
              <Search
                placeholder="Search Github for stuff"
                enterButton="Search"
                size="large"
                onSearch={this.onSearch}
              />
            </Col>
          </Row>
          <Row>
            <Col span={12} offset={6}>
              {this.state.loading ? (
                <Spin size="large" style={{ margin: 10 }} />
              ) : null}
              {this.state.data && this.state.data.items.length ? (
                <List
                  itemLayout="vertical"
                  size="large"
                  dataSource={this.state.data.items}
                  renderItem={item => (
                    <List.Item
                      key={item.full_name}
                      actions={[
                        <Tooltip title="Stars">
                          <a href={item.stargazers_url}>
                            <IconText
                              type="star"
                              text={item.stargazers_count}
                            />
                          </a>
                        </Tooltip>,
                        <Tooltip title="Forks">
                          <a href={item.forks_url}>
                            <IconText type="fork" text={item.forks_count} />
                          </a>
                        </Tooltip>,
                        <Tooltip title="Open Issues">
                          <a href={"#"}>
                            <IconText
                              type="fork"
                              text={item.open_issues_count}
                            />
                          </a>
                        </Tooltip>,
                        <Tooltip title="Watchers">
                          <a href={"#"}>
                            <IconText type="eye-o" text={item.watchers_count} />
                          </a>
                        </Tooltip>,
                        <Tooltip title="Last Updated">
                          <a href={"#"}>
                            <IconText
                              type="calendar"
                              text={new Date(
                                item.updated_at
                              ).toLocaleDateString("en-US")}
                            />
                          </a>
                        </Tooltip>
                      ]}
                      extra={
                        <a href={item.html_url}>
                          <img
                            width={50}
                            alt="logo"
                            src={item.owner.avatar_url}
                          />
                        </a>
                      }
                    >
                      <List.Item.Meta
                        avatar={<Avatar src={item.owner.avatar_url} />}
                        title={<a href={item.html_url}>{item.full_name}</a>}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />
              ) : null}
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}
export default App;
