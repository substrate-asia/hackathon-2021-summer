import {setTokenKey,setUsernameKey,setBottomstatusKey,setShowmodalKey,setShowmodaltwoKey,setAccountokmodalKey} from "../Type";
export function setTokenAction(data){
    return {
        type:setTokenKey,
        value:data
    }
}

export function setUsernameAction(data){
    return {
        type:setUsernameKey,
        value:data
    }
}

export function setBottomstatusAction(data){
    return {
        type:setBottomstatusKey,
        value:data
    }
}

export function setShowmodalAction(data){
    return {
        type:setShowmodalKey,
        value:data
    }
}

export function setShowmodaltwoAction(data){
    return {
        type:setShowmodaltwoKey,
        value:data
    }
}

export function setAccountokmodalAction(data){
    return {
        type:setAccountokmodalKey,
        value:data
    }
}