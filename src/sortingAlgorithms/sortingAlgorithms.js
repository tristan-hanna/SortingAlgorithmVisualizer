export function getMergeSortAnimations(array)
{
    const animations = [];

    if (array.length <=1)
    {
        return array;
    }

    const auxillaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxillaryArray, animations);
    
    return animations;
}

function mergeSortHelper(mainArray, startIndx, endIndx, auxillaryArray, animations)
{
    if (startIndx === endIndx)
    {
        return;
    }

    const middleIndx = Math.floor((startIndx + endIndx) / 2);
    mergeSortHelper(auxillaryArray, startIndx, middleIndx, mainArray, animations);
    mergeSortHelper(auxillaryArray, middleIndx + 1, endIndx, mainArray, animations);
    merge(mainArray, startIndx, middleIndx, endIndx, auxillaryArray, animations);
}

function merge (mainArray, startIndx, middleIndx, endIndx, auxillaryArray, animations)
{
    let k = startIndx;
    let i = startIndx;
    let j = middleIndx + 1;

    while (i <= middleIndx && j <= endIndx) 
    {
        animations.push([i, j]);
        animations.push([i, j]);

        if (auxillaryArray[i] <= auxillaryArray[j])
        {
            animations.push([k, auxillaryArray[i]]);
            mainArray[k++] = auxillaryArray[i++];
        } 
        else 
        {
            animations.push([k, auxillaryArray[j]]);
            mainArray[k++] = auxillaryArray[j++];
        }
    }

    while (i <= middleIndx) 
    {
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, auxillaryArray[i]]);
        mainArray[k++] = auxillaryArray[i++];
    }

    while (j <= endIndx) 
    {
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([k, auxillaryArray[j]]);
        mainArray[k++] = auxillaryArray[j++];
    }
}