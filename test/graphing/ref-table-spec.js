import RefTable from '../../src/graphing/ref-table'
import Blip from '../../src/models/blip'
import Quadrant from '../../src/models/quadrant'
import Radar from '../../src/models/radar'
import Cycle from '../../src/models/cycle'

describe('RefTable', function () {
    var radar, toolsQuadrant, techniquesQuadrant, platformsQuadrant, languageFramework, element;

    beforeEach(function () {
        toolsQuadrant = new Quadrant('Tools');
        techniquesQuadrant = new Quadrant('Techniques');
        platformsQuadrant = new Quadrant('Platforms');
        languageFramework = new Quadrant('Languages');

        radar = new Radar();
        radar.setFirstQuadrant(toolsQuadrant);
        radar.setSecondQuadrant(techniquesQuadrant);
        radar.setThirdQuadrant(platformsQuadrant);
        radar.setFourthQuadrant(languageFramework);

        element = { innerHTML: '' };
        spyOn(document, 'querySelector').and.returnValue(element);
    });

    describe('render', function () {
        it("groups blips by cycle", function () {
            var adopt = new Cycle('Adopt');
            var assess = new Cycle('Assess');

            toolsQuadrant.add([
                new Blip('foo', adopt, true, 'this is foo'),
                new Blip('bar', assess, true, 'this is bar'),
                new Blip('baz', adopt, true, 'this is baz')
            ]);

            var table = new RefTable(radar);
            table.init('#some-id').render();

            expect(element.innerHTML).toEqual(
                '<table class="radar-ref-table">' +
                    '<tr class="radar-ref-status-group"><td colspan="3">Adopt</td></tr>' +
                    '<tr><td>-1</td><td>foo</td><td>this is foo</td></tr>' +
                    '<tr><td>-1</td><td>baz</td><td>this is baz</td></tr>' +
                    '<tr class="radar-ref-status-group"><td colspan="3">Assess</td></tr>' +
                    '<tr><td>-1</td><td>bar</td><td>this is bar</td></tr>' +
                '</table>');
        });

        it("respects the assigned order of cycles", function () {
            var adopt = new Cycle('Adopt', 1);
            var assess = new Cycle('Assess', 3);
            var hold = new Cycle('Hold', 2);

            toolsQuadrant.add([
                new Blip('foo', adopt, true, 'this is foo'),
                new Blip('bar', assess, true, 'this is bar'),
                new Blip('baz', hold, true, 'this is baz')
            ]);

            var table = new RefTable(radar);
            table.init('#some-id').render();

            expect(element.innerHTML).toEqual(
                '<table class="radar-ref-table">' +
                    '<tr class="radar-ref-status-group"><td colspan="3">Adopt</td></tr>' +
                    '<tr><td>-1</td><td>foo</td><td>this is foo</td></tr>' +
                    '<tr class="radar-ref-status-group"><td colspan="3">Hold</td></tr>' +
                    '<tr><td>-1</td><td>baz</td><td>this is baz</td></tr>' +
                    '<tr class="radar-ref-status-group"><td colspan="3">Assess</td></tr>' +
                    '<tr><td>-1</td><td>bar</td><td>this is bar</td></tr>' +
                '</table>');
        });
    });
});
