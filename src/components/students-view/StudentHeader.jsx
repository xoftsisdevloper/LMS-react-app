import React from "react";
import {
  Navbar,
  Collapse,
  Nav,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";
import Logo from "../../layouts/Logo";
import { ReactComponent as LogoWhite } from "../../assets/images/logos/materialprowhite.svg";
import user1 from "../../assets/images/users/user4.jpg";
import useLogout from "../../hooks/uselogout";
import { useNavigate } from "react-router-dom";
import { useAuthcontext } from "../../contexts/Authcontext";

const StudentHeader = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const { logout } = useLogout();
  const { authUser } = useAuthcontext();

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const handleToggle = () => setIsOpen(!isOpen);

  const showMobileMenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  return (
    <Navbar color="primary" expand="md" className="fix-header py-0">
      <div className="d-flex align-items-center">
        <div className="d-lg-block d-none me-5 pe-0 site_name">
          <Logo />
        </div>
        <NavbarBrand href="/">
          <LogoWhite className="d-lg-none" />
        </NavbarBrand>
        <Button
          color="secondary"
          className="d-lg-none"
          onClick={showMobileMenu}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          {/* Additional Nav Items can go here */}
        </Nav>
        <div className="hstack gap-2 me-3">
          <Button
            color="primary"
            size="sm"
            className="d-sm-block d-md-none"
            onClick={handleToggle}
          >
            {isOpen ? (
              <i className="bi bi-x"></i>
            ) : (
              <i className="bi bi-three-dots-vertical"></i>
            )}
          </Button>
          
          <Button color="light" onClick={() => navigate("/student-courses")}>
            <i className="bi bi-folder-fill me-1"></i> My Courses
          </Button>
        </div>
        <UncontrolledDropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="transparent" className="p-0">
            <img
              src={user1}
              alt="profile"
              className="rounded-circle"
              width="40"
            />
            <span className="mx-2 text-capitalize h6 text-white" > {authUser.user.username}</span>
          </DropdownToggle>
          <DropdownMenu right style={{marginTop: 5}}>
            <DropdownItem header>Account Info</DropdownItem>
            <DropdownItem onClick={() => navigate("/my-account")}>
              My Account
            </DropdownItem>
            <DropdownItem onClick={() => navigate("/edit-profile")}>
              Edit Profile
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={logout}>Logout</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Collapse>
    </Navbar>
  );
};

export default StudentHeader;
