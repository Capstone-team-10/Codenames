    //getLoaderImage is a function returned by an IIFE.
    //we are using the IIFEs closure to keep track of the lastImageNo value
    const getLoaderImage = (() => {
      const cardImages = [ 
        "/images/agent-red-1.jpeg", 
        "/images/agent-red-2.png", 
        "/images/agent-blue-1.png", 
        "/images/agent-blue-2.png", 
        "/images/neutral-1.png", 
        "/images/neutral-2.png", 
        "/images/assassin.jpg"];

      let lastImageNo;
      return () => {
        let newImageNo = Math.floor(Math.random() * cardImages.length);
        if(newImageNo === lastImageNo){
          newImageNo = newImageNo === cardImages.length -1 ? 0 : newImageNo += 1;
        }
        lastImageNo = newImageNo;
        return cardImages[newImageNo];
      };
    })();

    export default getLoaderImage;
      