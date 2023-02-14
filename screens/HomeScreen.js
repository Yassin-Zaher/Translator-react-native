import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Button,
  FlatList,
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
import { useCallback, useEffect, useState } from "react";
import supportedLanguages from "../utils/supportedLanguages";
import * as Clipboard from "expo-clipboard";
import uuid from "react-native-uuid";

import { translate } from "@vitalets/google-translate-api";
import { useDispatch, useSelector } from "react-redux";
import { addHistoryItem, setHistoryItems } from "../store/historySlice";
import TranslationResult from "../components/TranslationResult";
import AsyncStorage from "@react-native-async-storage/async-storage";

const loadData = () => {
  return async (dispatch) => {
    try {
      const historyString = await AsyncStorage.getItem("history");
      if (historyString !== null) {
        const history = JSON.parse(historyString);
        console.log(history[0]);
        dispatch(setHistoryItems({ items: history }));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export default function HomeScreen(props) {
  const params = props.route.params || {};
  const dispatch = useDispatch();
  const history = useSelector((state) => state.history.items);

  const [enteredText, setEnteredText] = useState("");
  const [resultText, setResultText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [languageTo, setLangugeTo] = useState("fr");
  const [languageFrom, setLangugeFrom] = useState("en");

  useEffect(() => {
    if (params.languageFrom) {
      setLangugeFrom(params.languageFrom);
    }
    if (params.languageTo) {
      setLangugeTo(params.languageTo);
    }
  }, [params.languageTo, params.languageFrom]);

  useEffect(() => {
    dispatch(loadData());
  }, [dispatch]);

  // save items tp local storage
  useEffect(() => {
    const saveHistoryItems = async () => {
      try {
        await AsyncStorage.setItem("history", JSON.stringify(history));
      } catch (err) {
        console.log(err);
      }
    };
    saveHistoryItems();
  }, [history]);

  const onSubmitForm = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await translate(enteredText, {
        to: languageTo,
        from: languageFrom,
      });
      const { text } = result;
      if (!text) {
        setResultText("Error tranlating, please try later");
        return;
      }
      setResultText(text);

      const id = uuid.v4();
      result.id = id;
      result.dateTime = new Date().toISOString();
      result.originalText = enteredText;
      dispatch(addHistoryItem({ item: result }));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }

    // => 'Hello World! How are you?'
  }, [enteredText, languageTo, languageFrom]);

  const LoadTraslateComponent = () => {
    return (
      <Text>
        Translating ...
        <ActivityIndicator />
      </Text>
    );
  };

  const copieTextToClipBoard = useCallback(async () => {
    await Clipboard.setStringAsync(resultText);
  });

  return (
    <View style={styles.container}>
      <View style={styles.languageContainer}>
        <TouchableOpacity
          style={styles.languageOption}
          onPress={() =>
            props.navigation.navigate("LanguageSelect", {
              title: "Translate From",
              selected: languageFrom,
              mode: "from",
            })
          }
        >
          <Text style={styles.languageOptionText}>
            {supportedLanguages[languageFrom]}
          </Text>
        </TouchableOpacity>
        <View style={styles.arrowContainer}>
          <AntDesign name="arrowright" size={24} color={colors.lightGrey} />
        </View>
        <TouchableOpacity
          style={styles.languageOption}
          onPress={() =>
            props.navigation.navigate("LanguageSelect", {
              title: "Translate To",
              selected: languageTo,
              mode: "to",
            })
          }
        >
          <Text style={styles.languageOptionText}>
            {supportedLanguages[languageTo]}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          multiline
          placeholder="Enter text"
          style={styles.textInput}
          onChangeText={(text) => {
            if (enteredText.length === 1) {
              setResultText("");
            }
            setEnteredText(text);
          }}
        />
        <TouchableOpacity
          onPress={onSubmitForm}
          disabled={enteredText === ""}
          style={styles.iconContainer}
        >
          {isLoading ? (
            <LoadTraslateComponent />
          ) : (
            <Ionicons
              name="arrow-forward-circle"
              size={24}
              color={
                enteredText !== "" ? colors.priamry : colors.primaryDisabled
              }
            />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.translatedTextContainer}>
        <TextInput
          style={styles.translatedText}
          value={resultText}
          allowFontScaling={true}
        />

        <TouchableOpacity
          onPress={() => copieTextToClipBoard()}
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

      <View style={styles.historyContainer}>
        <FlatList
          data={history.slice().reverse()}
          renderItem={(itemData) => {
            return <TranslationResult itemId={itemData.item.id} />;
          }}
        />
      </View>
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
