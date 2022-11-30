const neededContainer = 11
const renterList = [
  {
    name: "Container renter A",
    container: 5,
    totalCost: 5,
  },
  {
    name: "Container renter B",
    container: 2,
    totalCost: 10,
  },
  {
    name: "Container renter C",
    container: 10,
    totalCost: 3,
  },
];


rentContainersAtTheLowestPrice(renterList, neededContainer)

function rentContainersAtTheLowestPrice(listings, neededContainer) {
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

  result.forEach(lessor => console.log(lessor))

  output(result, rentedContainer)
}

function output(result, rentedContainer) {
  let totalCost = 0
  result.forEach(lessor => totalCost += lessor.totalCost)

  result.forEach((lessor) => console.log('[Contract with]', lessor.name, lessor.container, 'container, price:', lessor.totalCost))

  if (rentedContainer < neededContainer)
    console.log('Not enough containers')

  console.log('[Sumary] total cost', totalCost)
}
