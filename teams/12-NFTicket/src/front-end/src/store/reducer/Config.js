import {configAddStatus,configUploadStatus} from "../Type";
const config = {
    hideStatus:false
}

//Reducer
const configReducer = function(state = config,action){

    switch(action.type){
        case configAddStatus:{
            return {
                ...state,
                status:[...state.hideStatus,action.data],
            }
        }

        case configUploadStatus:{
            return {
                ...state,
                status:[...state.hideStatus,action.data],
            }
        }

        default:
            return state;
    }
}

export default configReducer;