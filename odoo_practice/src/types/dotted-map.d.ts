declare module 'dotted-map' {
  interface DottedMapOptions {
    height: number;
    grid?: 'vertical' | 'diagonal' | 'horizontal';
    avoidOuterPins?: boolean;
  }

  interface Point {
    lat: number;
    lng: number;
    data?: any;
  }

  interface SVGMapOptions {
    radius?: number;
    color?: string;
    shape?: string;
    backgroundColor?: string;
  }

  class DottedMap {
    constructor(options: DottedMapOptions);
    addPin(point: Point): void;
    getPoints(): Point[];
    getSVG(options?: SVGMapOptions): string;
  }

  export = DottedMap;
}
