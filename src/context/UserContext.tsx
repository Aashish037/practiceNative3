import React, {useContext, createContext, useState, ReactNode, useEffect} from "react";
import { Alert, PermissionsAndroid, Platform } from "react-native";
import {launchImageLibrary, ImagePickerResponse, launchCamera, MediaType} from 'react-native-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";

// defining the async storage key for user data
const USERNAME_KEY = "@user_username";
const EMAIL_KEY = "@user_email";
const BIO_KEY = "@user_bio";
const PROFILE_IMAGE_KEY = "@user_profileImage";
const DARK_MODE_KEY = "@app_darkMode";


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
    isLoading: boolean; // Optional: to track loading state if needed

}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

// UserProvider component
export const UserProvider = ({children}: UserProviderProps) => {
    const [username, setUsername] = useState<string>("Guest");
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    // adding new states
    const [email, setEmail] = useState<string>("");
    const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
    const [bio, setBio] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false); // Optional: to track loading state if needed

    // Aync save function
    // this function will save the userdata to local data
    const saveUsernameToStorage = async (name: string) => {
        try {
            await AsyncStorage.setItem(USERNAME_KEY, name);
        } catch (error) {
            console.error("Error saving username to storage:", error);
        }
    }

    const saveEmailToStorage = async (mail: string) => {
        try {
            await AsyncStorage.setItem(EMAIL_KEY, mail);
        } catch (error) {
            console.error("Error saving email to storage:", error);
        }
    }

    const saveBioToStorage = async (bioText: string) => {
        try {
            await AsyncStorage.setItem(BIO_KEY, bioText);
        } catch (error) {
            console.error("Error saving bio to storage:", error);
        }
    }

    const saveProfileToStorage = async (uri: string | null) => {
        try {
            if (uri) {
                // If the URI is null, remove the profile image from storage
                await AsyncStorage.setItem(PROFILE_IMAGE_KEY, uri);
            } else {
                await AsyncStorage.removeItem(PROFILE_IMAGE_KEY);
            } console.log("Profile image saved to storage:", uri);
        } catch (error) {
            console.error("Error saving profile image to storage:", error);
        }
    }

    const saveDarkModeToStorage = async (darkMode: boolean) => {
        try {
           await AsyncStorage.setItem(DARK_MODE_KEY, String(darkMode)); // AsyncStorage stores strings
            console.log('Dark mode saved to storage:', darkMode);
        } catch (error) {
            console.error("Error saving dark mode to storage:", error);
        }
    }

    // Function to set username and save it to AsyncStorage
    // This function updates the username state and saves it to AsyncStorage
    const setUserName = (name: string) => {
        setUsername(name);
        saveUsernameToStorage(name); // Save username to AsyncStorage
    }

    const setMail = (mail: string) => {
        setEmail(mail);
        saveEmailToStorage(mail); // Save email to AsyncStorage
    }

    const setUserBio = (bioText: string) => {
        setBio(bioText);
        saveBioToStorage(bioText); // Save bio to AsyncStorage
    }

    const setUserProfileImageUrl = (uri: string | null) => {
        setProfileImageUrl(uri);
        saveProfileToStorage(uri);
    }

    const buttonDarkMode = () => {
        setIsDarkMode(prevMode => {
            const newMode = !prevMode;
            saveDarkModeToStorage(newMode);
            return newMode;
        }); // Save dark mode preference to AsyncStorage
    }


    // useEffect to load initial data from AsyncStorage when the component mounts
    // This effect runs once when the component mounts
    useEffect(() => {
        // Load initial data from AsyncStorage when the component mounts
        const loadInitialData = async () => {
            try {
                const storedUsername = await AsyncStorage.getItem(USERNAME_KEY);
                const storedEmail = await AsyncStorage.getItem(EMAIL_KEY);
                const storedBio = await AsyncStorage.getItem(BIO_KEY);
                const storedProfileImage = await AsyncStorage.getItem(PROFILE_IMAGE_KEY);
                const storedDarkMode = await AsyncStorage.getItem(DARK_MODE_KEY);

                if (storedUsername) setUsername(storedUsername);
                if (storedEmail) setEmail(storedEmail);
                if (storedBio) setBio(storedBio);
                if (storedProfileImage) setProfileImageUrl(storedProfileImage);
                if (storedDarkMode !== null) setIsDarkMode(storedDarkMode === 'true');
            } catch (error) {
                console.error("Error loading initial data from storage:", error);
            } finally {
                setIsLoading(false); // Set loading to false after data is loaded
            }
        };

        loadInitialData();
    }, [])

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

    // --- Camera/Gallery Permissions and Image Picking Logic ---
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
        // iOS permissions are handled automatically by launchCamera/launchImageLibrary prompt
        return true;
    };

    const ContextValue : UserContextType = {
        username,
        setUsername: setUserName, // Map to the actual function
        isDarkMode,
        toggleDarkMode: buttonDarkMode, // Map to the actual function
        email,
        setEmail: setMail, // Map to the actual function
        bio,
        setBio: setUserBio, // Map to the actual function
        profileImageUrl,
        setProfileImageUrl: setUserProfileImageUrl, // Map to the actual function
        pickImage,
        isLoading
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