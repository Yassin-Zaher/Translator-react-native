import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  HeaderButtons,
  Item,
  HeaderButton,
  itemComponent,
} from "react-navigation-header-buttons";
import colors from "../utils/colors";
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
