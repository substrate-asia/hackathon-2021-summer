import {configAddStatus,configUploadStatus} from "../Type";
export function addStatusAction(params){
    return {
        type:configAddStatus,
        payload:{label:params.label,value:params.value}
    }
}

export function uploadStatusAction(label,value){
    return {
        type:configUploadStatus,
        payload:{label,value}
    }
}