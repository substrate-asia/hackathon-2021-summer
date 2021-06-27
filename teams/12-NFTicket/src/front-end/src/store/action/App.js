import {setTokenKey,setUsernameKey,setBottomstatusKey} from "../Type";
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