import React, {useEffect, useState} from 'react';
import { Button, Menu, Typography, Avatar } from "antd";
import {Link} from 'react-router-dom';
import {HomeOutlined,  BulbOutlined, FundOutlined, MenuOutlined} from '@ant-design/icons';

import icon from '../images/cryptocurrency.png'
/* 
    container div => logo-container div => Avatar + Typography + meny w/ menu.items which contains links
*/
const Navbar = () => {

    const [activeMenu, setActiveMenu] = useState(true)
    const [screenSize, setScreenSize] = useState(null)

    useEffect( () => {
        const handleResize = () => setScreenSize(window.innerWidth);

        window.addEventListener('resize', handleResize)
        handleResize()
        //to clean 
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect( () => {
        if(screenSize < 768) {
            setActiveMenu(false)
        } else {
            setActiveMenu(true)
        }
    }, [screenSize])

    return (
        <div className="nav-container">
            <div className="logo-container">
                <Avatar src={icon} size="large" />
                <Typography.Title level={2} className="logo" >
                    <Link to="/">CryptoWorld</Link>
                </Typography.Title>
                <Button className="menu-control-container" onClick={ () => setActiveMenu(!activeMenu)}>
                    <MenuOutlined />
                </Button>
                {activeMenu && (
                    <Menu theme="dark">
                    <Menu.Item icon={<HomeOutlined />}>
                        <Link to="/"> Home </Link>
                    </Menu.Item>
                    <Menu.Item icon={<FundOutlined />}>
                        <Link to="/cryptocurrencies"> Cryptocurrencies </Link>
                    </Menu.Item>
                    <Menu.Item icon={<BulbOutlined />}>
                        <Link to="/news"> News </Link>
                    </Menu.Item>
                </Menu>
                )}
                
            </div>
        </div>
    )
}

export default Navbar
