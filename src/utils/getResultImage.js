const resultImages = {
  red: ["/images/agent-red-1.jpeg", "/images/agent-red-2.png"],
  blue: ["/images/agent-blue-1.png", "/images/agent-blue-2.png"],
  white: ["/images/neutral-1.png", "/images/neutral-2.png"],
  black: ["/images/assassin.jpg"]
};

export default result => {
  console.log("In getImageResults: result is: ", result);
  return resultImages[result][
    Math.floor(Math.random() * resultImages[result].length)
  ];
};
