import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import {
  HeaderButtons,
  Item,
  HeaderButton,
  itemComponent,
} from "react-navigation-header-buttons";
import LanguageItem from "../components/LanguageItem";
import colors from "../utils/colors";
import supportedLanguages from "../utils/supportedLanguages";
export default function LanguageSelectScreen({ navigation, route }) {
  const params = route.params || {};
  const { title } = params;
  const CustomHeaderButton = (props) => {
    return (
      <HeaderButton
        {...props}
        itemComponent={Ionicons}
        iconSize={23}
        color={props.color || colors.priamry}
      ></HeaderButton>
    );
  };
  useEffect(() => {
    navigation.setOptions({
      headerTitle: title,
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              iconName="close"
              color={colors.textColor}
              onPress={() => navigation.goBack()}
            ></Item>
          </HeaderButtons>
        );
      },
    });
  }, []);
  return (
    <View style={styles.container}>
      {
        <FlatList
          data={Object.keys(supportedLanguages)}
          renderItem={(itemData) => {
            const languageKey = itemData.item;
            const languageString = supportedLanguages[languageKey];
            return <LanguageItem text={languageString} />;
          }}
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
