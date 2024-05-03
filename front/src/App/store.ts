import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {usersReducer} from '../features/Users/userSlice';
import {persistReducer, FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {postsReducer} from "../features/Posts/postsSlice";
import {commentsReducer} from "../features/Comments/commentsSlice";

const usersPersistConfig = {
    key: 'forum:users',
    storage: storage,
    whitelist: ['user'],
}

const rootReducer = combineReducers({
    users: persistReducer(usersPersistConfig, usersReducer),
    posts: postsReducer,
    comments: commentsReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER]
        }
    })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;