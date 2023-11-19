const constants = Object.freeze({
    ERROR: {
        TYPE: 'ERROR',
        CODE: 500,
    },
    SUCCESS: {
        TYPE: 'SUCCESS',
        CODE: 200,
    },
    WARNING: {
        TYPE: 'WARNING',
        CODE: 400,
    },
    INFO: {
        CREATED: {
            TYPE: 'CREATED',
            CODE: 201,
            MESSAGE: 'Created'
        }, 
        UPDATED: {
            TYPE: 'UPDATED',
            CODE: 200,
            MESSAGE: 'Updated'
        },
        DELETED: {
            TYPE: 'DELETED',
            CODE: 200,
            MESSAGE: 'Deleted'
        },
        RETRIEVED: {
            TYPE: 'RETRIEVED',
            CODE: 200,
            MESSAGE: 'Retrieved'
        }
    }
});

export default constants;