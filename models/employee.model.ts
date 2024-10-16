export interface Employee {
    name: string;
    age: number;
    phone: {
      personal: string;
      work: string;
      ext: string;
    };
    privileges: string;
    favorites: {
      artist: string;
      food: string;
    };
    finished: number[];
    badges: string[];
    points: {
      points: number;
      bonus: number;
    }[];
  }
  