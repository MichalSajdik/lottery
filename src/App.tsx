import React, {useEffect, useState} from 'react';
import './App.css';
let intervalId: number;
let firstStop = true;

let lotterySlots = [
    {value: 'Lotéria', image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/grayscale.jpg'},
    {value: '3', image: 'https://media.gcflearnfree.org/ctassets/topics/246/share_flower_fullsize.jpg'},
    {value: '4', image: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg'},
    {value: '5', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIT_X7uxU2yh1i7bMRYCjsmmUUEesmr3g0yEEEKxk-rg&s'},
    {value: '6', image: 'https://th.bing.com/th/id/OIG.MxQxUggA0RKmKdTjwAqw'},
    {value: '7a', image: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/grayscale.jpg'},
    {value: '8a', image: 'https://i.natgeofe.com/n/9a66de8b-f698-4193-9ba6-3483b4d3bcf4/flying-fish_16x9.jpg'}
]

function App() {

    const [isSpinning, setIsSpinning] = useState(false);
    const [currentSlotIndex, setCurrentSlotIndex] = useState(0);



    useEffect(() => {

        if (isSpinning) {
            intervalId = window.setInterval(()=>{
                setCurrentSlotIndex((prevIndex) => (prevIndex + 1) % lotterySlots.length);
            }, 100); // Adjust the interval as needed
        } else {
            clearInterval(intervalId);
        }

        return () => clearInterval(intervalId);
    }, [isSpinning, lotterySlots.length]);

    const handleStart = () => {
        console.log(currentSlotIndex)
        lotterySlots.splice(currentSlotIndex, 1);
        console.log(lotterySlots);
        setIsSpinning(true);
    };

    const handleStop = () => {
        setIsSpinning(false);
        if(firstStop) {
            firstStop = false;
            clearInterval(intervalId);
            setCurrentSlotIndex(2);
        }
    };


  return (
      <div className="App">

          <div>
              <button onClick={handleStart} disabled={isSpinning || lotterySlots.length === 1}>
                  Start
              </button>
              <button onClick={handleStop} disabled={!isSpinning}>
                  Stop
              </button>
          </div>
          <div style={{backgroundColor: "#ffd",
              fontSize: "8em"}}>
              {lotterySlots[currentSlotIndex].value}
              <br/>
              <img src={lotterySlots[currentSlotIndex].image} alt="logo"
                   style={{ maxWidth: '400px', maxHeight: '400px' }} />
          </div>


      </div>
  );
}

export default App;
