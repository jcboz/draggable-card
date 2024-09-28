import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  cardList: {
    flexDirection: "row",
    position: "absolute",
    bottom: 12,
    left: 20,
    height: 110,
    width: "90%",
    backgroundColor: "#d3d3d3",
    borderRadius: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    font: 12,
    color: "red",
  },
  piles: {
    position: "absolute",
    width: "45%",
    height: "20%",
    backgroundColor: "black",
    opacity: 0.3,
    borderRadius: 10,
  },
  pileOne: {
    left: 12,
  },
  pileTwo: {
    right: 12,
  },
  pileThree: {
    left: 12,
    top: 475,
  },
  pileFour: {
    right: 12,
    top: 475,
  },
  test: {
    height: 5,
    width: 5,
    position: "absolute",
    backgroundColor: "green",
    left: 12,
    top: 309.33,
  },
  testtwo: {
    height: 5,
    width: 5,
    position: "absolute",
    backgroundColor: "green",
    left: 12,
    top: 463.663312988,
  },
});

export default styles;
