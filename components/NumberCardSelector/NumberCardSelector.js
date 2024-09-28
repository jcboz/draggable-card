import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";

import styles from "./styles";

export default function NumberCardSelector({
  numberOfCards,
  setNumberOfCards,
}) {
  function handleReduce() {
    if (numberOfCards < 1) {
      return;
    }
    setNumberOfCards(numberOfCards - 1);
  }

  function handleAdd() {
    if (numberOfCards >= 6) {
      return;
    }
    setNumberOfCards(numberOfCards + 1);
  }

  return (
    <View style={styles.container}>
      <Pressable
        hitSlop={{ left: 15, bottom: 15 }}
        onPress={() => handleReduce()}
      >
        <View style={styles.minusButton}>
          <Text style={(styles.text, styles.minus)}>-</Text>
        </View>
      </Pressable>
      <Text style={styles.text}>{numberOfCards}</Text>
      <Pressable
        hitSlop={{ right: 15, bottom: 15 }}
        onPress={() => handleAdd()}
      >
        <View style={styles.plusButton}>
          <Text style={(styles.text, styles.plus)}>+</Text>
        </View>
      </Pressable>
    </View>
  );
}
