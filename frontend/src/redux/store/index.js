import {configureStore} from '@reduxjs/toolkit'
import Basic from '../../redux/features/basic/basicSlice'
const store = configureStore({
    reducer:{
        basic : Basic
    }
})

export default store;