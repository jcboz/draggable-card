import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flexDirection: "row",
    top: 100,
  },
  text: {
    color: "black",
    fontSize: 72,
  },
  minus: {
    color: "blue",
    fontSize: 40,
    paddingRight: 20,
  },
  minusButton: {
    height: 40,
    width: 40,
  },
  plus: {
    color: "red",
    fontSize: 40,
    paddingLeft: 20,
  },
  plusButton: {
    height: 40,
    width: 40,
  },
});

export default styles;
