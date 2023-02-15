import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import SettingsItem from "../components/SettingsItem";
import colors from "../utils/colors";
export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <SettingsItem
        title="Clear history"
        subTitle="Clear all items from history"
        iconFamily={AntDesign}
        icon="delete"
      />
      <SettingsItem
        title="Clear all saved items"
        subTitle="Clear all saved items from history"
        iconFamily={AntDesign}
        icon="delete"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBackground,
  },
});
