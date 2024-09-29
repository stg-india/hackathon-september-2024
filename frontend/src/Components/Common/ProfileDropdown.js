import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

//import images
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import { getCountries, getorgProfile, getProfile } from '../../store/actions';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom';
import useLoading from '../Hooks/useLoading';

const ProfileDropdown = () => {
    const [isLoading, startLoading, stopLoading] = useLoading()
    const dispatch = useDispatch();
    const history = useHistory();
    const help = () => {
        dispatch(getProfile());
        dispatch(getCountries());
    }
    const orgprofile = () => {
        dispatch(getorgProfile());
        dispatch(getCountries());
    
    }
    const { user } = useSelector(state => ({
        user: state.Profile.user,
    }));

    const [userName, setUserName] = useState("Admin");

    useEffect(() => {

        if (sessionStorage.getItem("authUser")) {
            const obj = JSON.parse(sessionStorage.getItem("authUser"));
            console.log(obj.name)
            setUserName(obj.name || "Admin");
            // console.log(userName)

        }
    }, [userName, user]);

    //Dropdown Toggle
    const [isProfileDropdown, setIsProfileDropdown] = useState(false);
    const toggleProfileDropdown = () => {
        setIsProfileDropdown(!isProfileDropdown);
    };
    return (
        <React.Fragment>
            <Dropdown isOpen={isProfileDropdown} toggle={toggleProfileDropdown} className="ms-sm-3 header-item topbar-user">
                <DropdownToggle tag="button" type="button" className="btn">
                    <span className="d-flex align-items-center">
                        <img className="rounded-circle header-profile-user" src={avatar1}
                            alt="Header Avatar" />
                        <span className="text-start ms-xl-2">
                            <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">{userName}</span>
                            <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">Founder</span>
                        </span>
                    </span>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">

                    <h6 className="dropdown-header">Welcome {userName}!</h6>
                    <Link to="/profile"><DropdownItem onClick={help}><i className="mdi mdi-account-check text-muted fs-16 align-middle me-1"></i>
                        <span className="align-middle">Profile</span></DropdownItem></Link>
                    <Link to="/org_profile"><DropdownItem onClick={orgprofile}><i
                        className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1"></i> <span
                            className="align-middle">Organisation Profile</span></DropdownItem></Link>
                    <DropdownItem href="/change-pswrd"><i
                        className="mdi mdi-calendar-check-outline text-muted fs-16 align-middle me-1"></i> <span
                            className="align-middle">Change Password</span></DropdownItem>
                    <DropdownItem href="/billing"><i
                        className="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1"></i> <span
                            className="align-middle">Billing</span></DropdownItem>
                    <DropdownItem href="/api-key"><i
                        className="mdi mdi-wallet text-muted fs-16 align-middle me-1"></i> <span
                            className="align-middle">API Keys</span></DropdownItem>
                    <DropdownItem href="/notification-preferences"><i
                        className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i> <span
                            className="align-middle">Notification Preferences</span></DropdownItem>

                    <DropdownItem href="/logout"><i
                        className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i> <span
                            className="align-middle" data-key="t-logout">Logout</span></DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    );
};

export default ProfileDropdown;