import { GET_BLOGS, BLOG_DATA_SUCCESS } from './action-type';
export default function BlogReducer(state = [], action) {
    switch(action.type) {
        case GET_BLOGS:
        return action.payload;
        case BLOG_DATA_SUCCESS:
        state = action.payload;
        return state;
        default:
        return state;
    }
}