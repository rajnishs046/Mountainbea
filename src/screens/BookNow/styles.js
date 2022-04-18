import { StyleSheet, Dimensions } from "react-native";
// screen sizing
const { width, height } = Dimensions.get("window");
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const numColumns = 3;
// item size
const RECIPE_ITEM_HEIGHT = 100;
const RECIPE_ITEM_OFFSET = 10;
const RECIPE_ITEM_MARGIN = RECIPE_ITEM_OFFSET * 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
    margin: 10,
    resizeMode: "cover",
  },
  bottomImage: {
    height: 150,
    width: 200,
    position: "absolute",
    bottom: 15,
    right: 80,
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  inputView: {
    backgroundColor: "lightgrey",
    borderRadius: 30,
    width: "90%",
    height: 45,
    marginBottom: 20,

    // alignItems: "center",
  },
});

export default styles;
