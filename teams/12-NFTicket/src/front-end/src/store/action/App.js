import {setTokenKey,setUsernameKey,setBottomstatusKey,setShowmodalKey} from "../Type";
export function setTokenAction(data){
    console.log("settokensettokensettokensettokensettoken")
    console.log(data)
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
    console.log("setBottomstatusActionsetBottomstatusAction")
    console.log(data)
    return {
        type:setBottomstatusKey,
        value:data
    }
}

export function setShowmodalAction(data){
    console.log("setShowmodalActionsetShowmodalAction")
    console.log(data)
    return {
        type:setShowmodalKey,
        value:data
    }
}