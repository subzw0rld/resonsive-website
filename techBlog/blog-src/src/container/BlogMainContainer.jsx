import React, {Component} from 'react';
import BlogMain from '../components/blog/BlogMain';
import './BlogMainContainer.css';

export class BlogMainContainer extends Component {
    render() {
        return (
            <div className='blog-main-container'>
                <BlogMain miscList={this.props.miscList} ngList = {this.props.ngList} reactList = { this.props.reactList } vizList = { this.props.vizList }/>
            </div>
        )
    }
}