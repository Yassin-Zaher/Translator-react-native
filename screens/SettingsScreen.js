import { StatusBar } from "expo-status-bar";
import { Alert, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import SettingsItem from "../components/SettingsItem";
import colors from "../utils/colors";
import { useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { clearHistory } from "../store/historySlice";
import { clearSavedItems } from "../store/savedItemSlice";
export default function SettingsScreen() {
  const dispatch = useDispatch();
  const deleteHistory = useCallback(async () => {
    try {
      await AsyncStorage.setItem("history", JSON.stringify([]));
      dispatch(clearHistory());
      Alert.alert("Success", "History Cleared");
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  const deleteSavedItems = useCallback(async () => {
    try {
      await AsyncStorage.setItem("savedItems", JSON.stringify([]));
      dispatch(clearSavedItems());
      Alert.alert("Success", "Saved items cleared");
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);
  return (
    <View style={styles.container}>
      <SettingsItem
        title="Clear history"
        subTitle="Clear all items from history"
        iconFamily={AntDesign}
        icon="delete"
        onPress={deleteHistory}
      />
      <SettingsItem
        title="Clear all saved items"
        subTitle="Clear all saved items from history"
        iconFamily={AntDesign}
        icon="delete"
        onPress={deleteSavedItems}
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
