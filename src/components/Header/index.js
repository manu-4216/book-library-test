import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import './style.css';

const Header = ({ location, count }) => (
    <header className="Header">
        <Link to="/" className="Header-Title">
            Librarium
        </Link>
        <span className="Header-Subtitle">
            {getSubtitle(location.pathname)}
        </span>
        <Link to="/cart" className="Header-Cart-Link">
            <Icon name="shopping cart" color="red">
                <span className="Header-Cart-Count">{count}</span>
            </Icon>
        </Link>
    </header>
);

// Get the subtitle from the active pathname. For instance get 'cart' from the '/cart'
const getSubtitle = pathname => {
    const path = pathname.split('/')[1];
    return path ? '- ' + path : '';
};

const mapStateToProps = state => ({ count: state.cartIsbns.length });
export default connect(mapStateToProps)(Header);
