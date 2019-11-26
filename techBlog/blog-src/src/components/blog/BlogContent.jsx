import React from 'react';
import PageNavigator from '../generic/PageNavigator';
import './BlogContent.css';

const renderAsHTML = str => {
    return { __html: str }
};

export default class BlogContent extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            showPageNav: false
        }
    }
    componentDidMount() {
        window.addEventListener('scroll', (e) => {
            // console.log(document.documentElement.scrollTop);
            if (document.documentElement.scrollTop >= 100) {
                this.setState({showPageNav: true});
            }else {
                this.setState({showPageNav: false});
            }
        });

    }
    render() {
        return (
            <div className='blog-container'>
                <h1 className='blog-title'>{this.props.label}</h1>
                <div className='blog-content' dangerouslySetInnerHTML={renderAsHTML(this.props.content)}></div>
                <PageNavigator toggleClass={!this.state.showPageNav ? 'hide' : ''} prevPage='/'></PageNavigator>
            </div>
        );
    }
}
