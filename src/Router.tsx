import React from "react";
import {BrowserRouter, Route,Switch} from "react-router-dom";
import Auth from "./Pages/Auth";
import Home from "./Pages/Home";

export default function Router() {
    const [userName, setUserName] = React.useState("User Name Not Found");
    return (
        <BrowserRouter>
          <div>
            <Switch>
              <Route path="/home">
                <Home userName={userName}/>
              </Route>
              <Route path="/">
                <Auth setUserName={setUserName}/>
              </Route>
            </Switch>
            {/* {!loggedIn && 
              <Switch>
                <Route path="/" >
                  <SignINUP/>
                </Route>
              </Switch>
            }
            {loggedIn &&
              <Switch>
                <Route path="/">
                  <Home/>
                </Route>
              </Switch>
            } */}
          </div>
        </BrowserRouter>  
    );
}