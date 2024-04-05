export enum Tile {
    RoadVertical = 'RoadVertical',
    RoadHorizontal = "RoadHorizontal",
    Blank = "BlankBlack",
    CurveBL = "CurveBL",
    CurveBR = "CurveBR",
    CurveTR = "CurveTR",
    CurveTL = "CurveTL",
    Garage1 = "Garage1",
    Garage2 = "Garage2",
    Garage3 = "Garage3",
    GarageTriple = "GarageTriple",
    GarageTripleLeft = "GarageTripleLeft",
    Entrance = "Entrance",
    IntersectionAll = "IntersectionAll",
    IntersectionBottom = "IntersectionBottom",
  }

  export const map: Tile[][] = [
    [Tile.CurveBR, Tile.RoadHorizontal,Tile.RoadHorizontal,Tile.RoadHorizontal,Tile.RoadHorizontal,Tile.RoadHorizontal, Tile.CurveBL, Tile.Blank],
    [Tile.RoadVertical,Tile.Garage1,Tile.Garage2,Tile.Garage3,Tile.Blank,Tile.GarageTripleLeft,Tile.RoadVertical, Tile.Blank],
    [Tile.CurveTR,Tile.RoadHorizontal,Tile.RoadHorizontal,Tile.RoadHorizontal, Tile.IntersectionBottom,Tile.RoadHorizontal,Tile.IntersectionAll,Tile.Entrance],
    [Tile.Blank,Tile.Blank,Tile.Blank,Tile.Blank,Tile.RoadVertical, Tile.GarageTriple, Tile.RoadVertical, Tile.Blank],
    [Tile.Blank,Tile.Blank,Tile.Blank,Tile.Blank,Tile.CurveTR, Tile.RoadHorizontal, Tile.CurveTL, Tile.Blank]
  ];
  export const oldMap = [
    [Tile.CurveBR, Tile.RoadHorizontal,Tile.RoadHorizontal,Tile.RoadHorizontal,Tile.Blank,Tile.Blank,Tile.Blank,],
    [Tile.RoadVertical,Tile.Garage1,Tile.Garage2,Tile.Garage3,Tile.Blank,Tile.Blank,Tile.Blank,],
    [Tile.CurveTR,Tile.RoadHorizontal,Tile.RoadHorizontal,Tile.RoadHorizontal,Tile.CurveTL,],
  ];

  export const parkingSpots = {
    1: [15, 12],
    2: [25, 12],
    3: [35, 12],

  }
