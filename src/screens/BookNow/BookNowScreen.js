import React, { useLayoutEffect } from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight,
  TextInput,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";

export default function BookNowScreen(props) {
  const { navigation, route } = props;

  const item = route.params?.ingredients;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.title,
      headerTitleStyle: {
        fontSize: 16,
      },
    });
  }, []);

  const onPressIngredient = (item) => {
    let name = getIngredientName(item.ingredientId);
    let ingredient = item.ingredientId;
    navigation.navigate("Ingredient", { ingredient, name });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput style={styles.TextInput} placeholder="Name" />
      </View>
      <View style={styles.inputView}>
        <TextInput style={styles.TextInput} placeholder="Email" />
      </View>
      <View style={styles.inputView}>
        <TextInput style={styles.TextInput} placeholder="Phone" />
      </View>
    </View>
  );
}
