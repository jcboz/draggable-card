import React, { useState } from "react";
import { Text, View, Dimensions } from "react-native";
import "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

import { getCardListLayout, getXLayout, getYLayout } from "./Layout.js";

import styles from "./styles.js";

export default function Card(props) {
  const pressed = useSharedValue(false);
  const moved = useSharedValue(false); // not used
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const cardIndex = props.number - 1;

  // props.offsets.value[props.number].x (and y) is how we need to reference the offsets from here on out

  // console.log("test: ", props.offsets.value[props.number].x);

  const CARD_WIDTH = 66;

  const [cardLayout, setCardLayout] = useState();
  const [originalCardLayout, setOriginalCardLayout] = useState(null);
  const [loaded, setLoaded] = useState(false);

  function addToPile(flag) {
    "worklet";
    moved.value = true;
    if (flag === 1) {
      // add to pile one
      if (!props.pileOneArr.value.includes(props.number)) {
        props.pileOneArr.modify((value) => {
          "worklet";
          value.push(props.number); // ✅
          return value;
        });
      }
    } else if (flag === 2) {
      // add to piles two
      if (!props.pileTwoArr.value.includes(props.number)) {
        props.pileTwoArr.modify((value) => {
          "worklet";
          value.push(props.number); // ✅
          return value;
        });
      }
    } else if (flag === 3) {
      // add to piles three
      if (!props.pileThreeArr.value.includes(props.number)) {
        props.pileThreeArr.modify((value) => {
          "worklet";
          value.push(props.number); // ✅
          return value;
        });
      }
    } else if (flag === 4) {
      // add to piles four
      if (!props.pileFourArr.value.includes(props.number)) {
        props.pileFourArr.modify((value) => {
          "worklet";
          value.push(props.number); // ✅
          return value;
        });
      }
    } else if (flag === 5) {
      if (!props.cardBankArr.value.includes(props.number)) {
        props.cardBankArr.modify((value) => {
          "worklet";
          value.push(props.number); // ✅
          return value;
        });
      }
    }
    console.log(
      "\npileArrays: \nPile 1: ",
      props.pileOneArr.value,
      "\nPile 2: ",
      props.pileTwoArr.value,
      "\nPile 3: ",
      props.pileThreeArr.value,
      "\nPile 4: ",
      props.pileFourArr.value,
      "\nCard Bank: ",
      props.cardBankArr.value
    );
  }

  // For some, very frustrating, reason, we cannot call functions inside of worklets even if those functions are worklets
  // so for now this method is super messy but helper functions are set up so if I can find a way to just call those functions without crashing this function can be cleaned up
  function removeFromPile(flag) {
    "worklet";

    console.log("flag: ", flag);
    // flag is used to indicate where the function is being called from
    // if called from pileOne, then the card is removed from piles 2,3,4
    // if called from pileThree, then the card is removed from 1,2,4 etc.
    // if called when card lands in no piles, then it is removed from all
    if (flag === 1) {
      // remove from all piles but one
      if (props.pileTwoArr.value.includes(props.number)) {
        const index = props.pileTwoArr.value.indexOf(props.number);
        props.pileTwoArr.modify((value) => {
          "worklet";
          value.splice(index, 1);
          return value;
        });
      }
      if (props.pileThreeArr.value.includes(props.number)) {
        const index = props.pileThreeArr.value.indexOf(props.number);
        props.pileThreeArr.modify((value) => {
          "worklet";
          value.splice(index, 1);
          return value;
        });
      }
      if (props.pileFourArr.value.includes(props.number)) {
        const index = props.pileFourArr.value.indexOf(props.number);
        props.pileFourArr.modify((value) => {
          "worklet";
          value.splice(index, 1);
          return value;
        });
      }
      if (props.cardBankArr.value.includes(props.number)) {
        const index = props.cardBankArr.value.indexOf(props.number);
        props.cardBankArr.modify((value) => {
          "worklet";
          value.splice(index, 1);
          return value;
        });
      }
    } else if (flag === 2) {
      // remove from all piles but two
      if (props.pileOneArr.value.includes(props.number)) {
        const index = props.pileOneArr.value.indexOf(props.number);
        props.pileOneArr.modify((value) => {
          "worklet";

          value.splice(index, 1);
          return value;
        });
      }
      if (props.pileThreeArr.value.includes(props.number)) {
        const index = props.pileThreeArr.value.indexOf(props.number);
        props.pileThreeArr.modify((value) => {
          "worklet";

          value.splice(index, 1);
          return value;
        });
      }
      if (props.pileFourArr.value.includes(props.number)) {
        const index = props.pileFourArr.value.indexOf(props.number);
        props.pileFourArr.modify((value) => {
          "worklet";

          value.splice(index, 1);
          return value;
        });
      }
      if (props.cardBankArr.value.includes(props.number)) {
        const index = props.cardBankArr.value.indexOf(props.number);
        props.cardBankArr.modify((value) => {
          "worklet";
          value.splice(index, 1);
          return value;
        });
      }
    } else if (flag === 3) {
      // remove from all piles but three
      if (props.pileOneArr.value.includes(props.number)) {
        const index = props.pileOneArr.value.indexOf(props.number);
        props.pileOneArr.modify((value) => {
          "worklet";

          value.splice(index, 1);
          return value;
        });
      }
      if (props.pileTwoArr.value.includes(props.number)) {
        const index = props.pileTwoArr.value.indexOf(props.number);
        props.pileTwoArr.modify((value) => {
          "worklet";

          value.splice(index, 1);
          return value;
        });
      }
      if (props.pileFourArr.value.includes(props.number)) {
        const index = props.pileFourArr.value.indexOf(props.number);
        props.pileFourArr.modify((value) => {
          "worklet";

          value.splice(index, 1);
          return value;
        });
      }
      if (props.cardBankArr.value.includes(props.number)) {
        const index = props.cardBankArr.value.indexOf(props.number);
        props.cardBankArr.modify((value) => {
          "worklet";
          value.splice(index, 1);
          return value;
        });
      }
    } else if (flag === 4) {
      // remove from all piles but four
      moved.value = false;
      if (props.pileOneArr.value.includes(props.number)) {
        const index = props.pileOneArr.value.indexOf(props.number);
        props.pileOneArr.modify((value) => {
          "worklet";

          value.splice(index, 1);
          return value;
        });
      }
      if (props.pileTwoArr.value.includes(props.number)) {
        const index = props.pileTwoArr.value.indexOf(props.number);
        props.pileTwoArr.modify((value) => {
          "worklet";

          value.splice(index, 1);
          return value;
        });
      }
      if (props.pileThreeArr.value.includes(props.number)) {
        const index = props.pileThreeArr.value.indexOf(props.number);
        props.pileThreeArr.modify((value) => {
          "worklet";

          value.splice(index, 1);
          return value;
        });
      }
      if (props.cardBankArr.value.includes(props.number)) {
        const index = props.cardBankArr.value.indexOf(props.number);
        props.cardBankArr.modify((value) => {
          "worklet";
          value.splice(index, 1);
          return value;
        });
      }
    } else if (flag === 0) {
      // remove from all piles
      if (props.pileOneArr.value.includes(props.number)) {
        const index = props.pileOneArr.value.indexOf(props.number);
        props.pileOneArr.modify((value) => {
          "worklet";

          value.splice(index, 1);
          return value;
        });
      }
      if (props.pileTwoArr.value.includes(props.number)) {
        const index = props.pileTwoArr.value.indexOf(props.number);
        props.pileTwoArr.modify((value) => {
          "worklet";

          value.splice(index, 1);
          return value;
        });
      }
      if (props.pileThreeArr.value.includes(props.number)) {
        const index = props.pileThreeArr.value.indexOf(props.number);
        props.pileThreeArr.modify((value) => {
          "worklet";

          value.splice(index, 1);
          return value;
        });
      }
      if (props.pileFourArr.value.includes(props.number)) {
        const index = props.pileFourArr.value.indexOf(props.number);
        props.pileFourArr.modify((value) => {
          "worklet";

          value.splice(index, 1);
          return value;
        });
      }
    }
    // console.log("splice check 1: ", props.pileOneArr.value);
    // console.log("splice check 2: ", props.pileTwoArr.value);
    // console.log("splice check 3: ", props.pileThreeArr.value);
    // console.log("splice check 4: ", props.pileFourArr.value);
    // console.log("splice check 5: ", props.cardBankArr.value);
  }

  const tap = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
    })
    .onChange((event) => {
      offsetX.value += event.changeX;
      offsetY.value += event.changeY;

      if (
        offsetX.value -
          (props.number - 1 * originalCardLayout.x) +
          cardLayout.width / 2 >
          props.pileOneLayout.x &&
        offsetX.value -
          (props.number - 1 * originalCardLayout.x) +
          cardLayout.width / 2 <
          props.pileOneLayout.x + props.pileOneLayout.width &&
        props.viewLayout.height - -offsetY.value - cardLayout.height / 2 >
          props.pileOneLayout.y &&
        props.viewLayout.height - -offsetY.value - cardLayout.height / 2 <
          props.pileOneLayout.y + props.pileOneLayout.height
      ) {
        console.log("In Pile 1");
        addToPile(1);
        removeFromPile(1);
      } else {
        addToPile(0);
        removeFromPile(0);
      }
    })
    .onEnd(() => {
      // Pile 1
      if (
        offsetX.value -
          (props.number - 1 * originalCardLayout.x) +
          cardLayout.width / 2 >
          props.pileOneLayout.x &&
        offsetX.value -
          (props.number - 1 * originalCardLayout.x) +
          cardLayout.width / 2 <
          props.pileOneLayout.x + props.pileOneLayout.width &&
        props.viewLayout.height - -offsetY.value - cardLayout.height / 2 >
          props.pileOneLayout.y &&
        props.viewLayout.height - -offsetY.value - cardLayout.height / 2 <
          props.pileOneLayout.y + props.pileOneLayout.height
      ) {
        addToPile(1);
        removeFromPile(1);
        // updateCardPileOne();
        // needs to snap into pile one then (and also be added to the players' hand)
        offsetX.value = withSpring(
          getXLayout(
            props.pileOneArr.value,
            cardLayout.width,
            props.pileOneLayout.x
          )
        );
        offsetY.value = withSpring(
          getYLayout(
            props.pileOneArr.value,
            cardLayout.width,
            props.pileOneLayout.y,
            cardLayout.height,
            props.pileOneLayout.height,
            props.viewLayout.height
          )
        );
        // Pile Two
      } else if (
        offsetX.value -
          (props.number - 1 * cardLayout.x) +
          cardLayout.width / 2 >
          props.pileTwoLayout.x &&
        offsetX.value -
          (props.number - 1 * cardLayout.x) +
          cardLayout.width / 2 <
          props.pileTwoLayout.x + props.pileTwoLayout.width &&
        props.viewLayout.height - -offsetY.value - cardLayout.height / 2 >
          props.pileTwoLayout.y &&
        props.viewLayout.height - -offsetY.value - cardLayout.height / 2 <
          props.pileTwoLayout.y + props.pileTwoLayout.height
      ) {
        removeFromPile(2);
        addToPile(2);
        // updateCardPileOne();
        // needs to snap into pile one then (and also be added to the players' hand)
        offsetX.value = withSpring(
          getXLayout(
            props.pileTwoArr.value,
            cardLayout.width,
            props.pileTwoLayout.x
          )
        );
        offsetY.value = withSpring(
          getYLayout(
            props.pileTwoArr.value,
            cardLayout.width,
            props.pileTwoLayout.y,
            cardLayout.height,
            props.pileTwoLayout.height,
            props.viewLayout.height
          )
        );
        // Pile Three
      } else if (
        offsetX.value -
          (props.number - 1 * cardLayout.x) +
          cardLayout.width / 2 >
          props.pileThreeLayout.x &&
        offsetX.value -
          (props.number - 1 * cardLayout.x) +
          cardLayout.width / 2 <
          props.pileThreeLayout.x + props.pileThreeLayout.width &&
        props.viewLayout.height - -offsetY.value - cardLayout.height / 2 >
          props.pileThreeLayout.y &&
        props.viewLayout.height - -offsetY.value - cardLayout.height / 2 <
          props.pileThreeLayout.y + props.pileThreeLayout.height
      ) {
        removeFromPile(3);
        addToPile(3);
        // updateCardPileOne();
        // needs to snap into pile one then (and also be added to the players' hand)
        offsetX.value = withSpring(
          getXLayout(
            props.pileThreeArr.value,
            cardLayout.width,
            props.pileThreeLayout.x
          )
        );
        console.log("hiphip: ", props.viewLayout.height);
        offsetY.value = withSpring(
          getYLayout(
            props.pileThreeArr.value,
            cardLayout.width,
            props.pileThreeLayout.y,
            cardLayout.height,
            props.pileThreeLayout.height,
            props.viewLayout.height
          )
        );
        // Pile Four
      } else if (
        offsetX.value -
          (props.number - 1 * cardLayout.x) +
          cardLayout.width / 2 >
          props.pileFourLayout.x &&
        offsetX.value -
          (props.number - 1 * cardLayout.x) +
          cardLayout.width / 2 <
          props.pileFourLayout.x + props.pileFourLayout.width &&
        props.viewLayout.height - -offsetY.value - cardLayout.height / 2 >
          props.pileFourLayout.y &&
        props.viewLayout.height - -offsetY.value - cardLayout.height / 2 <
          props.pileFourLayout.y + props.pileFourLayout.height
      ) {
        removeFromPile(4);
        addToPile(4);
        // updateCardPileOne();
        // needs to snap into pile one then (and also be added to the players' hand)
        offsetX.value = withSpring(
          getXLayout(
            props.pileFourArr.value,
            cardLayout.width,
            props.pileFourLayout.x
          )
        );
        offsetY.value = withSpring(
          getYLayout(
            props.pileFourArr.value,
            cardLayout.width,
            props.pileFourLayout.y,
            cardLayout.height,
            props.pileFourLayout.height,
            props.viewLayout.height
          )
        );
      } else {
        // remove card from all other piles since it didn't land in any of them
        addToPile(5);
        removeFromPile(0);

        // we need to get the layout for the card bank
        const dock = getCardListLayout(props.cardBankArr.value);
        offsetX.value = withSpring(dock.x);
        offsetY.value = withSpring(dock.y);
        // offsetX.value = withSpring(0);
        // offsetY.value = withSpring(0);
      }
    })
    .onFinalize(() => {
      pressed.value = false;
    });

  const animatedStyles = useAnimatedStyle(() => ({
    borderWidth: pressed.value ? 5 : 0,
    // position: moved.value ? "absolute" : "relative",
    transform: [
      { translateX: offsetX.value },
      { translateY: offsetY.value },
      { scale: withTiming(pressed.value ? 1.2 : 1) },
    ],
    // left: CARD_WIDTH * (props.cardBankArr.value.length - 1),
    zIndex: pressed.value ? 10 : 0,
  }));

  return (
    <GestureDetector gesture={tap}>
      <Animated.View
        onLayout={(event) => {
          event.target.measure((x, y, width, height) => {
            const t = { x, y, width, height };
            setCardLayout(t);
            if (!originalCardLayout) {
              setOriginalCardLayout(t);
            }
          });
        }}
        style={[
          styles.container,
          // { left: CARD_WIDTH * (props.cardBankArr.value.length - 1) },
          animatedStyles,
        ]}
      >
        <Text style={styles.number}>{props.number}</Text>
      </Animated.View>
    </GestureDetector>
  );
}
