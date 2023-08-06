import PropTypes from 'prop-types';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import LightModeIcon from '@mui/icons-material/LightMode';
// import NightsStayIcon from '@mui/icons-material/NightsStay';

// setLocale, setTheme
import { setLocale } from '@containers/App/actions';

import Logo from '@static/images/vite.svg';
import FlagId from '@static/images/flags/id.png';
import FlagEn from '@static/images/flags/en.png';
import classes from './style.module.scss';

//  title, locale, contentRef, theme
const Navbar = ({ title, locale, contentRef }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuPosition, setMenuPosition] = useState(null);
  const open = Boolean(menuPosition);

  const handleClick = (event) => {
    setMenuPosition(event.currentTarget);
  };

  const handleClose = () => {
    setMenuPosition(null);
  };

  // const handleTheme = () => {
  //   dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  // };

  const onSelectLang = (lang) => {
    if (lang !== locale) {
      dispatch(setLocale(lang));
    }
    handleClose();
  };

  const goHome = () => {
    navigate('/');
  };

  return (
    <AppBar className={classes.headerWrapper} ref={contentRef}>
      <div className={classes.contentWrapper}>
        <div className={classes.navbarLeft}>
          <div className={classes.logoImage} onClick={goHome}>
            <img src={Logo} alt="logo" className={classes.logo} />
            <div className={classes.title}>{title}</div>
          </div>
          <div className={classes.navlinkWrapper}>
            <div className={classes.navlink}>
              <FormattedMessage id="navbar_features" />
            </div>
            <div className={classes.navlink}>
              <FormattedMessage id="navbar_pricing" />
            </div>
            <div className={classes.navlink}>
              <FormattedMessage id="navbar_resources" />
            </div>
          </div>

          {/* Hamburger Button */}
          <input className={classes.checkbox} type="checkbox" />
          <div className={classes.hamburgerLines}>
            <span className={`${classes.line} ${classes.line1}`} />
            <span className={`${classes.line} ${classes.line2}`} />
            <span className={`${classes.line} ${classes.line3}`} />
          </div>

          {/* Mobile Navigation */}
          <ul className={classes.mobileMenu}>
            <li>
              <a href="#features">
                <FormattedMessage id="navbar_features" />
              </a>
            </li>
            <li>
              <a href="#features">
                <FormattedMessage id="navbar_pricing" />
              </a>
            </li>
            <li>
              <a href="#resources">
                <FormattedMessage id="navbar_resources" />
              </a>
            </li>

            <li>
              <a href="#login">
                <FormattedMessage id="auth_login" />
              </a>
            </li>
            <li>
              <a href="#signup" className={classes.signup}>
                <FormattedMessage id="auth_signup" />
              </a>
            </li>
            <li>
              <div className={classes.toolbar}>
                <div className={classes.toggle} onClick={handleClick}>
                  <Avatar className={classes.avatar} src={locale === 'id' ? FlagId : FlagEn} />
                  <div className={classes.lang}>{locale}</div>
                  <ExpandMoreIcon />
                </div>
              </div>
              <Menu open={open} anchorEl={menuPosition} onClose={handleClose}>
                <MenuItem onClick={() => onSelectLang('id')} selected={locale === 'id'}>
                  <div className={classes.menu}>
                    <Avatar className={classes.menuAvatar} src={FlagId} />
                    <div className={classes.menuLang}>
                      <FormattedMessage id="app_lang_id" />
                    </div>
                  </div>
                </MenuItem>
                <MenuItem onClick={() => onSelectLang('en')} selected={locale === 'en'}>
                  <div className={classes.menu}>
                    <Avatar className={classes.menuAvatar} src={FlagEn} />
                    <div className={classes.menuLang}>
                      <FormattedMessage id="app_lang_en" />
                    </div>
                  </div>
                </MenuItem>
              </Menu>
            </li>
          </ul>
        </div>

        <div className={classes.navbarRight}>
          <div className={classes.toolbar}>
            <div className={classes.toggle} onClick={handleClick}>
              <Avatar className={classes.avatar} src={locale === 'id' ? FlagId : FlagEn} />
              <div className={classes.lang}>{locale}</div>
              <ExpandMoreIcon />
            </div>
          </div>
          <Menu open={open} anchorEl={menuPosition} onClose={handleClose}>
            <MenuItem onClick={() => onSelectLang('id')} selected={locale === 'id'}>
              <div className={classes.menu}>
                <Avatar className={classes.menuAvatar} src={FlagId} />
                <div className={classes.menuLang}>
                  <FormattedMessage id="app_lang_id" />
                </div>
              </div>
            </MenuItem>
            <MenuItem onClick={() => onSelectLang('en')} selected={locale === 'en'}>
              <div className={classes.menu}>
                <Avatar className={classes.menuAvatar} src={FlagEn} />
                <div className={classes.menuLang}>
                  <FormattedMessage id="app_lang_en" />
                </div>
              </div>
            </MenuItem>
          </Menu>
          <div className={classes.login}>
            <FormattedMessage id="auth_login" />
          </div>
          <div className={classes.signup}>
            <FormattedMessage id="auth_signup" />
          </div>
        </div>
      </div>
    </AppBar>
  );
};

Navbar.propTypes = {
  title: PropTypes.string,
  locale: PropTypes.string.isRequired,
  // theme: PropTypes.string,
  contentRef: PropTypes.object,
};

export default Navbar;
