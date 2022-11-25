const neededContainer = 3;
const listings = [
  {
    name: "Container renter A",
    container: 1,
    totalCost: 1,
  },
  {
    name: "Container renter B",
    container: 2,
    totalCost: 1,
  },
  {
    name: "Container renter C",
    container: 3,
    totalCost: 3,
  },
];

let count = 0
let sum = 0
const result = []
const containerList = listings
containerList.forEach(item => item.avgCost = item.totalCost / item.container)

rentContainersAtTheLowestPrice()

function rentContainersAtTheLowestPrice() {
  while (count != neededContainer || containerList.length == 0) {
  
    const i = findIndexAvgCostMin(containerList)
    const lowestCostContainer = containerList[i]
  
    count += lowestCostContainer.container
    sum += lowestCostContainer.totalCost
  
    result.push(lowestCostContainer)
    containerList.splice(i, 1)
  }
  output()
}

function output() {
  if (count < neededContainer)
    console.log('Not enough containers')
  else 
    result.forEach((r) => console.log('[Contract with]', r.name, r.container, 'container, price: ', r.totalCost))
  console.log('[Sumary] total cost', sum)
}

function findIndexAvgCostMin(arr) {
  let indexMin = 0
  let costMin = arr[0].avgCost
  for (let i = 1; i < arr.length; i++)
    if (arr[i].avgCost < costMin) {
      costMin = arr[i].avgCost
      indexMin = i
    }
  return indexMin
}