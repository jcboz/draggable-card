// unused file. functions are still in use in Card.js
// wanted to seperate to clean up Card.js but too many parameters would be required. Actually not sure of best practice here
// is it better to have big files that don't need to pass around big values? Or is it better to sepereate stuff?

export function addToPile(flag) {
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
export function removeFromPile(flag) {
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
