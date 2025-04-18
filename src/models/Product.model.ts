import {Table, Column, Model, DataType, Default } from "sequelize-typescript"
// https://sequelize.org/docs/v7/models/data-types/

@Table({
    tableName: "products"
})

class Product extends Model {
    @Column({
        type: DataType.STRING(100)
    })
    declare name: string

    @Column({
        type: DataType.FLOAT
    })
    declare price: number

    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    declare availability: boolean
}

export default Product