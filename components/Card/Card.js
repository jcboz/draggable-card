import React, { useState } from "react";
import { Text, View, Dimensions } from "react-native";
import "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
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

import {
  getCardListLayoutX,
  getCardListLayoutY,
  getXLayout,
  getYLayout,
  getXReorder,
  getYReorder,
} from "./Layout.js";

import styles from "./styles.js";

export default function Card(props) {
  const pressed = useSharedValue(false);
  const moved = useSharedValue(false); // not used
  const isInPile = useDerivedValue(() => {
    if (
      props.pileOneArr.value.indexOf(props.number) !== -1 ||
      props.pileTwoArr.value.indexOf(props.number) !== -1 ||
      props.pileThreeArr.value.indexOf(props.number) !== -1 ||
      props.pileFourArr.value.indexOf(props.number) !== -1
    ) {
      return true;
    }
    return false;
  });
  // const positionInArray = useDerivedValue(() => {
  //   return props.cardBankArr.value.indexOf(props.number);
  // });
  const cardIndex = props.number - 1;

  const CARD_WIDTH = 66;
  const CARD_LEFT_MARGIN = 5;
  const CARDLIST_LEFT_MARGIN = 20;

  const [cardLayout, setCardLayout] = useState();
  const [originalCardLayout, setOriginalCardLayout] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const offsetX = useSharedValue(props.offsetsArr.value[cardIndex].x);
  const offsetY = useSharedValue(props.offsetsArr.value[cardIndex].y);

  function addToPile(flag, indexToInsertAt) {
    "worklet";

    moved.value = true;

    if (flag === 1) {
      // add to pile one
      props.pileOneArr.modify((value) => {
        "worklet";
        if (props.pileOneArr.value.includes(props.number)) {
          const index = props.pileOneArr.value.indexOf(props.number);
          value.splice(index, 1);
        }
        value.splice(indexToInsertAt, 0, props.number); // ✅
        return value;
      });
    } else if (flag === 2) {
      // add to pile two
      props.pileTwoArr.modify((value) => {
        "worklet";
        console.log("teehee just checking");
        if (props.pileTwoArr.value.includes(props.number)) {
          const index = props.pileTwoArr.value.indexOf(props.number);
          value.splice(index, 1);
        }
        value.splice(indexToInsertAt, 0, props.number); // ✅
        return value;
      });
    } else if (flag === 3) {
      // add to pile three
      props.pileThreeArr.modify((value) => {
        "worklet";
        if (props.pileThreeArr.value.includes(props.number)) {
          const index = props.pileThreeArr.value.indexOf(props.number);
          value.splice(index, 1);
        }
        value.splice(indexToInsertAt, 0, props.number); // ✅
        return value;
      });
    } else if (flag === 4) {
      // add to pile four
      props.pileFourArr.modify((value) => {
        "worklet";
        if (props.pileFourArr.value.includes(props.number)) {
          const index = props.pileFourArr.value.indexOf(props.number);
          value.splice(index, 1);
        }
        value.splice(indexToInsertAt, 0, props.number); // ✅
        return value;
      });
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
      if (isInPile.value) {
        // If the card is in a pile we don't want to account for it's original X layout (or y)
        // ***don't delete yet but this might actually be unnecessary, everything seems to be working fine***
      } else {
        // If the card is NOT in a pile already (in the cardbank) then we DO want to account for it's original X layout when determining if it is inside a pile
      }
      // Pile One
      if (
        offsetX.value +
          cardLayout.width / 2 +
          CARDLIST_LEFT_MARGIN +
          CARD_LEFT_MARGIN >
          props.pileOneLayout.x &&
        offsetX.value +
          cardLayout.width / 2 +
          CARDLIST_LEFT_MARGIN +
          CARD_LEFT_MARGIN <
          props.pileOneLayout.x + props.pileOneLayout.width &&
        props.viewLayout.height - -offsetY.value - cardLayout.height / 2 >
          props.pileOneLayout.y &&
        props.viewLayout.height - -offsetY.value - cardLayout.height / 2 <
          props.pileOneLayout.y + props.pileOneLayout.height
      ) {
        // this nested for loop is responsible for obtaining the offsets within the pile one array based on what cars are in there
        // might be a cleaner way to do all this, but this was the best way to do it with how I had it set up
        let pileOneArrOffsets = [];
        for (let i = 0; i < props.offsetsArr.value.length; i++) {
          for (let j = 0; j < props.pileOneArr.value.length; j++) {
            if (props.offsetsArr.value[i].cardID == props.pileOneArr.value[j]) {
              console.log("loop so nice I did it twice");
              pileOneArrOffsets.push(props.offsetsArr.value[i].x);
            }
          }
        }
        // this function is responsible for figuring out where the card is being hovered in the pile one array and where it should be inserted in the array
        // obtaining this info allows us to reorder the array, and then use that newly reordered array to reposition the cards in the pile
        let indexToInsertAt = 0;
        console.log("pileOneArrOffsets: ", pileOneArrOffsets);
        for (let i = 0; i < pileOneArrOffsets.length; i++) {
          if (offsetX.value + 33 < pileOneArrOffsets[i]) {
            // starting from the start of the array (cards in the pile), we check if the x value of offset of the card
            // being moved is greater than the x value of each card offset in pile one. If it is greater, we move one card to the right
            // if we reach a card where the offset.x is greater than our card's offsetX value, then we know to stop and insert the card there
            indexToInsertAt = i;
            break;
          }
          if (i == pileOneArrOffsets.length - 1) {
            console.log("or here");
            // we're at the end of the pile which means the user is holding the card at the end of the array so we can just add it onto the end of the array
            indexToInsertAt = i;
            break;
          }
        }
        console.log("index to insert at: ", indexToInsertAt);
        addToPile(1, indexToInsertAt);
        removeFromPile(1);
        // Pile Two
      } else if (
        offsetX.value +
          cardLayout.width / 2 +
          CARDLIST_LEFT_MARGIN +
          CARD_LEFT_MARGIN >
          props.pileTwoLayout.x &&
        offsetX.value +
          cardLayout.width / 2 +
          CARDLIST_LEFT_MARGIN +
          CARD_LEFT_MARGIN <
          props.pileTwoLayout.x + props.pileTwoLayout.width &&
        props.viewLayout.height - -offsetY.value - cardLayout.height / 2 >
          props.pileTwoLayout.y &&
        props.viewLayout.height - -offsetY.value - cardLayout.height / 2 <
          props.pileTwoLayout.y + props.pileTwoLayout.height
      ) {
        let pileTwoArrOffsets = [];
        for (let i = 0; i < props.offsetsArr.value.length; i++) {
          for (let j = 0; j < props.pileTwoArr.value.length; j++) {
            if (props.offsetsArr.value[i].cardID == props.pileTwoArr.value[j]) {
              pileTwoArrOffsets.push(props.offsetsArr.value[i].x);
            }
          }
        }
        let indexToInsertAt = 0;
        console.log("pileTwoArrOffsets: ", pileTwoArrOffsets);
        for (let i = 0; i < pileTwoArrOffsets.length; i++) {
          if (
            offsetX.value +
              33 -
              props.pileTwoLayout.width +
              CARD_LEFT_MARGIN +
              CARDLIST_LEFT_MARGIN <
            pileTwoArrOffsets[i]
          ) {
            indexToInsertAt = i;
            break;
          }
          if (i == pileTwoArrOffsets.length - 1) {
            indexToInsertAt = i;
            break;
          }
        }
        console.log("index to insert at: ", indexToInsertAt);
        addToPile(2, indexToInsertAt);
        removeFromPile(2);
        // Pile Three
      } else if (
        offsetX.value +
          cardLayout.width / 2 +
          CARDLIST_LEFT_MARGIN +
          CARD_LEFT_MARGIN >
          props.pileThreeLayout.x &&
        offsetX.value +
          cardLayout.width / 2 +
          CARDLIST_LEFT_MARGIN +
          CARD_LEFT_MARGIN <
          props.pileThreeLayout.x + props.pileThreeLayout.width &&
        props.viewLayout.height - -offsetY.value - cardLayout.height / 2 >
          props.pileThreeLayout.y &&
        props.viewLayout.height - -offsetY.value - cardLayout.height / 2 <
          props.pileThreeLayout.y + props.pileThreeLayout.height
      ) {
        let pileThreeArrOffsets = [];
        for (let i = 0; i < props.offsetsArr.value.length; i++) {
          for (let j = 0; j < props.pileThreeArr.value.length; j++) {
            if (
              props.offsetsArr.value[i].cardID == props.pileThreeArr.value[j]
            ) {
              pileThreeArrOffsets.push(props.offsetsArr.value[i].x);
            }
          }
        }
        let indexToInsertAt = 0;
        console.log("pileThreeArrOffsets: ", pileThreeArrOffsets);
        for (let i = 0; i < pileThreeArrOffsets.length; i++) {
          if (offsetX.value + 33 < pileThreeArrOffsets[i]) {
            indexToInsertAt = i;
            break;
          }
          if (i == pileThreeArrOffsets.length - 1) {
            indexToInsertAt = i;
            break;
          }
        }
        console.log("index to insert at: ", indexToInsertAt);
        addToPile(3, indexToInsertAt);
        removeFromPile(3);
        // Pile Four
      } else if (
        offsetX.value +
          cardLayout.width / 2 +
          CARDLIST_LEFT_MARGIN +
          CARD_LEFT_MARGIN >
          props.pileFourLayout.x &&
        offsetX.value +
          cardLayout.width / 2 +
          CARDLIST_LEFT_MARGIN +
          CARD_LEFT_MARGIN <
          props.pileFourLayout.x + props.pileFourLayout.width &&
        props.viewLayout.height - -offsetY.value - cardLayout.height / 2 >
          props.pileFourLayout.y &&
        props.viewLayout.height - -offsetY.value - cardLayout.height / 2 <
          props.pileFourLayout.y + props.pileFourLayout.height
      ) {
        let pileFourArrOffsets = [];
        for (let i = 0; i < props.offsetsArr.value.length; i++) {
          for (let j = 0; j < props.pileFourArr.value.length; j++) {
            if (
              props.offsetsArr.value[i].cardID == props.pileFourArr.value[j]
            ) {
              pileFourArrOffsets.push(props.offsetsArr.value[i].x);
            }
          }
        }
        let indexToInsertAt = 0;
        console.log("pileFourArrOffsets: ", pileFourArrOffsets);
        for (let i = 0; i < pileFourArrOffsets.length; i++) {
          if (
            offsetX.value + 33 - props.pileFourLayout.width + CARD_LEFT_MARGIN <
            pileFourArrOffsets[i]
          ) {
            indexToInsertAt = i;
            break;
          }
          if (i == pileFourArrOffsets.length - 1) {
            indexToInsertAt = i;
            break;
          }
        }
        console.log("index to insert at: ", indexToInsertAt);
        addToPile(4, indexToInsertAt);
        removeFromPile(4);
      } else {
        // remove card from all other piles since it didn't land in any of them
        addToPile(5);
        removeFromPile(0);
      }
    })
    .onEnd(() => {
      // Pile 1
      // THERE IS NO NEED TO CHECK WHERE THE CARD IS IN .onEnd BECAUSE WE ARE DOING IT IN .onChange. INSTEAD WE SHOULD CHECK WHAT PILE ARRAY THE CARD IS IN AND SET IT'S OFFSET WITH useSpring() TO SNAP IT INTO PLACE!

      // needs to snap into pile one then (and also be added to the players' hand)
      // offsetX.value = getXLayout(
      //   props.pileOneArr.value,
      //   cardLayout.width,
      //   props.pileOneLayout.x,
      //   props.number
      // );
      // I think everything in this conditional can be deleted. offsetY.value doesn't determine the change anymore, translateY in useDerivedValue does. We just need to set offsetY.value to something to update the app on where the card is on the screen now
      if (props.pileOneArr.value.indexOf(props.number) !== -1) {
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
        // Pile 2
      } else if (props.pileTwoArr.value.indexOf(props.number) !== -1) {
        // needs to snap into pile one then (and also be added to the players' hand)
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
      } else if (props.pileThreeArr.value.indexOf(props.number) !== -1) {
        // needs to snap into pile one then (and also be added to the players' hand)
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
      } else if (props.pileFourArr.value.indexOf(props.number) !== -1) {
        // updateCardPileOne();
        // needs to snap into pile one then (and also be added to the players' hand)
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
        const x = originalCardLayout.x - CARD_LEFT_MARGIN;
        const y = getCardListLayoutY(props.cardBankArr.value);
        offsetX.value = withSpring(x);
        offsetY.value = withSpring(y);
      }
    })
    .onFinalize(() => {
      pressed.value = false;
    });

  const translateX = useDerivedValue(() => {
    // does not work for some reason... refer to can-it-be-done-in-duolingo
    if (pressed.value) {
      return offsetX.value;
    } else if (props.pileOneArr.value.indexOf(props.number) !== -1) {
      // return function for determining where the cards should be in each pile (like getXLayout)
      // will need a different one for every pile
      offsetX.value = getXLayout(
        props.pileOneArr.value,
        cardLayout.width,
        props.pileOneLayout.x,
        props.number
      );
      return withSpring(
        getXLayout(
          props.pileOneArr.value,
          cardLayout.width,
          props.pileOneLayout.x,
          props.number
        )
      );
    } else if (props.pileTwoArr.value.indexOf(props.number) !== -1) {
      // return function for determining where the cards should be in each pile (like getXLayout)
      // will need a different one for every pile
      offsetX.value = getXLayout(
        props.pileTwoArr.value,
        cardLayout.width,
        props.pileTwoLayout.x,
        props.number
      );
      return withSpring(
        getXLayout(
          props.pileTwoArr.value,
          cardLayout.width,
          props.pileTwoLayout.x,
          props.number
        )
      );
    } else if (props.pileThreeArr.value.indexOf(props.number) !== -1) {
      // return function for determining where the cards should be in each pile (like getXLayout)
      // will need a different one for every pile
      offsetX.value = getXLayout(
        props.pileThreeArr.value,
        cardLayout.width,
        props.pileThreeLayout.x,
        props.number
      );
      return withSpring(
        getXLayout(
          props.pileThreeArr.value,
          cardLayout.width,
          props.pileThreeLayout.x,
          props.number
        )
      );
    } else if (props.pileFourArr.value.indexOf(props.number) !== -1) {
      // return function for determining where the cards should be in each pile (like getXLayout)
      // will need a different one for every pile
      offsetX.value = getXLayout(
        props.pileFourArr.value,
        cardLayout.width,
        props.pileFourLayout.x,
        props.number
      );
      return withSpring(
        getXLayout(
          props.pileFourArr.value,
          cardLayout.width,
          props.pileFourLayout.x,
          props.number
        )
      );
    } else {
      return offsetX.value;
    }
  });

  const translateY = useDerivedValue(() => {
    // if (pressed.value) {
    //   return offsetY.value;
    // } else if (isInPile.value) {
    //   return offsetY.value;
    // }
    return offsetY.value;
  });

  const animatedStyles = useAnimatedStyle(() => ({
    borderWidth: pressed.value ? 5 : 0,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: withTiming(pressed.value ? 1.2 : 1) },
    ],
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
        style={[styles.container, animatedStyles]}
      >
        <Text style={styles.number}>{props.number}</Text>
      </Animated.View>
    </GestureDetector>
  );
}
