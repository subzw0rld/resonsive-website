import React from 'react';
import PropTypes from 'prop-types';
import './BlogMain.css'

const BlogMain = ({miscList, ngList, reactList, vizList}) => (
    <div className="tech-grid tilt">
        <h1 className="blog-page-title">The Tech Blog Of</h1>
        <h1 className="blog-author">Subroto Mukherjee</h1>
        <p className="author-message">This section is dedicated to all the blogs related
            to technology I have been seeking. It is a collection of articles that I have
            written on some piece of code written by me or about an article that I have
            found interesting. Like I have already mentioned that this website is also an
            effort to incorporate anything that catches my interest or would help me learn
            and showcase my talent. That's why almost every page on this site would look
            different so that it looks more like a techie's playground than just a website.
        </p>
        <div className="blog-topic-misc">
            <h3>Misc</h3>
            <ul className="blog-list">
                {miscList}
            </ul>
        </div>
        <div className="blog-topic-angular">
            <h3>Angular</h3>
            <ul className="blog-list">
                {ngList}
            </ul>
        </div>
        <div className="blog-topic-data-viz">
            <h3>Data Visualization</h3>
            <ul className="blog-list">
                { vizList }
            </ul>
        </div>
        <div className="blog-topic-react">
            <h3>React</h3>
            <ul className="blog-list">
                { reactList }
            </ul>
        </div>
    </div>
);

BlogMain.propTypes = {
    miscList: PropTypes.array.isRequired,
    ngList: PropTypes.array.isRequired,
    reactList: PropTypes.array.isRequired
}
export default BlogMain;