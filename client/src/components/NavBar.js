import React from 'react'
import { Avatar, Menu } from 'antd'
import { Link, withRouter } from "react-router-dom";
import logo from './images/logo.png'

const SubMenu = Menu.SubMenu

const NavBar = (props) => {
  return (
    <>
      <div style={{float: 'left', margin: '6px 6px 0px'}}>
        <Link to='/'> <img src={logo} alt='logo'/> </Link>
      </div>
      <Menu mode="horizontal" style={{lineHeight: '80px'}} selectedKeys={[props.location.pathname]} >
        <Menu.Item key="/forms">
          <Link to='/forms'>Forms</Link>
        </Menu.Item>
        <Menu.Item key="/cycles">
          <Link to='/cycles'>Cycles</Link>
        </Menu.Item>
        <SubMenu style={{float: 'right'}} title={<Avatar>U</Avatar>}>
          <Menu.Item key="/profile">
            <Link to='/profile'>Profile</Link>
          </Menu.Item>
          <Menu.Item key="/logout">
            <span onClick={props.onSignOut}>Logout</span>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </>
  );
}

export default withRouter(NavBar)
