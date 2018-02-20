export default class QueryAdapter {
    /**
     * It allows to find the dimension members in space for some defining values
     * and replace these values on found members
     * @param {object} fixSpaceOptions
     * @param {Space} space
     * */
    applyAdapter(fixSpaceOptions, space){
        Object.keys(fixSpaceOptions).forEach( dimension => {
            const value = fixSpaceOptions[dimension];

            const find = (dimension, value) => {
                const dimensionTable = space.getDimensionTable(dimension);
                return dimensionTable ? dimensionTable.search(value) : void 0;
            };

            if (typeof value === "string"){
                fixSpaceOptions[dimension] = find(dimension, value) || [];
            } else {
                if (Array.isArray(value) && value.length && typeof value[0] === "string"){
                    fixSpaceOptions[dimension] = [];
                    value.reduce( (accumulated, value) => {
                        const found = find(dimension, value);
                        if (found){
                            [].splice.apply(accumulated, [accumulated.length, 0].concat(found))
                        }
                        return accumulated;
                    }, fixSpaceOptions[dimension])
                }
            }
        });
        return fixSpaceOptions;
    }
}