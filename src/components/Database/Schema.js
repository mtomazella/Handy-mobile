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
    }
}