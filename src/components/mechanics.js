import { Component } from "react";

class Mechanics extends Component {
  startGame = () => {
    console.log("Burst All:", this.state.pickedBubble);
    // Create a bubblesList
    let bubbles = [];
    for (let i = 1; i <= 64; i++) {
      let bubble = { id: "bubble" + i, visibility: "visible" };
      bubbles.push(bubble);
    }
    // Create a triggerBubbles
    let triggerBubbles = [];
    for (let i = 0; i < 7; i++) {
      triggerBubbles.push("bubble" + Math.floor(Math.random() * 64 + 1));
    }
    this.setState({
      startButton: false,
      bubblesList: bubbles,
      triggerBubbles: triggerBubbles
    });
    // Timer
    setInterval(
      function() {
        this.state.timeLeft >= 1
          ? this.setState({ timeLeft: this.state.timeLeft - 1 })
          : this.stopGame();
      }.bind(this),
      1000
    );
  };

  clickBubble = ev => {
    let clickedBubble = ev.currentTarget.id;
    if (clickedBubble === this.state.pickedBubble) {
      this.burstBonus();
    } else if (this.state.triggerBubbles.indexOf(clickedBubble) >= 0) {
      this.showBubbles(clickedBubble);
    } else {
      this.hideBubble(clickedBubble);
    }
  };

  // Hide clicked bubble
  hideBubble = clickedBubble => {
    const bubblesList = [...this.state.bubblesList];
    const bubble = bubblesList.find(b => b.id === clickedBubble);
    const index = bubblesList.indexOf(bubble);
    bubblesList[index] = { ...bubblesList[index] };
    bubblesList[index].visibility = "invisible";
    this.setState({
      bubblesList
    });
  };

  // Show bubbles from triggered bubble
  showBubbles = clickedBubble => {
    // Random select bubbles to show
    const showList = [];
    for (let i = 0; i < 7; i++) {
      showList.push(Math.floor(Math.random() * 64));
    }
    const bubblesList = [...this.state.bubblesList];
    for (let i = 0; i < showList.length; i++) {
      let index = showList[i];
      bubblesList[index] = { ...bubblesList[index] };
      bubblesList[index].visibility = "visible";
    }
    // Hide clicked bubble
    const bubble = bubblesList.find(b => b.id === clickedBubble);
    const index = bubblesList.indexOf(bubble);
    bubblesList[index] = { ...bubblesList[index] };
    bubblesList[index].visibility = "invisible";
    this.setState({
      bubblesList
    });
  };

  stopGame = () => {
    this.burst();
    setTimeout(
      function() {
        this.setState({
          instruction: false,
          timeUP: true
        });
      }.bind(this),
      1000
    );
  };

  // Burst all bubble by pickedBubble
  burstBonus = () => {
    this.burst();
    setTimeout(
      function() {
        this.setState({
          instruction: false,
          goodjob: true,
          timeUP: false
        });
      }.bind(this),
      1000
    );
  };

  // Burst All Bubbles
  burst = () => {
    this.setState({
      allBubbles: false
    });
  };

  reset = () => {
    window.location.reload();
  };
}

export default Mechanics;