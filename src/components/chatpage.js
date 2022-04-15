import React from "react";


function Chatpage(props){
    return(
        props.isAuthenticated ? 
            <h1>Welcome {props.user.email}</h1> :
            <>
                please login
            </>
        
    )
}

export default Chatpage;