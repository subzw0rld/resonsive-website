import { GET_BLOGS } from './action-type';

export function getBlogList() {
    return {
        type: GET_BLOGS,
        payload: []
    }
}