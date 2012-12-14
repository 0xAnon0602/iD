describe("iD.modes.AddPlace", function () {
    var container, map, history, controller, mode;

    beforeEach(function () {
        container  = d3.select('body').append('div');
        map        = iD.Map();
        history    = iD.History();
        controller = iD.Controller(map, history);

        container.call(map);

        mode = iD.modes.AddPlace();
        controller.enter(mode);
    });

    afterEach(function() {
        container.remove();
    });

    describe("clicking the map", function () {
        it("adds a node", function () {
            happen.click(map.surface.node(), {});
            expect(history.changes().created).to.have.length(1);
        });

        it("selects the node", function () {
            happen.click(map.surface.node(), {});
            expect(controller.mode.id).to.equal('select');
            expect(controller.mode.entity).to.equal(history.changes().created[0]);
        });
    });

    describe("pressing ⎋", function () {
        it("exits to browse mode", function () {
            happen.keydown(document, {keyCode: 27});
            expect(controller.mode.id).to.equal('browse');
        });
    });
});
