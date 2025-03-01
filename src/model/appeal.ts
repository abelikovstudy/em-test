import { Table, Column, Model, CreatedAt, UpdatedAt, DataType    } from 'sequelize-typescript';
interface IAppeal{
    title: String,
    details: String,
    status: AppealStatus
}

enum AppealStatus{
    NEW = "New",
    PROCESSING = "Processing",
    CLOSED = "Closed",
    CANCELLED = "Cancelled"
}

@Table
class Appeal extends Model {
    @Column({
        defaultValue: AppealStatus.NEW,
        type: DataType.ENUM(...Object.values(AppealStatus)),
      })
      status!: AppealStatus;

    @Column
    title: string

    @Column
    details: string

    @Column
    cancelDetails?: string

    @Column
    solutionDetails?: string
}

export {
    Appeal, AppealStatus, IAppeal
}
