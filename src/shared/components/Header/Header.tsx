/* eslint-disable jsx-a11y/alt-text */
import React from 'react';

import logo from '/src/assets/logo.png';
import { Toolbar } from '@mui/material';

import HeaderAuth from 'shared/components/Header/HeaderAutn';
import HeaderUnauth from 'shared/components/Header/HeaderUnauth';

import styles from './Header.module.css';

const Header = ({ isAuth }: { isAuth: boolean }) => {
  return (
    <header className={styles.styleHeader}>
      <Toolbar className={styles.styleToolBar}>
        <img src={logo} height={54} width={230} />
        {isAuth ? <HeaderAuth /> : <HeaderUnauth />}
      </Toolbar>
    </header>
  );
};

export default Header;
