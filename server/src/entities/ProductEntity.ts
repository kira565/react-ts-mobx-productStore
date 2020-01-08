import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class ProductEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    color: string;

    @Column()
    size: string;

    @Column()
    inStock: number;

    @Column()
    dateReceipt: string;

}