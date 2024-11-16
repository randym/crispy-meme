PLANS = [
  {
    name: "Yoru Toku Plan",
    groups: [
      {
        name: "Day time",
        tiers: [
          { min: nil, max: 90, rate: 24.03 },
          { min: 90, max: 230, rate: 32.03 },
          { min: 230, max: nil, rate: 37.00 }
        ],
        hours: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
      },
      {
        name: "Night time",
        tiers: [{ min: nil, max: nil, rate: 12.48 }],
        hours: [21, 22, 23, 0, 1, 2, 3, 4]
      }
    ]
  }
]
