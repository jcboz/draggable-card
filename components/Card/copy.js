// ###Code below is old, saving incase Can be deleted once getXLayout and getYLayout are done and tested
// if (
//   -(props.number - 1 * originalCardLayout.x) < props.pileOneLayout.width
// ) {
//   offsetX.value = withSpring(
//     getXLayout()
//     // props.pileOneLayout.x + 2 - cardLayout.x / 5
//   );
//   offsetY.value = withSpring(
//     getYLayout()
//     // -(props.viewLayout.height - props.pileOneLayout.y) +
//     //   cardLayout.height
//   );
// } else {
//   // bottom row of cards in pile
//   console.log("does this get called?");
//   offsetX.value = withSpring(
//     2 -
//       cardLayout.x / 5 -
//       props.pileOneLayout.width +
//       cardLayout.width / 2
//   );
//   offsetY.value = withSpring(
//     -(props.viewLayout.height - props.pileOneLayout.y) +
//       cardLayout.height +
//       55
//   );
// }

////#### Old code for printing out values used in checking if a card was in Pile 1
// console.log(
//   "Value Checks:",
//   "\noffsetX.value: ",
//   offsetX.value,
//   "\nprops.number: ",
//   props.number,
//   "\ncardLayout.x: ",
//   cardLayout.x,
//   "\noriginalCardLayout.x: ",
//   originalCardLayout.x,
//   "\ncardLayout.width: ",
//   cardLayout.width,
//   "\nprops.pileOneLayout.x",
//   props.pileOneLayout.x
// );
// console.log(
//   "Checks: \n",
//   offsetX.value -
//     (props.number - 1 * originalCardLayout.x) +
//     cardLayout.width / 2 >
//     props.pileOneLayout.x,
//   "\n",
//   offsetX.value -
//     (props.number - 1 * originalCardLayout.x) +
//     cardLayout.width / 2 <
//     props.pileOneLayout.x + props.pileOneLayout.width,
//   "\n",
//   props.viewLayout.height - -offsetY.value - cardLayout.height / 2 >
//     props.pileOneLayout.y,
//   "\n",
//   props.viewLayout.height - -offsetY.value - cardLayout.height / 2 <
//     props.pileOneLayout.y + props.pileOneLayout.height
// );

/////// ###### UNUSED HELPER FUNCTIONS ######### ///////
// unused because for some reason calling a worklet inside of a worklet causes the app to crash. Copy/pasting the exact same code into the original function works though
// will look at this later, not high priority.
function removeFromPileOne() {
  "worklet";

  if (props.pileOneArr.value.includes(props.number)) {
    const index = props.pileOneArr.value.indexOf(props.number);
    props.pileOneArr.modify((value) => {
      "worklet";

      value.splice(index, 1);
      return value;
    });
  }
}

function removeFromPileTwo() {
  "worklet";

  if (props.pileTwoArr.value.includes(props.number)) {
    const index = props.pileTwoArr.value.indexOf(props.number);
    props.pileTwoArr.modify((value) => {
      "worklet";

      value.splice(index, 1);
      return value;
    });
  }
  console.log("hey");
}

function removeFromPileThree() {
  "worklet";

  if (props.pileThreeArr.value.includes(props.number)) {
    const index = props.pileThreeArr.value.indexOf(props.number);
    props.pileThreeArr.modify((value) => {
      "worklet";

      value.splice(index, 1);
      return value;
    });
  }
}

function removeFromPileFour() {
  "worklet";

  if (props.pileFourArr.value.includes(props.number)) {
    const index = props.pileFourArr.value.indexOf(props.number);
    props.pileFourArr.modify((value) => {
      "worklet";

      value.splice(index, 1);
      return value;
    });
  }
}
