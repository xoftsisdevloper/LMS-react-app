import React from 'react'
import {
    Navbar,
    Collapse,
    Nav,
    NavItem,
    NavbarBrand,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Dropdown,
    Button,
  } from "reactstrap";
import Logo from '../../layouts/Logo';
import { ReactComponent as LogoWhite } from "../../assets/images/logos/materialprowhite.svg";
import user1 from "../../assets/images/users/user4.jpg";
import useLogout from '../../hooks/uselogout';
import { useNavigate } from 'react-router-dom';
const StudentHeader = () => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = React.useState(false);

    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const { logout, loading } = useLogout()

    const toggle = () => setDropdownOpen((prevState) => !prevState);
    const Handletoggle = () => {
        setIsOpen(!isOpen);
    };
    const showMobilemenu = () => {
        document.getElementById("sidebarArea").classList.toggle("showSidebar");
    };
    return (
        <Navbar color="primary" expand="md" className="fix-header">
        <div className="d-flex align-items-center">
            <div className="d-lg-block d-none me-5 pe-3 site_name">
            <Logo  />
            </div>
            <NavbarBrand href="/">
            <LogoWhite className=" d-lg-none" />
            </NavbarBrand>
            <Button
            color="secondary"
            className=" d-lg-none"
            onClick={() => showMobilemenu()}
            >
            <i className="bi bi-list"></i>
            </Button>
        </div>
        <div className="hstack gap-2">
            <Button
            color="primary"
            size="sm"
            className="d-sm-block d-md-none"
            onClick={Handletoggle}
            >
            {isOpen ? (
                <i className="bi bi-x"></i>
            ) : (
                <i className="bi bi-three-dots-vertical"></i>
            )}
            </Button>
        </div>
        <Button

        onClick={()=> navigate('/courses')}
        >Explore courses</Button>
        <Button> My courses</Button>
        <Collapse navbar isOpen={isOpen}>
            <Nav className="me-auto" navbar>
            </Nav>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle color="transparent">
                <img
                src={user1}
                alt="profile"
                className="rounded-circle"
                width="30"
                ></img>
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem header>Info</DropdownItem>
                <DropdownItem>My Account</DropdownItem>
                <DropdownItem>Edit Profile</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>My Balance</DropdownItem>
                <DropdownItem>Inbox</DropdownItem>
                <DropdownItem onClick={logout}>Logout</DropdownItem>
            </DropdownMenu>
            </Dropdown>
        </Collapse>
        </Navbar>
    );
}

export default StudentHeader