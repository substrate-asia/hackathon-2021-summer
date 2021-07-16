const reducer = (state, action) => {
    switch (action.type) {
        //api
        case 'CONNECT_INIT':
            return { ...state, apiState: 'CONNECT_INIT' };

        case 'CONNECT':
            return { ...state, api: action.payload, apiState: 'CONNECTING' };

        case 'CONNECT_SUCCESS':
            return { ...state, apiState: 'READY' };

        case 'CONNECT_ERROR':
            return { ...state, apiState: 'ERROR', apiError: action.payload };

        //accounts
        case 'LOAD_ALLACCOUNTS':
            return { ...state, myAccountState: 'LOAD_ALLACCOUNTS', myAccount:null};

        case 'SET_ALLACCOUNTS':
            return { ...state, myAccount: action.payload, myAccountState: 'READY' };

        case 'ALLACCOUNTS_ERROR':
            return { ...state, myAccount: null, myAccountState: 'ERROR' };




        case 'SET_ADDNEW':
            return { ...state, addnew: true };

        case 'FINISHED_ADDNEW':
            return { ...state, addnew:false};



        default:
            throw new Error(`Unknown type: ${action.type}`);
    }
};
export default reducer
