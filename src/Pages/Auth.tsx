import React from "react";
import LogIN from "../Components/LogIN";
import Register from "../Components/Register"

export default function Auth({setUserName}:{setUserName: Function}) {
    const [isRegistered, setIsRegistered] = React.useState(true)
    if(isRegistered)
        return (
            <LogIN isRegistered={isRegistered} setIsRegistered={setIsRegistered} setUserName={setUserName}/>
        );

    else return (
        <Register isRegistered={isRegistered} setIsRegistered={setIsRegistered} setUserName={setUserName}/>
    );
}