export const Tables = {
    modes: {
        fields: {
            id: {
                datatype: "INTEGER",
                notNull: true,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                datatype: "VARCHAR(100)",
                notNull: true,
                uniqueIdentifier: true
            },
            open: {
                datatype: "VARCHAR(200)",
                notNull: true
            },
            closed: {
                datatype: "VARCHAR(200)",
                notNull: true
            },
            active: {
                datatype: "BOOLEAN",
                notNull: false
            }
        }
    },
    config: {
        fields:{
            key: {
                datatype: "VARCHAR(30)",
                notNull: true,
                primaryKey: true
            },
            value: {
                datatype: "VARCHAR(50)"
            }
        }
    }
}

export const ConfigKeys = [
    "DEVICE_UUID",
    "FULLSTATE_SERVICE_UUID",
    "GETTER_SERVICE_UUID",
    "FULLSTATE_CHAR_UUID",
    "MODE_CHAR_UUID",
    "STATE_CHAR_UUID",
    "FINGER_COUNT",
    "MODE_COUNT"
]