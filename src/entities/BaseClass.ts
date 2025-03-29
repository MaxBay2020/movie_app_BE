import {BaseEntity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn,} from "typeorm"
import {IsBoolean, IsDate, IsString} from "class-validator";

class BaseClass extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @IsString()
    id: string

    @CreateDateColumn()
    @IsDate()
    createdAt: Date

    @UpdateDateColumn()
    @IsDate()
    updatedAt: Date

    @Column({
        nullable: true,
        default: true
    })
    @IsBoolean()
    isActive: boolean

    @Column({
        nullable: true,
        default: false
    })
    @IsBoolean()
    isDelete: boolean

}

export default BaseClass
