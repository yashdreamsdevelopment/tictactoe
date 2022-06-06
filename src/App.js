import React, { useState } from "react";
import Icon from "./components/Icon";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Card, CardBody, Button, Container, Col, Row } from "reactstrap";

import "./App.css";

const itemArray = new Array(9).fill("empty");
const cards = document.getElementsByClassName("card");

const App = () => {
  const [isCross, setIsCross] = useState(false);
  const [winMessage, setWinMessage] = useState("");

  const reloadGame = () => {
    Array.from(cards).map((card) => card.classList.remove("win"));
    setIsCross(false);
    setWinMessage("");
    itemArray.fill("empty", 0, 9);
  };

  const glowCard = (...a) => {
    a.map((i) => cards[i].classList.add("win"));
  };

  const checkIsWinner = () => {
    if (
      // check for the 1st row
      itemArray[0] === itemArray[1] &&
      itemArray[0] === itemArray[2] &&
      itemArray[0] !== "empty"
    ) {
      glowCard(0, 1, 2);
      setWinMessage(`${itemArray[0]} wins`);
    } else if (
      // check for the 2nd row
      itemArray[3] === itemArray[4] &&
      itemArray[3] === itemArray[5] &&
      itemArray[3] !== "empty"
    ) {
      glowCard(3, 4, 5);
      setWinMessage(`${itemArray[3]} wins`);
    } else if (
      // check for the 3rd row
      itemArray[6] === itemArray[7] &&
      itemArray[6] === itemArray[8] &&
      itemArray[6] !== "empty"
    ) {
      glowCard(6, 7, 8);
      setWinMessage(`${itemArray[6]} wins`);
    } else if (
      // check for the 1st column
      itemArray[0] === itemArray[3] &&
      itemArray[0] === itemArray[6] &&
      itemArray[0] !== "empty"
    ) {
      glowCard(0, 3, 6);
      setWinMessage(`${itemArray[0]} wins`);
    } else if (
      // check for the 2nd column
      itemArray[1] === itemArray[4] &&
      itemArray[1] === itemArray[7] &&
      itemArray[1] !== "empty"
    ) {
      glowCard(1, 4, 7);
      setWinMessage(`${itemArray[1]} wins`);
    } else if (
      // check for the 3rd column
      itemArray[2] === itemArray[5] &&
      itemArray[2] === itemArray[8] &&
      itemArray[2] !== "empty"
    ) {
      glowCard(2, 5, 8);
      setWinMessage(`${itemArray[2]} wins`);
    } else if (
      // check for the 1st diagonal
      itemArray[0] === itemArray[4] &&
      itemArray[0] === itemArray[8] &&
      itemArray[0] !== "empty"
    ) {
      glowCard(0, 4, 8);
      setWinMessage(`${itemArray[0]} wins`);
    } else if (
      // check for the 2nd diagonal
      itemArray[2] === itemArray[4] &&
      itemArray[2] === itemArray[6] &&
      itemArray[2] !== "empty"
    ) {
      glowCard(2, 4, 6);
      setWinMessage(`${itemArray[2]} wins`);
    } else if (itemArray.indexOf("empty") === -1) {
      setWinMessage("Match Draw");
    } else {
      setWinMessage("");
    }
  };

  const changeItem = (itemNumber) => {
    if (winMessage) {
      return toast(winMessage, { type: "success" });
    }

    if (itemArray[itemNumber] === "empty") {
      itemArray[itemNumber] = isCross ? "cross" : "circle";
      window.navigator.vibrate(200);
      setIsCross(!isCross);
    } else {
      return toast("Already Filled", { type: "error" });
    }

    checkIsWinner();
  };

  return (
    <Container className="p-5">
      <ToastContainer position="bottom-center" />

      <Row>
        <Col md={6} className="offset-md-3">
          {winMessage ? (
            <div className="my-2">
              <h1 className="text-primary text-uppercase text-center">
                {winMessage}
              </h1>
              <Button color="success" block onClick={reloadGame}>
                Reload Game
              </Button>
            </div>
          ) : (
            <h1 className="text-center text-warning mb-3">
              {isCross ? "Cross" : "Circle"} turns
            </h1>
          )}
          <div className="grid">
            {itemArray.map((item, index) => (
              <Card
                onClick={() => changeItem(index)}
                color="warning"
                key={index}
              >
                <CardBody className="box">
                  <Icon name={item} />
                </CardBody>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
