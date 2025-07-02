import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useUserContext } from '../src/context/UserContext'

const HomeScreen = () => {
    const { username, isDarkMode } = useUserContext(); //context hook to access user context
    // username and isDarkMode are destructured from the context
    // This allows us to use the username and dark mode state in this component
    // username is the user's name, and isDarkMode is a boolean indicating if dark mode is enabled
    // This component displays a welcome message and the current dark mode status
    
    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <Text style={[styles.text, isDarkMode && styles.darkText]}>
                Welcome to your Dashboard, {username}!
            </Text>
            <Text style={[styles.text, isDarkMode && styles.darkText, styles.subtitle]}>
                {isDarkMode ? 'Dark Mode is ON' : 'Dark Mode is OFF'}
            </Text>
        </View>
    );
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f8ff', // Light background
    },
    darkContainer: {
        backgroundColor: '#333', // Dark background
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333', // Light text
    },
    darkText: {
        color: '#fff', // Dark text
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'normal',
        marginTop: 10,
    }
});