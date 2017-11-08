import Radar from '../../src/models/radar'
import Blip from '../../src/models/blip'
import Quadrant from '../../src/models/quadrant'
import Cycle from '../../src/models/cycle'

describe('Radar', function () {

  it('has no quadrants by default', function () {
    var radar = new Radar();

    expect(radar.quadrants().I).toBe(null);
    expect(radar.quadrants().II).toBe(null);
    expect(radar.quadrants().III).toBe(null);
    expect(radar.quadrants().IV).toBe(null);
  });

  it('sets the first quadrant', function () {
    var quadrant, radar, blip;

    blip = new Blip('A', new Cycle('First'));
    quadrant = new Quadrant('First');
    quadrant.add([blip]);
    radar = new Radar();

    radar.setFirstQuadrant(quadrant);

    expect(radar.quadrants().I).toEqual(quadrant);
    expect(radar.quadrants().I.blips()[0].number()).toEqual(1);
  });

  it('sets the second quadrant', function () {
    var quadrant, radar, blip;

    blip = new Blip('A', new Cycle('First'));
    quadrant = new Quadrant('Second');
    quadrant.add([blip]);
    radar = new Radar();

    radar.setSecondQuadrant(quadrant);

    expect(radar.quadrants().II).toEqual(quadrant);
    expect(radar.quadrants().II.blips()[0].number()).toEqual(1);
  });

  it('sets the third quadrant', function () {
    var quadrant, radar, blip;

    blip = new Blip('A', new Cycle('First'));
    quadrant = new Quadrant('Third');
    quadrant.add([blip]);
    radar = new Radar();

    radar.setThirdQuadrant(quadrant);

    expect(radar.quadrants().III).toEqual(quadrant);
    expect(radar.quadrants().III.blips()[0].number()).toEqual(1);
  });

  it('sets the fourth quadrant', function () {
    var quadrant, radar, blip;

    blip = new Blip('A', new Cycle('First'));
    quadrant = new Quadrant('Fourth');
    quadrant.add([blip]);
    radar = new Radar();

    radar.setFourthQuadrant(quadrant);

    expect(radar.quadrants().IV).toEqual(quadrant);
    expect(radar.quadrants().IV.blips()[0].number()).toEqual(1);
  });

  describe('blip numbers', function () {
    var firstQuadrant, secondQuadrant, radar, firstCycle;

    beforeEach(function () {
      firstCycle = new Cycle('Adopt', 0);
      firstQuadrant = new Quadrant('First');
      secondQuadrant = new Quadrant('Second');
      firstQuadrant.add([
        new Blip('A', firstCycle),
        new Blip('B', firstCycle)
      ]);
      secondQuadrant.add([
        new Blip('C', firstCycle),
        new Blip('D', firstCycle)
      ]);
      radar = new Radar();
    });

    it('sets blip numbers starting on the first quadrant', function () {
      radar.setFirstQuadrant(firstQuadrant);

      expect(radar.quadrants().I.blips()[0].number()).toEqual(1);
      expect(radar.quadrants().I.blips()[1].number()).toEqual(2);
    });

    it('continues the number from the previous quadrant set', function () {
      radar.setFirstQuadrant(firstQuadrant);
      radar.setSecondQuadrant(secondQuadrant);

      expect(radar.quadrants().II.blips()[0].number()).toEqual(3);
      expect(radar.quadrants().II.blips()[1].number()).toEqual(4);
    });
  });

  describe('cycles', function () {
    var quadrant, radar, firstCycle, secondCycle;

    beforeEach(function () {
      firstCycle = new Cycle('Adopt', 0);
      secondCycle = new Cycle('Hold', 1);
      quadrant = new Quadrant('Fourth');
      radar = new Radar();
    });

    it('returns an array for a given set of blips', function () {
      quadrant.add([
        new Blip('A', firstCycle),
        new Blip('B', secondCycle)
      ]);

      radar.setFirstQuadrant(quadrant);

      expect(radar.cycles()).toEqual([firstCycle, secondCycle]);
    });

    it('has unique cycles', function () {
      quadrant.add([
        new Blip('A', firstCycle),
        new Blip('B', firstCycle),
        new Blip('C', secondCycle)
      ]);

      radar.setFirstQuadrant(quadrant);

      expect(radar.cycles()).toEqual([firstCycle, secondCycle]);
    });

    it('has sorts by the cycle order', function () {
      quadrant.add([
        new Blip('C', secondCycle),
        new Blip('A', firstCycle),
        new Blip('B', firstCycle)
      ]);

      radar.setFirstQuadrant(quadrant);

      expect(radar.cycles()).toEqual([firstCycle, secondCycle]);
    });
  });
});
