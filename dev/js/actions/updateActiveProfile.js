export const updateActiveProfile = (data) => {
    return{
        type: "UPDATE_ACTIVE_PROFILE",
        payload: data
    }
};


// the whole function is the action creator
// what is returned is the action.
// action returns (1) the type and (2) the payload (Data)
// they just make an announcement, what happens and needs to be done is dependent on the reducers