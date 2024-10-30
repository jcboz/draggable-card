import React, { useState, useEffect } from "react";
import { Alert, Text, View, StyleSheet, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedReaction,
} from "react-native-reanimated";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";

import Card from "../Card/Card.js";
import Deck from "../Deck/Deck.js";
import NumberCardSelector from "../NumberCardSelector/NumberCardSelector.js";
// import { reorderOffsets } from "../Card/Layout.js"; // I don't think gets called here

import styles from "./styles.js";

export default function DraggableCard() {
  const [numberOfCards, setNumberOfCards] = useState(4);
  const [cardList, setCardList] = useState(getCards);
  const [pileOneLayout, setPileOneLayout] = useState();
  const [pileTwoLayout, setPileTwoLayout] = useState();
  const [pileThreeLayout, setPileThreeLayout] = useState();
  const [pileFourLayout, setPileFourLayout] = useState();
  const [cardBankLayout, setCardBankLayout] = useState();
  const [discardLayout, setDiscardLayout] = useState();
  const [deckLayout, setDeckLayout] = useState();
  const [viewLayout, setViewLayout] = useState();
  const [ready, setReady] = useState(false);
  const [deckAvailable, setDeckAvailable] = useState(true);

  const hasCardBeenPicked = useSharedValue(false);
  const hasCardBeenDiscarded = useSharedValue(false);

  const pressed = useSharedValue(false);
  const counter = useSharedValue(0);

  const pileOneArr = useSharedValue([]);
  const pileTwoArr = useSharedValue([]);
  const pileThreeArr = useSharedValue([]);
  const pileFourArr = useSharedValue([]);
  const cardBankArr = useSharedValue([]);

  const discardPileArr = useSharedValue(1); // in five crown app this would be set to equal the discard pile state

  // this will need calculated based on number of cards in players hand on a turn
  const offsetsArr = useSharedValue([
    { x: 199, y: -492, cardID: 0 }, // discard card
    { x: 0, y: 0, cardID: 0 },
    { x: 66, y: 0, cardID: 0 },
    { x: 132, y: 0, cardID: 0 },
  ]);

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
        value.push({
          x: CARD_WIDTH * (numberOfCards - 1),
          y: 0,
          cardID: numberOfCards,
        });
        return value;
      });
    }
    setReady(true);
  }, [numberOfCards, discardLayout, cardBankLayout]);

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
          discardLayout={discardLayout}
          viewLayout={viewLayout}
          pileOneArr={pileOneArr}
          pileTwoArr={pileTwoArr}
          pileThreeArr={pileThreeArr}
          pileFourArr={pileFourArr}
          cardBankArr={cardBankArr}
          offsetsArr={offsetsArr}
          discardPileArr={discardPileArr}
          key={i}
          hasCardBeenDiscarded={hasCardBeenDiscarded}
          hasCardBeenPicked={hasCardBeenPicked}
        />
      );
    }
    return cards;
  }

  function handleDeckPress() {
    console.log("has card been picked?: ", hasCardBeenPicked.value);
    if (!hasCardBeenPicked.value) {
      if (pressed.value) {
        pressed.value = false;
        // So, I think adding the card to the cardlist should automatically cause a new card to render and appear
        // ^ this should probably get implemented first, but after the animation of deck moving down should be done

        // 1. Add card to card list
        setNumberOfCards(numberOfCards + 1);
        setDeckAvailable(false);
        hasCardBeenPicked.value = true; // ermmm NOT WORKING NOT WORKING NOT WORKING
        // 2. TODO: Animate deck card down to card list
        // I think the first step will be to make a card appear where the deck is/was, then withTiming we want to to pan down to the card bank
      } else {
        pressed.value = true;
      }
    }
  }

  function handleOutsideDeckPress() {
    pressed.value = false;
  }

  function handleEndTurnPress() {
    // do something
    console.log("end turn button was pressed: ");
    if (!hasCardBeenPicked.value) {
      Alert.alert("You must pick a card then discard a card!");
    } else if (!hasCardBeenDiscarded.value) {
      Alert.alert("You must discard a card!");
    } else {
      endTurn();
      // end turn
    }
  }

  function endTurn() {
    Alert.alert("Turn ended :)");
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Pressable onPressIn={() => handleOutsideDeckPress()} style={{ flex: 1 }}>
        <Pressable
          onPress={() => handleEndTurnPress()}
          style={({ pressed }) => [
            { backgroundColor: pressed ? "#DCDCDC" : "transparent" },
            styles.endTurnButton,
          ]}
        >
          <Text>End Turn</Text>
        </Pressable>
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
          <Animated.View
            onLayout={(event) => {
              event.target.measure((x, y, width, height) => {
                const t = { x, y, width, height };
                // setCardList(getCards); // I don't think this is needed but keeping incase
                setDeckLayout(t);
              });
            }}
          >
            <View style={styles.deckPileBackground}>
              {deckAvailable && (
                <Deck pressed={pressed} handleDeckPress={handleDeckPress} />
              )}
            </View>
          </Animated.View>
          <View
            onLayout={(event) => {
              event.target.measure((x, y, width, height) => {
                const t = { x, y, width, height };
                // setCardList(getCards); // I don't think this is needed but keeping incase
                setDiscardLayout(t);
              });
            }}
            style={styles.discardPile}
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
          {ready && (
            <Animated.View
              onLayout={(event) => {
                event.target.measure((x, y, width, height, pageX, pageY) => {
                  const t = { x, y, width, height };
                  // setCardList(getCards);
                  setCardBankLayout(t);
                  setReady(true);
                });
              }}
              style={styles.cardList}
            >
              {cardList.map((card) => card)}
            </Animated.View>
          )}
        </View>
      </Pressable>
    </GestureHandlerRootView>
  );
}
