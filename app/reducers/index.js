import { combineReducers } from 'redux'
import { 
  MODAL_MENU,
  NEWS_ANNOUNCEMENT_LIST
} from '../actions/index'



export const dataModalMenu = (state = {
  isOpen: false,
}, action) => {
  switch (action.type){
    case `${MODAL_MENU}`: 
      return {
        ...state,
        isOpen: action.payload
      }

    default: 
      return state
  }
}

export const dataNewsAnnouncementList = (state = {
  data: [],
}, action) => {
  switch (action.type){
    case `${NEWS_ANNOUNCEMENT_LIST}`: 
      return {
        ...state,
        data: action.payload
      }

    default: 
      return state
  }
}


const rootReducer = combineReducers({
  dataModalMenu,
  dataNewsAnnouncementList
})

export default rootReducer
