import {createAsyncThunk} from '@reduxjs/toolkit';
import {PostsTypes} from '../../types';
import axiosApi from '../../axiosApi';

export const getPosts = createAsyncThunk<PostsTypes[]>(
    'get/posts',
    async () => {
        try {
            const response = await axiosApi.get<PostsTypes[]>('/posts');

            return response.data;
        } catch (err) {
            throw err;
        }
    },
);