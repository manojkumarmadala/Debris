import React, { Component } from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import { Link } from 'react-router-dom'

import logo from "./images/logo.svg";
import "./style.scss";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropDown: false,
      activeItem:''
    };
  }

  handleItemClick = (e, { name }) => {this.setState({ activeItem: name });}
  showLoggedinUserCard = () => {
    this.setState({ showDropDown: !this.state.showDropDown });
  };
  
  render() {
    const activeItem = this.state.activeItem;
    // { isAuthenticated } = this.props;
    // const userCardDropDown = showDropDown ? "in" : "";
    return (
      <Menu stackable>
        <Menu.Item as={Link} to="/">
          <img src={logo} className="logo" alt="24/7 Active share logo" />
        </Menu.Item>
        <Menu.Item  as={Link} to="/" name="home" active={activeItem === "home"} onClick={this.handleItemClick}>
              Home
        </Menu.Item>
        <Menu.Item  as={Link} to="/competition" name="business" active={activeItem === "business"} onClick={this.handleItemClick}>
              Business mectrics
        </Menu.Item>
        <Menu.Item as={Link} to="/chat" name="chat funnel" active={activeItem === "chat funnel"} onClick={this.handleItemClick}>
            Chat
        </Menu.Item>
        <Menu.Item as={Link} to="/aiva" name="aiva" active={activeItem === "aiva"} onClick={this.handleItemClick}>
            AIVA
        </Menu.Item>
        <Menu.Item as={Link} to="/acs/agility" name="acs" active={activeItem === "acs"} onClick={this.handleItemClick}>
            ACS
        </Menu.Item>
        <Menu.Item as={Link} to="/ai/agility" name="ai" active={activeItem === "ai"} onClick={this.handleItemClick}>
            AI
        </Menu.Item>
        <Menu.Item as={Link} to="/dae/" name="dae" active={activeItem === "dae"} onClick={this.handleItemClick}>
            DAE
        </Menu.Item>
        <Menu.Item as={Link} to="/availability" name="chat availability" active={activeItem === "chat availability"} onClick={this.handleItemClick}>
            Chat Availability
        </Menu.Item>
      </Menu>
    );
  }
}
