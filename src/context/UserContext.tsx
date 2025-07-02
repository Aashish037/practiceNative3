// This file defines a UserContext using React's Context API
// It provides a way to manage user-related state such as username and dark mode preference
// The context can be used throughout the application to access and update user information
// It also includes a custom hook to easily access the context in functional components
// The UserProvider component wraps the application and provides the context to its children
// The context includes methods to set the username and toggle dark mode
// This allows components to easily access and modify user-related state without prop drilling
import React, {useContext, useState, ReactNode} from "react";

// types of the context
interface UserContextType {
    username: string;
    setUsername: (username: string) => void;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

const UserContext = React.createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

// UserProvider component that provides the UserContext to its children
// This component manages the state of the username and dark mode
// It uses React's useState hook to manage the state
// It also provides a function to toggle the dark mode
// The UserContext is created using React's createContext method
// The UserContext is then provided to its children using the UserContext.Provider component
export const Userprovider = ({children}: UserProviderProps) => {
    const [username, setUsername] = useState<string>("Guest");
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    const ContextValue : UserContextType = {
        username,
        setUsername,
        isDarkMode,
        toggleDarkMode,
    }

    return (
        <UserContext.Provider value={ContextValue}>
            {children}
        </UserContext.Provider>
    )
}

//  Custom hook to use the UserContext
//  This hook will throw an error if used outside of the UserProvider
//  This ensures that the context is always available when using this hook
//  It helps to avoid null checks in components that consume the context
//  It also provides a clear error message if the context is not available
export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
}