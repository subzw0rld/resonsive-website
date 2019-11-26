import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import './BlogContainer.css';

export default class BlogContainer extends PureComponent {

    render() {
        return (
            <div className='blog-content-wrapper'>
                <Link className='blog-container-header' to = {this.props.prevPage}>
                    <span>Back</span>
                </Link>
                {this.props.children}
            </div>
        );
    }
}