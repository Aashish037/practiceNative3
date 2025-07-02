import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, ActivityIndicator } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useUserContext } from '../src/context/UserContext'
import { Post } from '../src/types/data'

const ExploreScreen = () => {

    const { isDarkMode } = useUserContext();

    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
    const fetchPosts = async () => {
        try {
            setLoading(true); // Set loading to true before starting fetch
            setError(null);   // Clear any previous errors

            const response = await fetch('https://jsonplaceholder.typicode.com/posts');

            // Check if the network request was successful
            if (!response.ok) {
            // If response.ok is false (e.g., 404, 500 status codes)
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Parse the JSON response
            const data: Post[] = await response.json(); // Explicitly type the parsed JSON
            setPosts(data); // Update state with fetched posts
        } catch (e: any) { // Catch any errors during fetch or JSON parsing
            console.error("Failed to fetch posts:", e); // Log for debugging
            setError(e.message || 'An unknown error occurred'); // Set error message
        } finally {
            setLoading(false); // Set loading to false regardless of success or failure
        }
        };

    fetchPosts();
    }, []);


  // 3. Conditional Rendering based on state
    if (loading) {
        return (
        <View style={[styles.container, styles.loadingErrorContainer, isDarkMode && styles.darkContainer]}>
            <ActivityIndicator size="large" color={isDarkMode ? '#fff' : '#0000ff'} />
            <Text style={[styles.statusText, isDarkMode && styles.darkText]}>Loading posts...</Text>
        </View>
        );
    }

    if (error) {
        return (
        <View style={[styles.container, styles.loadingErrorContainer, isDarkMode && styles.darkContainer]}>
            <Text style={[styles.statusText, styles.errorText]}>Error: {error}</Text>
            <Text style={[styles.statusText, isDarkMode && styles.darkText]}>Please try again later.</Text>
            {/* You could add a retry button here */}
        </View>
        );
    }

    // 4. Render the list of posts using FlatList
    const renderItem = ({ item }: { item: Post }) => ( // Explicitly type 'item' in renderItem
        <TouchableOpacity
        style={[styles.postItem, isDarkMode && styles.darkPostItem]}
        onPress={() => Alert.alert(item.title, item.body)} // Simple alert on press
        >
        <Text style={[styles.postTitle, isDarkMode && styles.darkText]}>{item.title}</Text>
        <Text style={[styles.postBody, isDarkMode && styles.darkText]}>{item.body.substring(0, 100)}...</Text>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
        <Text style={[styles.screenTitle, isDarkMode && styles.darkText]}>Explore Posts</Text>
        <FlatList
            data={posts}          // The array of data to render
            renderItem={renderItem} // Function to render each item
            keyExtractor={(item) => item.id.toString()} // Unique key for each item
            contentContainerStyle={styles.listContentContainer} // Style for the content inside FlatList
        />
        </View>
    );

}

export default ExploreScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#add8e6', // Light Blue default
        paddingTop: 20, // Add some padding from the top
    },
    darkContainer: {
        backgroundColor: '#1a1a1a', // Very dark gray
    },
    loadingErrorContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusText: {
        marginTop: 10,
        fontSize: 18,
        color: '#333',
    },
    darkText: {
        color: '#fff',
    },
    errorText: {
        color: 'red',
        fontWeight: 'bold',
    },
    screenTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    listContentContainer: {
        paddingHorizontal: 10,
        paddingBottom: 20, // Add some space at the bottom for scrolling
    },
    postItem: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000', // For subtle shadow effect
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2, // For Android shadow
    },
    darkPostItem: {
        backgroundColor: '#333',
        borderColor: '#555',
    },
    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    postBody: {
        fontSize: 14,
        color: '#666',
    },
});