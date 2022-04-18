import React, { useLayoutEffect, useRef, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import styles from "./styles";
import Carousel, { Pagination } from "react-native-snap-carousel";
import {
  getIngredientName,
  getCategoryName,
  getCategoryById,
} from "../../data/MockDataAPI";
import BackButton from "../../components/BackButton/BackButton";
import ViewIngredientsButton from "../../components/ViewIngredientsButton/ViewIngredientsButton";

const { width: viewportWidth } = Dimensions.get("window");

export default function RecipeScreen(props) {
  const { navigation, route } = props;

  const item = route.params?.item;
  console.log(props);
  const category = item.id;
  const title = item.name;

  const base = "https://mountainbea.com/images/";

  const photosArray = [
    { id: 1, img: base + item.image },
    { id: 2, img: base + item.image2 },
    { id: 3, img: base + item.image3 },
    { id: 4, img: base + item.image4 },
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  const slider1Ref = useRef();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: "true",
      title: "",
      headerLeft: () => (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);

  const renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item.img }} />
      </View>
    </TouchableHighlight>
  );

  const onPressIngredient = (item) => {
    var name = "getIngredientName(item)";
    let ingredient = item;
    navigation.navigate("Ingredient", { ingredient, name });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.carouselContainer}>
        <View style={styles.carousel}>
          <Carousel
            ref={slider1Ref}
            data={photosArray}
            renderItem={renderImage}
            sliderWidth={viewportWidth}
            itemWidth={viewportWidth}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            firstItem={0}
            loop={false}
            autoplay={false}
            autoplayDelay={500}
            autoplayInterval={3000}
            onSnapToItem={(index) => setActiveSlide(index)}
          />
          <Pagination
            dotsLength={photosArray.length}
            activeDotIndex={activeSlide}
            containerStyle={styles.paginationContainer}
            dotColor="rgba(255, 255, 255, 0.92)"
            dotStyle={styles.paginationDot}
            inactiveDotColor="white"
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            carouselRef={slider1Ref.current}
            tappableDots={!!slider1Ref.current}
          />
        </View>
      </View>
      <View style={styles.infoRecipeContainer}>
        <Text style={styles.infoRecipeName}>{item.name}</Text>
        <View style={styles.infoContainer}>
          <TouchableHighlight
            onPress={() =>
              navigation.navigate("RecipesList", { category, title })
            }
          >
            <Text style={styles.category}>Rs. {item.price}</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.infoContainer}>
          {/* <Image
            style={styles.infoPhoto}
            source={require("../../../assets/icons/time.png")}
          /> */}
          <Text style={styles.infoRecipe}>{item.state} </Text>
        </View>

        <View style={styles.infoContainer}>
          <ViewIngredientsButton
            onPress={() => {
              let bookId = item.id;
              let title = "Booking for " + item.name;
              navigation.navigate("BookNow", { bookId, title });
            }}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoDescriptionRecipe}>{item.destination}</Text>
        </View>
      </View>
    </ScrollView>
  );
}
