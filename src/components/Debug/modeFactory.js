import faker from 'faker'

import Mode from './../HandControl/Mode'

function genState ( ) {
    return {
        angle: faker.datatype.number( 180 ),
        start: faker.datatype.number( 500 ),
        duration: faker.datatype.number( 100 )
    }
}

function generate ( ) {
    const obj = {
        id: faker.datatype.number( 9999999 ),
        name: faker.name.title(),
        states: {
            open: [ ],
            closed: [ ]
        },
        active: faker.datatype.boolean()
    }
    for ( i = 0; i < 5; i++ ) {
        obj.states.open[i] = genState();
        obj.states.closed[i] = genState();
    }
    return obj;
}

export default generate;