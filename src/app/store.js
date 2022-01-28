import {configureStore} from '@reduxjs/toolkit'

import {cryptoApi} from '../services/CryptoApi'
import {cryptoNewsApi} from '../services/CryptoNewsApi'

export default configureStore({
    reducer: {
        //doing this for every reducer you create
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    },
})