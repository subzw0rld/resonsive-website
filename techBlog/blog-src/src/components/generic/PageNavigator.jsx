import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './PageNavigator.css';

const scrollToTop = () => {
    document.documentElement.scrollTop = 0;
}

const PageNavigator = ({ prevPage, toggleClass }) => {
    return (
        <div className = {'page-navigator ' + toggleClass}>
            <Link to={prevPage} className='link-btn' title = 'Go back to the previous page'>
                <i className="fas fa-arrow-circle-left"></i>
            </Link>
            <button className='link-btn' onClick = { scrollToTop } title = "Scroll to top of the page">
                <i className="fas fa-arrow-circle-up"></i>
            </button>
        </div>
    );
}

PageNavigator.propTypes = {
    prevPage: PropTypes.string.isRequired
}
export default PageNavigator;