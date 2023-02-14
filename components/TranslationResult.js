import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../utils/colors";
import { Entypo } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { saveItem } from "../store/savedItemSlice";
import { useCallback } from "react";
export default function TranslationResult(props) {
  const dispatch = useDispatch();
  const { itemId } = props;
  const item = useSelector((state) =>
    state.history.items.find((item) => item.id === itemId)
  );
  const savedItems = useSelector((state) => state.savedItems.items);

  const isSaved = savedItems.some((i) => i.id === itemId);
  const icon = isSaved ? "star" : "star-outlined";
  const startItem = useCallback(() => {
    let newSavedItems;
    if (isSaved) {
      newSavedItems = savedItems.filter((i) => i.id !== itemId);
    } else {
      newSavedItems = savedItems.slice();
      newSavedItems.push(item);
    }
    dispatch(saveItem({ items: newSavedItems }));
  }, [dispatch, savedItems]);
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text numberOfLines={4} style={styles.title}>
          {item.originalText}
        </Text>
        <Text numberOfLines={4} style={styles.subTitle}>
          {item.text}
        </Text>
      </View>
      <TouchableOpacity style={styles.iconContainer} onPress={startItem}>
        <Entypo name={icon} size={24} color={colors.subTextColor} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    flexDirection: "row",
    backgroundColor: "white",
    borderColor: colors.lightGrey,
    borderWidth: 0.5,
    borderTopWidth: 0,
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontFamily: "medium",
    color: colors.textColor,
    letterSpacing: 0.3,
  },
  subTitle: {
    fontFamily: "regular",
    color: colors.subTextColor,
    letterSpacing: 0.3,
  },
  iconContainer: {
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
