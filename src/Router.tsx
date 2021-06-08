import React from "react";
import {BrowserRouter, Route,Switch} from "react-router-dom";
import Auth from "./Pages/Auth";
import Home from "./Pages/Home";

export default function Router() {
    // const loggedIn = true;
    return (
        <BrowserRouter>
          <div>
            <Switch>
              <Route path="/home">
                <Home/>
              </Route>
              <Route path="/">
                <Auth/>
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