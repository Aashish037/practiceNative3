import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'
import { useUserContext } from '../src/context/UserContext' // Assuming you have a UserContext for user data

const ProfileScreen = () => {
    const { username, setUsername, isDarkMode } = useUserContext();

    // Example of how you might change username from here (though Settings is more appropriate)
    // This is just a temporary function to demonstrate changing the username
    const handleChangeUsername = () => {
        const newName = username === 'Guest' ? 'John Doe' : 'Guest';
        setUsername(newName);
    };

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <Text style={[styles.title, isDarkMode && styles.darkText]}>Your Profile</Text>
            <Text style={[styles.text, isDarkMode && styles.darkText]}>Username: {username}</Text>
            <Text style={[styles.text, isDarkMode && styles.darkText]}>
                Dark Mode: {isDarkMode ? 'Enabled' : 'Disabled'}
            </Text>
            <Button title="Change Username (Temp)" onPress={handleChangeUsername} />

        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffe4e1', // Light background
    },
    darkContainer: {
        backgroundColor: '#444', // Dark background
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    text: {
        fontSize: 20,
        marginBottom: 10,
        color: '#333',
    },
    darkText: {
        color: '#fff',
    },
});