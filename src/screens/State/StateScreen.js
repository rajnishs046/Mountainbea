import React, { useState, useEffect, useLayoutEffect } from "react";
import { FlatList, Text, View, Image, TouchableHighlight } from "react-native";
import styles from "./styles";

import MenuImage from "../../components/MenuImage/MenuImage";

export default function StateScreen(props) {
  const { navigation } = props;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center",
        alignSelf: "center",
        flex: 1,
      },
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

  const [data, setData] = useState([]);
  const base = "https://mountainbea.com/images/";

  const getState = async () => {
    try {
      const res = await fetch("https://mountainbea.com/App/fetch_state.php");
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  useEffect(() => {
    getState();
  }, []);

  const onPressCategory = (item) => {
    const title = item.state;
    const category = item;
    navigation.navigate("RecipesList", { category, title });
  };

  const renderCategory = ({ item }) => (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,0.9)"
      onPress={() => onPressCategory(item)}
    >
      <View style={styles.categoriesItemContainer}>
        <Image
          style={styles.categoriesPhoto}
          source={{ uri: base + item.image }}
        />
        <Text style={styles.categoriesName}>{item.state}</Text>
        <Text style={styles.categoriesInfo}></Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderCategory}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
}
