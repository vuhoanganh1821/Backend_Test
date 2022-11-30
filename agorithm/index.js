const neededContainer = 3
const renterList = [
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


rentContainersAtTheLowestPrice(renterList, neededContainer)

function rentContainersAtTheLowestPrice(listings, neededContainer) {
  let count = 0
  const result = []

  listings.forEach(lessor => lessor.containerPrice = lessor.totalCost / lessor.container)

  listings.sort((currentLessor, nextLessor) => currentLessor.containerPrice - nextLessor.containerPrice)

  for (let lessor of listings) {
    result.push(lessor)
    count = count + lessor.container
    if (count >= neededContainer)
      break
  }

//  listings.forEach(lessor => console.log(lessor))

  result.forEach(lessor => console.log(lessor))

  output(result, count)
}

function output(result, count) {
  let totalCost = 0
  result.forEach(lessor => totalCost += lessor.totalCost)

  result.forEach((lessor) => console.log('[Contract with]', lessor.name, lessor.container, 'container, price: ', lessor.totalCost))

  if (count < neededContainer)
    console.log('Not enough containers')

  console.log('[Sumary] total cost', totalCost)
}
