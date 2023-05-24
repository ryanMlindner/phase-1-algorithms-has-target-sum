function hasTargetSum(array, target) {
  // first attempt, O(N^2)
  // const length = array.length;
  // for (let index = 0; index < length; index++) {
  //   let firstCompare = array[index];

  //   for (let secondIndex = index + 1; secondIndex < length; secondIndex++) {
  //     let secondCompare = array[secondIndex];

  //     if ((firstCompare + secondCompare) === target) {
  //       return true;
  //     }
  //   }
  // }
  // return false;

  //second attempt, omega(n), worst case N^2 still
  const length = array.length;
  const sorted = array//.sort((a, b) => a-b); // <=makes the big arrays perform worse
  //using sorted to divide and conquer would probably make it more reliable, BUT
  //O(n) for 80% of tests is pretty okay
  let comparisons = 0;
  for (let index = 0; index < length; index++) {
    let firstCompare = sorted[index];
    let slicedArray = sorted.slice(index + 1); //smaller and smaller compare lengths
    let idealMatch = target - firstCompare;
    //I /think/ find is what I want, but I dont know how to get it to return how many compares
    //it performed before finding a match, so I'm assuming worst case for each iteration
    comparisons += (length - (index + 1));
    let foundMatch = slicedArray.find(element => element === idealMatch);
    if (foundMatch !== undefined) {
      console.log(`number of comparisons: ${comparisons} on array of length ${length}`)
      return true;
    }
  }
  console.log(`number of comparisons: ${comparisons} on array of length ${length}`)
  return false;
}

/* 
  Write the Big O time complexity of your function here
  T(n) = theta(n) + theta(n-1) ... + theta(1)
  T(n) = theta(n^2)
  O(n^2) 
*/

/* 
  Add your pseudocode here
  V1 brute force (summation of (N-1), which is upper bounded by... N^2? I forget)
  for each possible combination of numbers in the array,
    see if they add to the target
      if they do, done
      if not, continue
*/

/*
  Add optimization brainstorming here
  how can we cut down on comparisons?
    sort the array first
    if no negatives, then anything bigger than target is out
    if 0 exists, if any number == target, then done

*/

// You can run `node index.js` to view these console logs
if (require.main === module) {
  // add your own custom tests in here
  console.log("Expecting: true");
  console.log("=>", hasTargetSum([3, 8, 12, 4, 11, 7], 10));

  console.log("");

  console.log("Expecting: true");
  console.log("=>", hasTargetSum([22, 19, 4, 6, 30], 25));

  console.log("");

  console.log("Expecting: false");
  console.log("=>", hasTargetSum([1, 2, 5], 4));

  const testArrayHolder = [];
  const constraint = 1000;
  for (index = 0; index <= constraint; index ++) {
    testArrayHolder.push(Math.floor(Math.random() * 100));
  }
  //standard case, evaluates to O(n) (usually)
  console.log(testArrayHolder, hasTargetSum(testArrayHolder, 50));
  //absolute worst case, will evaluate false
  console.log(testArrayHolder, hasTargetSum(testArrayHolder, 201));
}

module.exports = hasTargetSum;
