// it needs to listen for actions. Actions sends an announcement to all reducers. 
//Reducers can be set up to respond to some announcements

//it needs to have a default value since we need to pass this into the store at initializaiton
export default function (state=null, action){
    switch(action.type){
        case "USER_SELECTED":
        return action.payload;
        break;
    }
    return state;
}