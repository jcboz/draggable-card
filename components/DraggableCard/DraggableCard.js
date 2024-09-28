import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Card from "../Card/Card.js";
import NumberCardSelector from "../NumberCardSelector/NumberCardSelector.js";

import styles from "./styles.js";

export default function DraggableCard() {
  const [numberOfCards, setNumberOfCards] = useState(1);
  const [cardList, setCardList] = useState(getCards);
  const [pileOneLayout, setPileOneLayout] = useState();
  const [pileTwoLayout, setPileTwoLayout] = useState();
  const [pileThreeLayout, setPileThreeLayout] = useState();
  const [pileFourLayout, setPileFourLayout] = useState();
  const [cardBankLayout, setCardBankLayout] = useState();
  const [viewLayout, setViewLayout] = useState();

  const pileOneArr = useSharedValue([]);
  const pileTwoArr = useSharedValue([]);
  const pileThreeArr = useSharedValue([]);
  const pileFourArr = useSharedValue([]);
  const cardBankArr = useSharedValue([]);

  const offsetsArr = useSharedValue([]);

  const positions = useSharedValue([]);

  const CARD_WIDTH = 66;

  useEffect(() => {
    setCardList(getCards);
    if (!cardBankArr.value.includes(numberOfCards)) {
      cardBankArr.modify((value) => {
        "worklet";
        value.push(numberOfCards);
        return value;
      });
      offsetsArr.modify((value) => {
        "worklet";
        value.push({ x: 0, y: 0 });
        return value;
      });
    }
  }, [numberOfCards, cardBankLayout]);

  function getCards() {
    const cards = [];
    for (let i = 1; i <= numberOfCards; i++) {
      cards.push(
        <Card
          number={i}
          pileOneLayout={pileOneLayout}
          pileTwoLayout={pileTwoLayout}
          pileThreeLayout={pileThreeLayout}
          pileFourLayout={pileFourLayout}
          cardBankLayout={cardBankLayout}
          viewLayout={viewLayout}
          pileOneArr={pileOneArr}
          pileTwoArr={pileTwoArr}
          pileThreeArr={pileThreeArr}
          pileFourArr={pileFourArr}
          cardBankArr={cardBankArr}
          offsetsArr={offsetsArr}
          key={i}
          // style={{ left: numberOfCards * 66 }}
        />
      );
    }
    return cards;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        onLayout={(event) => {
          event.target.measure((x, y, width, height, pageX, pageY) => {
            const t = { x, y, width, height };
            setCardList(getCards);
            setViewLayout(t);
          });
        }}
        style={styles.container}
      >
        <NumberCardSelector
          numberOfCards={numberOfCards}
          setNumberOfCards={setNumberOfCards}
        />
        <View
          onLayout={(event) => {
            event.target.measure((x, y, width, height, pageX, pageY) => {
              const t = { x, y, width, height };
              setCardList(getCards);
              setPileOneLayout(t);
            });
          }}
          style={[styles.piles, styles.pileOne]}
        />
        <View
          onLayout={(event) => {
            event.target.measure((x, y, width, height, pageX, pageY) => {
              const t = { x, y, width, height };
              setCardList(getCards);
              setPileTwoLayout(t);
            });
          }}
          style={[styles.piles, styles.pileTwo]}
        />
        <View
          onLayout={(event) => {
            event.target.measure((x, y, width, height, pageX, pageY) => {
              const t = { x, y, width, height };
              setCardList(getCards);
              setPileThreeLayout(t);
            });
          }}
          style={[styles.piles, styles.pileThree]}
        />
        <View
          onLayout={(event) => {
            event.target.measure((x, y, width, height, pageX, pageY) => {
              const t = { x, y, width, height };
              setCardList(getCards);
              setPileFourLayout(t);
            });
          }}
          style={[styles.piles, styles.pileFour]}
        />
        <View style={styles.test} />
        <View style={styles.testtwo} />
        <View
          onLayout={(event) => {
            event.target.measure((x, y, width, height, pageX, pageY) => {
              const t = { x, y, width, height };
              // setCardList(getCards);
              setCardBankLayout(t);
            });
          }}
          style={styles.cardList}
        >
          {cardList.map((card) => card)}
        </View>
      </View>
    </GestureHandlerRootView>
  );
}
