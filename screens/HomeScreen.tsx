import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.text}>HomeScreen</Text>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
     safeArea: { // New style for SafeAreaView
        flex: 1, // Crucial: Makes SafeAreaView take up all available screen space
        backgroundColor: '#fff', // Or whatever base background you want for the whole screen
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    text: {
        fontSize: 24,
        color: '#333',
    },
});