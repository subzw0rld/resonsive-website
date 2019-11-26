import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import BlogContainer from './container/BlogContainer';
import { BlogMainContainer } from './container/BlogMainContainer';
import BlogContent from './components/blog/BlogContent';
import './App.css';

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMainPage: true
        }

    }

    componentDidMount() {
        this.props.getBlogList();
    }

    filterData(field) {
        return this.props.blogList.filter(item => {
            if (item.category === field) {
                if (item.component === 'BlogContent') {
                    item.component = BlogContent;
                }
                return item;
            }
        });
    }

    parseLink(arr) {
        return arr.map((route, i) => <li key={i}>
            <Link to={route.path}>{route.label}</Link>
        </li>);
    }

    parseRouteContent(arr) {
        return arr.map((route, i) => <Route
            path={route.path} key={i}
            render={props => (
                <BlogContainer location={route.path} prevPage='/'><route.component {...props} location={route.path} label={route.label} content={route.content} /></BlogContainer>
            )} />
        );
    }

    render() {
        // console.log(this.props);
        const MISC_TOPIC = this.filterData('misc') || [];
        const ANGULAR_TOPIC = this.filterData('angular') || [];
        const REACT_TOPIC = this.filterData('react') || [];
        const VIZ_TOPIC = this.filterData('viz') || [];

        const miscListItem = this.parseLink(MISC_TOPIC);
        const ngListItem = this.parseLink(ANGULAR_TOPIC);
        const reactListItem = this.parseLink(REACT_TOPIC);
        const vizListItem = this.parseLink(VIZ_TOPIC);

        const miscContent = this.parseRouteContent(MISC_TOPIC);
        const ngContent = this.parseRouteContent(ANGULAR_TOPIC)
        const reactContent = this.parseRouteContent(REACT_TOPIC);
        const vizContent = this.parseRouteContent(VIZ_TOPIC);

        return (
            <div className="tech-blog">
                {miscListItem.length
                    ? <Switch location={this.props.location}>
                        <Route
                            exact
                            path='/'
                            render={props => (<BlogMainContainer miscList={miscListItem} ngList={ngListItem} reactList={reactListItem} vizList={vizListItem} />)}></Route>
                        {miscContent}
                        {ngContent}
                        {reactContent}
                        {vizContent}
                    </Switch>
                    : <div className='loading-message'>Loading Blog Content...</div>
                }
            </div>
        );
    }
}

// export default withRouter(App);
