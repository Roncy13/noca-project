import  "reflect-metadata";
import { PrimaryGeneratedColumn, Column} from "typeorm";

export class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
      type: 'datetime',
      nullable: false,
      default: () => 'CURRENT_TIMESTAMP'
    })
    dateCreated: string;

    @Column({
      type: 'datetime',
      nullable: false,
      default: () => 'CURRENT_TIMESTAMP'
    })
    dateUpdated: string;

    @Column({
      nullable: true,
      default: true
    })
    isActive: boolean;

}