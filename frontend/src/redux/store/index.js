import {configureStore} from '@reduxjs/toolkit'
import Basic from '../../redux/features/basic/basicSlice'
import UserReducer from '../features/user/userSlice'
import TagReducer from '../features/tags/tagsSlice'
import QuestionReducer from '../features/question/questionSlice'
import AnswerReducer from '../features/answer/answerSlice'

const store = configureStore({
    reducer:{
        basic : Basic, 
        user : UserReducer,
        tags : TagReducer,
        question : QuestionReducer,
        answer : AnswerReducer
    }
})

export default store;