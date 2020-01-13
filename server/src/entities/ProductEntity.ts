import {Check, Column, Entity, PrimaryGeneratedColumn, Unique} from "typeorm";
import {Colors, Sizes, Types} from "../../../src/common/enums_common";


@Entity()
@Unique(["id"])
@Check(`"color" GLOB "#[a-fA-F0-9][a-fA-F0-9][a-fA-F0-9][a-fA-F0-9][a-fA-F0-9][a-fA-F0-9]"`)
export class ProductEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;

    @Column({type: "text", enum: Types})
    type: string;

    @Column({type: "text", enum: Colors})
    color: string;

    @Column({type: "text", enum: Sizes})
    size: string;

    @Column({type: "int", enum: [0, 1]})
    inStock: number;

    @Column('text')
    dateReceipt: string;
}