import React, { useState } from "react";
import { Pressable, View, Touchable } from "react-native";
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

import styles from "./styles";

export default function Deck(props) {
  const [cardLayout, setCardLayout] = useState();
  const [originalCardLayout, setOriginalCardLayout] = useState();

  const animatedStyles = useAnimatedStyle(() => ({
    // borderWidth: pressed.value ? 5 : 0,
    borderColor: props.pressed.value ? "yellow" : "black",
    transform: [
      //   { translateX: 0 },
      //   { translateY: 0 },
      // { scale: withTiming(pressed.value ? 1.2 : 1) },
    ],
    zIndex: props.pressed.value ? 10 : 0,
  }));

  return (
    <Pressable onPressIn={() => props.handleDeckPress()}>
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
        style={[styles.deckPile, animatedStyles]}
      ></Animated.View>
    </Pressable>
  );
}
