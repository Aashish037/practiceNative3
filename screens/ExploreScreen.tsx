import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, ActivityIndicator, Image } from 'react-native'
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

            // --- calling API URL ---
            const response = await fetch('https://api.imgflip.com/get_memes'); // Fetching 10 memes
            // --- END calling API URL ---

            // Check if the network request was successful
            if (!response.ok) {
            // If response.ok is false (e.g., 404, 500 status codes)
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Parse the JSON response
            const json = await response.json(); // Parse as general JSON first
            console.log('API Response:', json); // Debug log

            // Check if the response has the expected structure
            if (json && json.success && json.data && Array.isArray(json.data.memes)) {
                const formattedMemes: Post[] = json.data.memes.slice(0, 10).map((meme: any) => ({
                    id: meme.id,
                    title: meme.name,
                    imageUrl: meme.url, // Directly use the image URL
                    body: `Meme template with ${meme.width}x${meme.height} dimensions` // Optional body with meme info
                }));
                setPosts(formattedMemes);
            } else {
                setError('Failed to fetch memes: Invalid data structure from API.');
            }
            

        } catch (e: any) { // Catch any errors during fetch or JSON parsing
            console.error("Failed to fetch memes:", e); // Log for debugging
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
            <Text style={[styles.statusText, isDarkMode && styles.darkText]}>Loading memes...</Text>
        </View>
        );
    }

    if (error) {
        return (
        <View style={[styles.container, styles.loadingErrorContainer, isDarkMode && styles.darkContainer]}>
            <Text style={[styles.statusText, styles.errorText]}>Error: {error}</Text>
            <Text style={[styles.statusText, isDarkMode && styles.darkText]}>Please try again later.</Text>
            <TouchableOpacity 
                style={[styles.retryButton, isDarkMode && styles.darkRetryButton]} 
                onPress={() => {
                    setError(null);
                    setLoading(true);
                    // Re-run the fetch
                    const fetchPosts = async () => {
                        try {
                            setLoading(true);
                            setError(null);
                            const response = await fetch('https://api.imgflip.com/get_memes');
                            if (!response.ok) {
                                throw new Error(`HTTP error! status: ${response.status}`);
                            }
                            const json = await response.json();
                            console.log('API Response:', json);
                            
                            if (json && json.success && json.data && Array.isArray(json.data.memes)) {
                                const formattedMemes: Post[] = json.data.memes.slice(0, 10).map((meme: any) => ({
                                    id: meme.id,
                                    title: meme.name,
                                    imageUrl: meme.url,
                                    body: `Meme template with ${meme.width}x${meme.height} dimensions`
                                }));
                                setPosts(formattedMemes);
                            } else {
                                setError('Failed to fetch memes: Invalid data structure from API.');
                            }
                        } catch (e: any) {
                            console.error("Failed to fetch memes:", e);
                            setError(e.message || 'An unknown error occurred');
                        } finally {
                            setLoading(false);
                        }
                    };
                    fetchPosts();
                }}
            >
                <Text style={[styles.retryButtonText, isDarkMode && styles.darkRetryButtonText]}>Retry</Text>
            </TouchableOpacity>
        </View>
        );
    }

    // 4. Render the list of posts using FlatList
    const renderItem = ({ item }: { item: Post }) => ( // Explicitly type 'item' in renderItem
        <TouchableOpacity
        style={[styles.postItem, isDarkMode && styles.darkPostItem]}
        onPress={() => Alert.alert(item.title, item.body || 'No description available')} // Handle optional body
        >
        <Image 
            source={{ uri: item.imageUrl }} 
            style={styles.memeImage} 
            resizeMode="contain"
        />
        <Text style={[styles.postTitle, isDarkMode && styles.darkText]}>{item.title}</Text>
        <Text style={[styles.postBody, isDarkMode && styles.darkText]}>
            {item.body ? item.body.substring(0, 100) + '...' : 'Tap to view meme details'}
        </Text>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
        <Text style={[styles.screenTitle, isDarkMode && styles.darkText]}>Explore Memes</Text>
        <FlatList
            data={posts}          // The array of data to render
            renderItem={renderItem} // Function to render each item
            // ---  3: Update keyExtractor for new API's ID ---
            
            keyExtractor={(item) => item.id.toString()} // Quotable API uses '_id' as a string
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
    memeImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 10,
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
    retryButton: {
        backgroundColor: '#007bff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 15,
    },
    darkRetryButton: {
        backgroundColor: '#555',
    },
    retryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    darkRetryButtonText: {
        color: '#fff',
    },
});