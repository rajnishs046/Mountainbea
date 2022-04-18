import React, { useLayoutEffect } from "react";
import { FlatList, Text, View, TouchableHighlight, Image } from "react-native";
import styles from "./styles";
import { getRecipes, getCategoryName } from "../../data/MockDataAPI";

export default function RecipesListScreen(props) {
  const { navigation, route } = props;

  const item = route?.params?.category;
  const recipesArray = item.id;

  const base = "https://mountainbea.com/images/";

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.title,
      headerRight: () => <View />,
    });
  }, []);

  const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { item });
  };

  const renderRecipes = ({ item }) => (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,0.9)"
      onPress={() => onPressRecipe(item)}
    >
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: base + item.image }} />
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.category}>{item.name}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={recipesArray}
        renderItem={renderRecipes}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
}
