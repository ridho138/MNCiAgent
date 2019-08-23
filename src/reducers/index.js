import { combineReducers } from 'redux'
import { 
  MODAL_MENU
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


const rootReducer = combineReducers({
  dataModalMenu
})

export default rootReducer
