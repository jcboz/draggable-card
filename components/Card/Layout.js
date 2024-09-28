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
  console.log("Hello from Layout Y! ", pileY);

  return -viewHeight + pileY + CARD_OFFSET_Y + cardHeight;
}

export function getCardListLayout(cardBankArr) {
  "worklet";
  const CARD_WIDTH = 66;
  const numberOfCards = cardBankArr.length - 1;
  const x = numberOfCards * CARD_WIDTH;
  const y = 0;
  return { x, y };
}
