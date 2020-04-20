const cardImages = [ 
    "/images/agent-red-1.jpeg", 
    "/images/agent-red-2.png", 
    "/images/agent-blue-1.png", 
    "/images/agent-blue-2.png", 
    "/images/neutral-1.png", 
    "/images/neutral-2.png", 
    "/images/assassin.jpg"];

    export default () => {
        console.log("In getLoaderResults");
        return cardImages[
          Math.floor(Math.random() * cardImages.length)
        ];
      };
      