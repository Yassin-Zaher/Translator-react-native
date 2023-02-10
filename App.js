import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import SavedScreen from "./screens/SavedScreen";
import SettingsScreen from "./screens/SettingsScreen";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <Stack.Navigator>
          <Stack.Group>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerTitle: "Translate" }}
            />
            <Stack.Screen name="Notifications" component={SavedScreen} />
            <Stack.Screen name="Profile" component={SettingsScreen} />
          </Stack.Group>
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
