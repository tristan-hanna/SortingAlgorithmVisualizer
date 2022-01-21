import React from "react";
import './SortingVisualizer.css';
import { getMergeSortAnimations } from "../sortingAlgorithms/sortingAlgorithms";

const ANIMATION_SPEED = 3;
const NUMBER_OF_ARRAY_BARS = 300;
const PRIMARY_COLOR = 'red';
const SECONDARY_COLOR = 'blue';

export default class SortingVisualizer extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {array: [], };
    }

    componentDidMount()
    {
        this.resetArray();
    }

    resetArray()
    {
        const array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++)
        {
            array.push(randomIntFromInterval(5, 600)); 
        }
        this.setState({array});
    }

    mergeSort()
    {
        // const correctlySortedArray = this.state.array.slice().sort();
        // const mySortedArray = sortingAlgorithms.mergeSort(this.state.array);
        // console.log("Are the two arrays sorted the same way?" + areArraysEqual(correctlySortedArray, mySortedArray));

        const animations = getMergeSortAnimations(this.state.array);

        for (let i = 0; i < animations.length; i++)
        {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;

            if (isColorChange)
            {
                const [barOneIndx, barTwoIndx] = animations[i];
                const barOneStyle = arrayBars[barOneIndx].style;
                const barTwoStyle = arrayBars[barTwoIndx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;

                setTimeout(() => 
                {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED);
            }
            else
            {
                setTimeout(() => 
                {
                    const [barOneIndx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIndx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED)
            }
        }
    }

    quickSort()
    {

    }

    bubbleSort()
    {

    }

    heapSort()
    {

    }

    render()
    {
        const{array} = this.state;

        return(
            <div className="array-container">
                {array.map((value, idx) => (
                    <div 
                        className="array-bar" 
                        key={idx}
                        style={{backgroundColor: PRIMARY_COLOR, height: `${value}px`}}>
                    </div>
                ))}
                <button onClick={() => this.resetArray()}>Generate New Array</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
                <button onClick={() => this.quickSort()}>Quick Sort</button>
                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                <button onClick={() => this.heapSort()}>Heap Sort</button>
            </div>
        );
    }
}

//Function that generates 100 random numbers into the array
function randomIntFromInterval(min, max)
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function areArraysEqual(array1, array2)
{
    if(array1.length !== array2.length)
    {
        return false;
    }

    for(let i = 0; i < array1.length; i++)
    {
        if(array1[i] != array2[i])
        {
            return false;
        }
    }
    return true;
}