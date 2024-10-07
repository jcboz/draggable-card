import {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
  withSpring,
  runOnJS,
} from "react-native-reanimated";

export function getXLayout(pileOneArr, cardWidth, pileOneX) {
  "worklet";

  // left: 20 <- in DraggableCard styles under cardList
  // left: 5 <- in Card styles under container
  // ^ need to account for these values when computing X value
  const CARD_OFFSET_X = 25; // ^^^
  const numberOfCards = pileOneArr.length - 1;

  return numberOfCards * cardWidth + pileOneX - CARD_OFFSET_X; //(numberOfCards - 1) * cardWidth + ;
}

export function getYLayout(
  pileArr,
  cardWidth,
  pileY,
  cardHeight,
  pileHeight,
  viewHeight
) {
  "worklet";

  // bottom: 12 <- in DraggableCards styles under cardList
  // top: 5 <- in Card styles under container
  const CARD_OFFSET_Y = 17;

  return -viewHeight + pileY + CARD_OFFSET_Y + cardHeight;
}
// need to get index of card in cardBankArr and then use that index for offsetsArr[index].x = 66 * index (thats the card width * the place in the array it is)
export function getCardListLayoutX(cardBankArr, offsetsArr, number) {
  "worklet";
  const CARD_WIDTH = 66;
  const index = cardBankArr.indexOf(number);
  return CARD_WIDTH * index;
}
export function getCardListLayoutY(cardBankArr) {
  "worklet";
  const CARD_WIDTH = 66;
  const numberOfCards = cardBankArr.length - 1;
  const y = 0;
  return y;
}

export function reorderOffsets() {
  console.log("Hello!");
}
