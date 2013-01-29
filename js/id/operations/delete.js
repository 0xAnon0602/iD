iD.operations.Delete = function(entityId) {
    var operation = function(history) {
        var graph = history.graph(),
            entity = graph.entity(entityId),
            geometry = entity.geometry(graph);

        if (geometry === 'vertex') {
            history.perform(
                iD.actions.DeleteNode(entityId),
                'deleted a vertex');

        } else if (geometry === 'point') {
            history.perform(
                iD.actions.DeleteNode(entityId),
                'deleted a point');

        } else if (geometry === 'line') {
            history.perform(
                iD.actions.DeleteWay(entityId),
                'deleted a line');

        } else if (geometry === 'area') {
            history.perform(
                iD.actions.DeleteWay(entityId),
                'deleted an area');
        }
    };

    operation.available = function(graph) {
        var entity = graph.entity(entityId);
        return _.contains(['vertex', 'point', 'line', 'area'], entity.geometry(graph));
    };

    operation.enabled = function() {
        return true;
    };

    operation.id = "delete";
    operation.title = "Delete";
    operation.description = "Remove this from the map";

    return operation;
};
