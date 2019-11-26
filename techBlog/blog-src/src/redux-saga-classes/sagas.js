import { put, call, takeLatest } from 'redux-saga/effects';
import { GET_BLOGS } from './action-type';
import blogData from '../blog-api/blog-api';
import { BLOG_DATA_SUCCESS } from './action-type';

function* blogList({payload}) {
    try {
        const blogList = yield call(blogData);
        yield put({ type: BLOG_DATA_SUCCESS, payload: blogList });
    }catch(error) {
        throw error;
    }
}

export default function* rootSaga() {
    yield takeLatest(GET_BLOGS, blogList);
}

// export default function* rootSaga() {
//     yield [getBlogList()];
// }
