const neededContainers = 3
const lessorList = [
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


rentContainers(lessorList, neededContainers)

function rentContainers(listings, neededContainer) {
  let rentedContainer = 0
  const result = []

  listings.forEach(lessor => lessor.containerPrice = lessor.totalCost / lessor.container)
  listings.sort((currentLessor, nextLessor) => currentLessor.containerPrice - nextLessor.containerPrice)

  for (let lessor of listings) {
    if (lessor.container >= neededContainer - rentedContainer) {
      lessor.container = neededContainer - rentedContainer
      lessor.totalCost = lessor.containerPrice * (neededContainer - rentedContainer)
      result.push(lessor)
      rentedContainer += lessor.container
      break
    }
    result.push(lessor)
    rentedContainer += lessor.container
  }

  printResult(result, rentedContainer, neededContainer)
}

function printResult(result, rentedContainer, neededContainer) {
  let totalCost = 0
  result.forEach(lessor => totalCost += lessor.totalCost)

  result.forEach((lessor) => console.log('[Contract with]', lessor.name, lessor.container, 'container, price:', lessor.totalCost))

  if (rentedContainer < neededContainer)
    console.log('Not enough containers')

  console.log('[Sumary] total cost', totalCost)
}
