import { 
    View,
    Text,
    Button,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput
    } from 'react-native'

import { useUserContext } from '../src/context/UserContext' // Assuming you have a UserContext for user data
import React,  { useState, useEffect } from 'react';
// import { launchImageLibrary, launchCamera, ImagePickerResponse } from 'react-native-image-picker';

const ProfileScreen = () => {
    const { username, setUsername, isDarkMode, email, setEmail, bio, setBio, profileImageUrl, pickImage } = useUserContext();

    // making state for the editable part of the profile
    const [editableUsername, setEditableUsername] = useState(username);
    const [editableEmail, setEditableEmail] = useState(email);
    const [editableBio, setEditableBio] = useState(bio);

    // detailing with the error
    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [bioError, setBioError] = useState<string | null>(null);


    //useEffect to handle changes in username and email
    useEffect(() => {
        setEditableUsername(username);
        setEditableEmail(email);
        setEditableBio(bio);
        // You can add more fields as needed
    },[username, email, bio]);

    // function to validate username and email
    const validateUsername = (name:string) => {
        if (name.trim().length === 0) {
        setUsernameError('Username cannot be empty.');
        return false;
        }
        setUsernameError(null);
        return true;
    };

    const validateEmail = (mail:string) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation regex
        if (mail.trim().length === 0) {
            setEmailError('Email cannot be empty.');
            return false;
        }
        if (!emailPattern.test(mail)) {
            setEmailError('Invalid email format.');
            return false;
        }
        setEmailError(null);
        return true;
    };

    const validateBio = (b:string) => {
        if (b.trim().length === 0) {
            setBioError('Bio cannot be empty.');
            return false;
        }
        setBioError(null);
        return true;
    };

    const handleSaveProfile = () => {
        const isUsernamevalid = validateUsername(editableUsername);
        const isEmailValid = validateEmail(editableEmail);
        const isBioValid = validateBio(editableBio);

        if (isUsernamevalid && isEmailValid && isBioValid) {
            setUsername(editableUsername);
            setEmail(editableEmail);
            setBio(editableBio);
            // You can also save the profileImageUrl if needed
            // setProfileImageUrl(profileImageUrl);
            console.log('Profile updated successfully!');
            Alert.alert('Profile Updated', 'Your profile has been updated successfully.');
        } else {
            console.log('Profile update failed due to validation errors.');
            Alert.alert('Profile Update Failed', 'Please fix the errors before saving your profile.');
        }
    }

    return(
        <KeyboardAvoidingView
            style={[styles.fullScreenContainer, isDarkMode && styles.darkContainer]}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={[styles.contentWrapper, isDarkMode && styles.darkContainer]}>
                    <Text style={[styles.title, isDarkMode && styles.darkText]}> Edit Profile</Text>

                    {/* Profile images Section  */}
                    <TouchableOpacity onPress={pickImage} style={styles.imagePickerContainer}>
                        {profileImageUrl ? (
                            <Image
                                source={{ uri: profileImageUrl }}
                                style={styles.profileImage}
                            />
                        ) : (
                            <View style={[styles.profileImage, styles.placeholderImage]}>
                                <Text style={styles.placeholderText}>📷</Text>
                                <Text style={styles.addPhotoText}>Add Photo</Text>
                            </View>
                        )}
                        <Text style={[styles.changeImageText, isDarkMode && styles.darkText]}>Change Profile Picture</Text>
                    </TouchableOpacity>


                    {/* Username input */}
                    <View>
                        <Text style={[styles.label, isDarkMode && styles.darkText]}>Username:</Text>
                        <TextInput
                            style={[styles.input, isDarkMode && styles.darkInput, usernameError && styles.inputError]}
                            onChangeText={(text) => {
                                setEditableUsername(text);
                                validateUsername(text);
                            }}
                            value={editableUsername}
                            placeholder="Enter your username"
                            placeholderTextColor={isDarkMode ? '#bbb' : '#888'}
                        />
                        {usernameError && <Text style={styles.errorText}>{usernameError}</Text>}
                    </View>

                    {/* Email input */}
                    <View>
                        <Text style={[styles.label, isDarkMode && styles.darkText]}>Email:</Text>
                        <TextInput
                            style={[styles.input, isDarkMode && styles.darkInput, emailError && styles.inputError]}
                            onChangeText={(text) => {
                                setEditableEmail(text);
                                validateEmail(text);
                            }}
                            value={editableEmail}
                            placeholder="Enter your email"
                            placeholderTextColor={isDarkMode ? '#bbb' : '#888'}
                        />
                        {emailError && <Text style={styles.errorText}>{emailError}</Text>}
                    </View>

                    {/* Bio input */}
                    <View> 
                        <Text style={[styles.label, isDarkMode && styles.darkText]}>Bio:</Text>
                        <TextInput
                            style={[styles.input, isDarkMode && styles.darkInput, bioError && styles.inputError]}
                            onChangeText={(text) => {
                                setEditableBio(text);
                                validateBio(text);
                            }}
                            value={editableBio}
                            placeholder="Tell us about yourself"
                            placeholderTextColor={isDarkMode ? '#bbb' : '#888'}
                            multiline={true}
                            numberOfLines={4}
                            textAlignVertical="top"
                        />
                        {bioError && <Text style={styles.errorText}>{bioError}</Text>}
                    </View>
                    <Button
                        title="Save Profile"
                        onPress={handleSaveProfile}
                        color={isDarkMode ? '#f5f' : '#007bff'} // Button color based on dark mode
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
};

export default ProfileScreen;

const styles = StyleSheet.create({
    fullScreenContainer: { // This will hold the full screen background color
        flex: 1,
        backgroundColor: '#add8e6', // Light background color for the entire screen
    },
    darkContainer: { // This overrides for dark mode
        backgroundColor: '#1a1a1a', // Dark background color for the entire screen
    },
    scrollContent: { // Content container for ScrollView
        flexGrow: 1, // Allows content to grow and push to edges if needed
        paddingHorizontal: 20, // Add horizontal padding for the content
        paddingVertical: 30, // Add vertical padding
        // No longer center content vertically, let it start from top
    },
    contentWrapper: { // New wrapper for form content to apply inner padding/styling
        backgroundColor: 'transparent', // Make this wrapper transparent so fullScreenContainer's background shows
        width: '100%', // Take full width of scrollContent
        maxWidth: 600, // Optional: Limit max width for large screens/tablets for better readability
        alignSelf: 'center', // Center contentWrapper if maxWidth is set
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    darkText: {
        color: '#eee',
    },
    imagePickerContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#e0e0e0',
        borderWidth: 2,
        borderColor: '#ccc', // Border remains light for contrast
    },
    placeholderImage: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    placeholderText: {
        fontSize: 30,
        color: '#999',
        marginBottom: 5,
    },
    addPhotoText: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
    },
    changeImageText: {
        marginTop: 10,
        color: '#007aff', // iOS blue
        fontSize: 16,
        fontWeight: 'bold',
    },
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#555',
    },
    input: {
        height: 45,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        color: '#333',
        backgroundColor: '#f9f9f9', // Light input background
    },
    darkInput: {
        borderColor: '#555',
        backgroundColor: '#3a3a3a', // Dark input background
        color: '#eee',
    },
    bioInput: {
        height: 100,
        textAlignVertical: 'top',
        paddingVertical: 10,
    },
    inputError: {
        borderColor: 'red',
        borderWidth: 2,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
});