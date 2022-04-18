import React, { useState, useEffect, useLayoutEffect } from "react";
import { FlatList, Text, View, TouchableHighlight, Image } from "react-native";
import styles from "./styles";
import { recipes } from "../../data/dataArrays";
import MenuImage from "../../components/MenuImage/MenuImage";
import { getCategoryName } from "../../data/MockDataAPI";

export default function HomeScreen(props) {
  const { navigation } = props;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Mountan Bea",
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);

  const onPressRecipe = (item) => {
    let title = item.name;
    navigation.navigate("Recipe", { item, title });
  };

  const renderRecipes = ({ item }) => (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,0.9)"
      onPress={() => onPressRecipe(item)}
    >
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: base + item.image }} />
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.category}>Rs. {item.price}</Text>
      </View>
    </TouchableHighlight>
  );

  const [data, setData] = useState([]);
  const base = "https://mountainbea.com/images/";

  const getList = async () => {
    try {
      const res = await fetch("https://mountainbea.com/App/fetch_tour.php");
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <View>
      <Text
        style={{
          width: "100%",
          fontSize: 20,
          fontWeight: "bold",

          padding: 10,
        }}
      >
        Tour Packages
      </Text>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={data}
        renderItem={renderRecipes}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
}
