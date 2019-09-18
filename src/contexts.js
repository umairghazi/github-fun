import * as React from "react";

// Current route and methods for interacting with browser history
export const NavContext = React.createContext(undefined);

// Data received from server
export const StoreContext = React.createContext(undefined);

// UI context, including whether the subtree is disabled, is a form, etc.
export const UIContext = React.createContext(undefined);
