import {configureStore} from '@reduxjs/toolkit'

import {cryptoApi} from '../services/CryptoApi'

export default configureStore({
    reducer: {
        //doing this for every reducer you create
        [cryptoApi.reducerPath]: cryptoApi.reducer
    },
})