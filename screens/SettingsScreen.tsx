import { View, Text, Switch, StyleSheet,  } from 'react-native'
import React  from 'react'
import { useUserContext } from '../src/context/UserContext' // Assuming you have a UserContext for user data

const SettingsScreen = () => {

    const { isDarkMode, toggleDarkMode } = useUserContext();

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <Text style={[styles.text, isDarkMode && styles.darkText]}> App Settings</Text>

            <View style={styles.settingItem}>
                <Text style={[styles.settingLabel, isDarkMode && styles.darkText]}>Dark Mode</Text>
                <Switch
                onValueChange={toggleDarkMode} // Updates global isDarkMode state
                value={isDarkMode}            // Reflects current global isDarkMode state
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isDarkMode ? '#81b0ff' : '#f4f3f4'}
                />
            </View>

            {/* <View style={styles.settingItem}>
                <Text style={[styles.settingLabel, isDarkMode && styles.darkText]}>Change Username</Text>
                <TextInput
                style={[styles.input, isDarkMode && styles.darkInput]}
                onChangeText={setNewUsername} // Updates local newUsername state
                value={newUsername}           // Reflects current local newUsername state
                placeholder="Enter new username"
                placeholderTextColor={isDarkMode ? '#bbb' : '#888'}
                />
                <Button title="Save Username" onPress={handleUsernameChange} /> {/* Updates global username state */}
            {/* </View> */} 

        </View>

    )
}

export default SettingsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#e0f7fa', // Light background
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333', // Light text
    },
    darkContainer: {
        backgroundColor: '#222', // Dark background
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        color: '#333',
    },
    darkText: {
        color: '#fff',
    },
    settingItem: {
        flexDirection: 'row', // Arrange children horizontally
        justifyContent: 'space-between', // Space out items
        alignItems: 'center', // Vertically align items in the center
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    settingLabel: {
        fontSize: 18,
        color: '#333',
    },
    input: {
        flex: 1, // Allows TextInput to take up available horizontal space
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginLeft: 15,
        marginRight: 10,
        color: '#333',
        backgroundColor: '#fff',
    },
    darkInput: {
        borderColor: '#555',
        backgroundColor: '#333',
        color: '#fff',
    },
});