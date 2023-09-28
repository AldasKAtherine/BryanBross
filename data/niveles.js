const getRandomInt = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

var niveles = [
  [[24, 239], [724, 244], [[0, 288, 330, 192, 1], [438, 288, 330, 192, 1]], []],
  [
    [371, 51],
    [724, 404],
    [
      [0, 100, 768, 16, 1],
      [0, 216, 768, 16, 0],
      [0, 332, 768, 16, 1],
      [0, 448, 768, 32, 0]
    ],
    []
  ],
  [[24, 239], [724, 244], [[0, 288, 330, 192, 1], [438, 288, 330, 192, 0]], []],
  [
    [23, 263],
    [724, 268],
    [[0, 312, 768, 8, 1], [380, 0, 8, 312, 1], [0, 408, 768, 72, 0]],
    []
  ],
  [
    [24, 399],
    [604, 152],
    [
      [0, 448, 768, 32, 1],
      [128, 320, 512, 8, 1],
      [632, 328, 8, 120, 1],
      [128, 192, 512, 8, 1],
      [128, 200, 8, 120, 1],
      [640, 384, 128, 8, 0],
      [0, 256, 128, 8, 0]
    ],
    []
  ],
  [
    [16, 275],
    [566, 248],
    [
      [0, 0, 768, 64, 1],
      [0, 64, 128, 192, 1],
      [0, 324, 248, 92, 1],
      [0, 416, 768, 64, 1],
      [192, 132, 180, 96, 1],
      [440, 64, 100, 224, 1],
      [620, 112, 72, 245, 1],
      [192, 228, 56, 96, 1],
      [300, 288, 320, 69, 1]
    ],
    []
  ],
  [
    [16, 367],
    [704, 84],
    [
      [0, 416, 244, 64, 1],
      [524, 128, 244, 352, 1],
      [288, 320, 64, 160, 0],
      [416, 224, 64, 256, 0]
    ],
    []
  ],
  [
    [104, 175],
    [176, 32],
    [
      [96, 224, 56, 8, 1],
      [96, 232, 56, 8, 0],
      [144, 72, 8, 152, 1],
      [152, 72, 8, 168, 0],
      [160, 72, 128, 92, 1],
      [160, 164, 256, 92, 1],
      [160, 256, 384, 92, 1],
      [544, 256, 8, 92, 0],
      [160, 348, 512, 92, 1],
      [160, 440, 512, 8, 0],
      [552, 340, 120, 8, 0]
    ],
    []
  ],
  [
    [16, 422],
    [724, 416],
    [
      [0, 472, 48, 8, 1],
      [0, 376, 48, 8, 0],
      [0, 280, 48, 8, 1],
      [0, 184, 96, 8, 0],
      [384, 456, 384, 24, 1]
    ],
    []
  ],
  [[16, 239], [724, 244], [[0, 288, 768, 192, 1], [336, 0, 96, 288, 1]], []],
  [
    [16, 56],
    [724, 216],
    [0, 1, 2, 3, 4, 5, 6, 7].map(x => [
      x * 96,
      getRandomInt(240, 300),
      getRandomInt(24, 72),
      getRandomInt(24, 180),
      getRandomInt(0, 2)
    ]),
    []
  ],
  [
    [24, 8],
    [724, getRandomInt(128, 416)],
    [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23
    ].map(x => [x * 32, getRandomInt(64, 464), 8, 8, getRandomInt(0, 2)]),
    []
  ]
];
