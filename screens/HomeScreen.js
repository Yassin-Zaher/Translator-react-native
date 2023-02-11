import { StatusBar } from "expo-status-bar";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../utils/colors";
import { useState } from "react";
export default function HomeScreen(props) {
  const [enteredText, setEnteredText] = useState("");
  const [resultText, setResultText] = useState("");
  return (
    <View style={styles.container}>
      <View style={styles.languageContainer}>
        <TouchableOpacity
          style={styles.languageOption}
          onPress={() => props.navigation.navigate("LanguageSelect")}
        >
          <Text style={styles.languageOptionText}>English</Text>
        </TouchableOpacity>
        <View style={styles.arrowContainer}>
          <AntDesign name="arrowright" size={24} color={colors.lightGrey} />
        </View>
        <TouchableOpacity
          style={styles.languageOption}
          onPress={() => props.navigation.navigate("LanguageSelect")}
        >
          <Text style={styles.languageOptionText}>French</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          multiline
          placeholder="Enter text"
          style={styles.textInput}
          onChangeText={(text) => setEnteredText(text)}
        />
        <TouchableOpacity
          disabled={enteredText === ""}
          style={styles.iconContainer}
        >
          <Ionicons
            name="arrow-forward-circle"
            size={24}
            color={enteredText !== "" ? colors.priamry : colors.primaryDisabled}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.translatedTextContainer}>
        <TextInput style={styles.translatedText} />

        <TouchableOpacity
          disabled={resultText === ""}
          style={styles.iconContainer}
        >
          <MaterialIcons
            name="content-copy"
            size={24}
            color={
              resultText !== "" ? colors.textColor : colors.textColorDisabled
            }
          />
        </TouchableOpacity>
      </View>

      <View style={styles.historyContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  languageContainer: {
    flexDirection: "row",
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
  },
  languageOption: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
  },

  arrowContainer: {
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  languageOptionText: {
    color: colors.priamry,
    fontFamily: "regular",
    letterSpacing: 0.3,
  },
  inputContainer: {
    flexDirection: "row",
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
  },
  textInput: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontFamily: "regular",
    letterSpacing: 0.3,
    height: 90,
    color: colors.textColor,
  },
  iconContainer: {
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  translatedTextContainer: {
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
    flexDirection: "row",
    height: 90,
    paddingVertical: 15,
  },
  translatedText: {
    fontFamily: "regular",
    letterSpacing: 0.3,
    color: colors.priamry,
    flex: 1,
    marginHorizontal: 20,
  },
  historyContainer: {
    backgroundColor: colors.greyBackground,
    flex: 1,
    padding: 10,
  },
});
