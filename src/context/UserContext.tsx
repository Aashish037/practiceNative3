// This file defines a UserContext using React's Context API
// It provides a way to manage user-related state such as username and dark mode preference
// The context can be used throughout the application to access and update user information
// It also includes a custom hook to easily access the context in functional components
// The UserProvider component wraps the application and provides the context to its children
// The context includes methods to set the username and toggle dark mode
// This allows components to easily access and modify user-related state without prop drilling
import React, {useContext, createContext, useState, ReactNode} from "react";
import { Alert, PermissionsAndroid, Platform } from "react-native";
import {launchImageLibrary, ImagePickerResponse, launchCamera, MediaType} from 'react-native-image-picker';

// types of the context
interface UserContextType {
    username: string;
    setUsername: (username: string) => void;
    isDarkMode: boolean;
    bio: string; 
    setBio: (bio: string) => void; // Function to set user bio
    toggleDarkMode: () => void;
    // adding new types
    email: string;
    setEmail: (email: string) => void;
    profileImageUrl: string | null;
    setProfileImageUrl: (uri: string | null) => void;
    pickImage: () => void; // Function to pick image from gallery
}

const UserContext = createContext<UserContextType | undefined>(undefined);

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
    // adding new states
    const [email, setEmail] = useState<string>("");
    const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
    const [bio, setBio] = useState<string>("");

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'This app needs camera access to take photos for your profile.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        }
        return true; // iOS handles permissions automatically
    };

    // logic wise it is right but it's not useful for real life app, as it didn;t alert ht user, no error handling 
    // const pickImage = () => {
    //     const options = {
    //         mediaType: 'photo' as MediaType,
    //         includeBase64: false,
    //         maxHeight: 2000,
    //         maxWidth: 2000,
    //     };

    //     launchImageLibrary(options, (response: ImagePickerResponse) => {
    //         if (response.didCancel || response.errorMessage) {
    //             console.log('User cancelled image picker or error occurred');
    //             return;
    //         }

    //         if (response.assets && response.assets[0]) {
    //             const imageUri = response.assets[0].uri;
    //             setProfileImageUrl(imageUri || null);
    //         }
    //     });
    // };

    const pickImage = () => {
        const options = {
            mediaType: 'photo' as MediaType,
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        Alert.alert(
            "Select Photo",
            "Choose a method to select your profile picture.",
            [
                { text: "Cancel", style: "cancel" },
                { 
                    text: "Gallery", 
                    onPress: () => launchImageLibrary(options, handleImagePickerResponse) 
                },
                { 
                    text: "Camera", 
                    onPress: async () => {
                        const hasPermission = await requestCameraPermission();
                        if (hasPermission) {
                            launchCamera(options, handleImagePickerResponse);
                        } else {
                            Alert.alert(
                                'Permission Denied', 
                                'Camera permission is required to take photos. Please enable it in your device settings.',
                                [{ text: 'OK' }]
                            );
                        }
                    }
                }
            ]
        );
    };

    const handleImagePickerResponse = (response: ImagePickerResponse) => {
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.errorCode) {
            console.error('ImagePicker Error: ', response.errorMessage);
            Alert.alert('Image Error', response.errorMessage || 'An error occurred selecting image.');
        } else if (response.assets && response.assets.length > 0) {
            const selectedImageUri = response.assets[0].uri;
            if (selectedImageUri) {
                setProfileImageUrl(selectedImageUri); // My setter is setProfileImageUrl
            }
        }
    };

    const ContextValue : UserContextType = {
        username,
        setUsername,
        isDarkMode,
        toggleDarkMode,
        email,
        setEmail,
        bio,
        setBio,
        profileImageUrl,
        setProfileImageUrl,
        pickImage,
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
    if (context === undefined) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
}