import { combineReducers } from "redux"
import columnReducer from "./columns"
import { configureStore } from "@reduxjs/toolkit"

// // setup the combineReducer fucntion and pass it to the createStore
const rootReducer = combineReducers({
    columns: columnReducer
})

const store = configureStore({
    reducer: rootReducer
})

export default store