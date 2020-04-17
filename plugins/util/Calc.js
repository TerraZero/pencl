export default class Calc {

  static length(object) {
    if (Array.isArray(object)) {
      return object.length;
    }
    if (typeof object === 'string') {
      return object.length;
    }
    let count = 0;
    for (const field in object) {
      count++;
    }
    return count;
  }

  static getCirclePoint(degrees) {
    return {
      x: Math.sin(Calc.getRadiant(degrees)),
      y: Math.cos(Calc.getRadiant(degrees)),
    };
  }

  static getRadiant(degrees) {
    return degrees * (Math.PI / 180);
  }

  static getDegrees(radians) {
    return radians * 180 / Math.PI;
  }

  static random(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

}
