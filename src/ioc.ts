import { FakeAuthRepositoryImpl } from '@/infrastructure/repositories/FakeAuthRepositoryImpl'
import { FakeTaskRepositoryImpl } from '@/infrastructure/repositories/FakeTaskRepositoryImpl'


import { LoginUseCase } from '@/domain/usecases/LoginUseCase'
import { LogoutUseCase } from '@/domain/usecases/LogoutUseCase'
import { GetTasksUseCase } from '@/domain/usecases/GetTasksUseCase'
import { CreateTaskUseCase } from '@/domain/usecases/CreateTaskUseCase'
import { UpdateTaskUseCase } from '@/domain/usecases/UpdateTaskUseCase'
import { DeleteTaskUseCase } from '@/domain/usecases/DeleteTaskUseCase'
import { AssignTaskUseCase } from '@/domain/usecases/AssignTaskUseCase'

const authRepo = new FakeAuthRepositoryImpl()
const taskRepo = new FakeTaskRepositoryImpl()

export const usecases = {
    login: new LoginUseCase(authRepo),
    logout: new LogoutUseCase(authRepo),
    getTasks: new GetTasksUseCase(taskRepo),
    createTask: new CreateTaskUseCase(taskRepo),
    updateTask: new UpdateTaskUseCase(taskRepo),
    deleteTask: new DeleteTaskUseCase(taskRepo),
    assignTask: new AssignTaskUseCase(taskRepo),
}