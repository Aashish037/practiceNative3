// App.tsx
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { RootStackParamList, BottomTabParamList } from './src/types/navigation'
import { UserProvider, useUserContext } from './src/context/UserContext' // IMPORT useUserContext here
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native' // IMPORT these for loading screen

// import screens
import HomeScreen from './screens/HomeScreen'
import SettingsScreen from './screens/SettingsScreen'
import ProfileScreen from './screens/ProfileScreen'
import ExploreScreen from './screens/ExploreScreen'



const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator<BottomTabParamList>()

type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
  routeName: keyof BottomTabParamList;
}

const getTabBarIcon = ({ focused, color, size, routeName }: TabBarIconProps) => {
  let iconName: string = '';

  if (routeName === 'HomeTab') {
    iconName = focused ? 'home' : 'home-outline'
  } else if (routeName === 'ProfileTab') {
    iconName = focused ? 'person' : 'person-outline'
  } else if (routeName === 'ExploreTab') {
    iconName = focused ? 'search' : 'search-outline'
  } else if (routeName === 'SettingsTab') {
    iconName = focused ? 'settings' : 'settings-outline'
  }

  return <Ionicons name={iconName} size={size} color={color} />
}



const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => (
          getTabBarIcon({ focused, color, size, routeName: route.name })
        ),
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          paddingBottom: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          paddingBottom: 2,
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
      <Tab.Screen
        name="ExploreTab"
        component={ExploreScreen}
        options={{ title: 'Explore' }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </Tab.Navigator>
  )
}

// --- NEW COMPONENT: AppContent to handle loading state ---
const AppContent = () => {
  const { isLoading, isDarkMode } = useUserContext(); // Get isLoading and isDarkMode from context

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, isDarkMode && styles.darkLoadingContainer]}>
        <ActivityIndicator size="large" color={isDarkMode ? '#007aff' : '#0000ff'} />
        <Text style={[styles.loadingText, isDarkMode && styles.darkLoadingText]}>Loading user data...</Text>
      </View>
    );
  }

  // If not loading, render the main navigation
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainTabs" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


const App = () => {
  return (
    <SafeAreaProvider>
      <UserProvider>
        {/* Render AppContent, which handles the loading state */}
        <AppContent />
      </UserProvider>
    </SafeAreaProvider>
  )
};

export default App

// --- NEW STYLES FOR LOADING SCREEN ---
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f2f5', // Light background for loading screen
  },
  darkLoadingContainer: {
    backgroundColor: '#1c1c1e', // Dark background for loading screen
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#333',
  },
  darkLoadingText: {
    color: '#fff',
  },
});