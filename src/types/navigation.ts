// -----during stack navigation --------
// import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// // Define a type for your Root Stack Navigator's routes and their parameters
// // If a screen doesn't have any parameters, use 'undefined'
// export type RootStackParamList = {
//   Home: undefined; // Home screen takes no parameters
//   Profile: undefined; // Profile screen takes no parameters for now
//   // Add other screens here, e.g., Details: { itemId: string; };
// };

// // This type is specifically for the navigation prop of a screen
// // T is the name of the route (e.g., 'Home', 'Profile')
// export type RootStackScreenProps<T extends keyof RootStackParamList> =
//   NativeStackScreenProps<RootStackParamList, T>;


import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'; // Import this

// 1. Define your Root Stack Param List (if you still want a stack outside the tabs)
// For this example, we'll make the Tabs the primary navigator, so RootStackParamList
// will contain a single entry for the Tabs.
export type RootStackParamList = {
  MainTabs: undefined; // This will be the name of our tab navigator route
  // If you had other screens outside the tabs (e.g., an Auth screen), they'd go here:
  // Auth: undefined;
};

// 2. Define your Bottom Tab Param List
// This defines the screens that will be part of your tab navigator
export type BottomTabParamList = {
  HomeTab: undefined; // The name of the Home tab screen
  ProfileTab: undefined; // The name of the Profile tab screen
  ExploreTab: undefined;    // The name of the Explore tab screen
  SettingsTab: undefined; // The name of the Settings tab screen
};

// 3. Type for screens within the Root Stack (if applicable)
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

// 4. Type for screens within the Bottom Tab Navigator
export type BottomTabScreenPropsType<T extends keyof BottomTabParamList> =
  BottomTabScreenProps<BottomTabParamList, T>;

// You might also want a combined type for navigation if a screen can navigate across navigators
// This is more advanced, but useful:
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}