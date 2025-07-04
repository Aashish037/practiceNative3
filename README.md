
# practiceNative3

This repository showcases a structured React Native application, ready for cross-platform mobile development. It features a modular architecture, global state management with Context API, and strong type safety using TypeScript.

## 🌟 Features

  * **Cross-Platform**: Built for both Android and iOS.
  * **Modular Screens**: Organized UI components in `screens/` for maintainability.
  * **Global State**: `UserContext` for managing application-wide data.
  * **Type Safety**: TypeScript for robust code and early error detection.
  * **Clean Structure**: Clear separation of concerns with dedicated `screens/`, `context/`, and `types/` directories.
  * **Native Integration**: Standard Android and iOS project setups for native module linking.
  * **Testing**: Configured with Jest for unit testing.
  * **Code Quality**: ESLint and Prettier for consistent code style.

-----

## 🛠️ Setup & Installation

### Prerequisites

Ensure you have **Node.js**, **Watchman**, **JDK (for Android)**, **Android Studio**, and **Xcode (for iOS on macOS)** installed and configured. Refer to the official [React Native environment setup guide](https://reactnative.dev/docs/environment-setup) for detailed instructions.

### Install React Native CLI

While not strictly required for existing projects, you might need it for global commands or new project creation. You can install it globally:

```bash
npm install -g react-native-cli
# OR, using Yarn:
# yarn global add react-native-cli
```

### Project Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Aashish037/practiceNative3.git
    cd aashish037-practicenative3
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # OR: yarn install
    ```
3.  **For iOS (macOS only): Install Pods:**
    ```bash
    cd ios
    pod install
    cd ..
    ```

-----

## 🚀 Running the Application

1.  **Start the Metro bundler:**
    ```bash
    npm start
    # OR: yarn start
    ```
2.  **In a new terminal, run on a platform:**
      * **Android:** `npm run android` (ensure emulator/device is ready)
      * **iOS (macOS):** `npm run ios` (ensure simulator/device is ready)

-----

## 📚 What You'll Learn

This project is a great learning resource for:

  * **React Native Fundamentals**: Understanding the core structure of a React Native app.
  * **Modular Design**: How to organize your UI into reusable screens.
  * **State Management**: Implementing `React Context` for global data sharing.
  * **TypeScript**: Applying strong typing for more reliable code.
  * **Platform-Specific Development**: Insights into the `android/` and `ios/` folders for native configurations.
  * **Development Workflow**: Using essential tools like Babel, Metro, ESLint, Prettier, and Jest.

-----

### How to Copy and Make This Your `README.md`

1.  **Copy the Content**: Select and copy all the text above (from `# practiceNative3` to the end of `Development Workflow`).
2.  **Open `README.md`**: Navigate to the root of your `aashish037-practicenative3/` directory and open the `README.md` file in a text editor (like VS Code, Sublime Text, etc.).
3.  **Replace Content**: Delete all existing content in `README.md` and paste the copied text.
4.  **Save the File**: Save the `README.md` file.
5.  **Commit and Push**: If you're using Git, you'll want to commit these changes and push them to your GitHub repository so the updated README appears online:
    ```bash
    git add README.md
    git commit -m "Update README with project features and setup guide"
    git push origin main # Or master, depending on your branch name
    ```
