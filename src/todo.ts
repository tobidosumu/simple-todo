export interface TodoTypeSet {
    id: string;
    task: string;
    isCompleted: boolean
}

export type FilterTodoTypes = 'all' | 'active' | 'completed';