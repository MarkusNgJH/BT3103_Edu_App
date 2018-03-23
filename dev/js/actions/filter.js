export const filter = () => {
    console.log("You clicked on filter");
    return{
        type: "FILTER_CLICKED",
        payload: "nothing"
    }
};