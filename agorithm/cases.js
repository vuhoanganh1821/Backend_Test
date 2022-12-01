const cases = {
  firstCase: {
    neededContainer:  3,
    listings: [
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
    ]
  },
  secondCase: {
    neededContainer: 10,
    listings: [
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
        container: 2,
        totalCost: 3,
      },
    ]
  },
  thirdCase: {
    neededContainer: 10,
    listings: [
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
    ]
  }
}

module.exports = { cases }