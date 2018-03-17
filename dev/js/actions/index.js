export const selectUser = (user) => {
    console.log("You clicked on user: ", user.first);
    return{
        type: "USER_SELECTED",
        payload: user 
    }
};

// the whole function is the action creator
// what is returned is the action.
// action returns (1) the type and (2) the payload (Data)
// they just make an announcement, what happens and needs to be done is dependent on the reducers