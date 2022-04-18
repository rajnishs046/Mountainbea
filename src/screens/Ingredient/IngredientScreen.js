import React, { useLayoutEffect } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  View,
  Image,
  TouchableHighlight,
} from "react-native";
import styles from "./styles";
import {
  getIngredientUrl,
  getRecipesByIngredient,
  getCategoryName,
} from "../../data/MockDataAPI";

export default function IngredientScreen(props) {
  const { navigation, route } = props;

  const ingredientId = route.params?.ingredient;
  const ingredientUrl = getIngredientUrl(ingredientId);
  const ingredientName = route.params?.name;
  console.log(ingredientName);

  const base = "https://mountainbea.com/images/";

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.name,
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
    </TouchableHighlight>
  );

  return (
    <ScrollView style={styles.mainContainer}>
      <View
        style={{
          borderBottomWidth: 0.4,
          marginBottom: 10,
          borderBottomColor: "grey",
        }}
      >
        <Image
          style={styles.photoIngredient}
          source={{ uri: base + item.image }}
        />
      </View>
      <Text style={styles.ingredientInfo}>{item.name}:</Text>
      <View>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={getRecipesByIngredient(ingredientId)}
          renderItem={renderRecipes}
          keyExtractor={(item) => `${item.id}`}
        />
      </View>
    </ScrollView>
  );
}
