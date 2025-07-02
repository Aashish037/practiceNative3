// App.tsx
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons' // Corrected typo: Ionicons
import { RootStackParamList, BottomTabParamList } from './src/types/navigation'
import { Userprovider } from './src/context/UserContext'

// import screens
import HomeScreen from './screens/HomeScreen'
import SettingsScreen from './screens/SettingsScreen'
import ProfileScreen from './screens/ProfileScreen'
import ExploreScreen from './screens/ExploreScreen' // Assuming you have this screen now



const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator<BottomTabParamList>()

type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
  routeName: keyof BottomTabParamList; // Pass the route name explicitly
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
          // Call the extracted function, passing necessary props
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


const App = () => {
  return (
    <SafeAreaProvider>
      <Userprovider>
        {/* Wrap the entire app in Userprovider to provide context */}
        <NavigationContainer>
          <Stack.Navigator initialRouteName="MainTabs" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTabs" component={MainTabs} />
          </Stack.Navigator>
        </NavigationContainer>
      </Userprovider>
    </SafeAreaProvider>
  )
}

export default App