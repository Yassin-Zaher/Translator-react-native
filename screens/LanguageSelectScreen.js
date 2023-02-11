import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
export default function LanguageSelectScreen() {
  return (
    <View style={styles.container}>
      <Text>Language Select Screen</Text>
      <StatusBar style="auto" />
    </View>
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
