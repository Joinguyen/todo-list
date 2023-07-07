import React, { useEffect, useState } from 'react';
import { Task } from "../Model/Task";
import { INITIAL_TASKS } from '../constant/default';
import { loadTodoList, saveTodoList } from "../localstorage";

interface TodoContextState {
    todoList: Task[];
    setTodoList: (todoList: Task[]) => void;
    addTask: (task: Task) => void;
    updateTask: (task: Task, taskOld: Task) => void;
    deleteTask: (task: Task) => void;
    updateStatusTask: (task: Task, statusNew: string) => void;
    isShowDialogForm: boolean,
    valueDefaultForm: Partial<Task>,
    changeShowDialogForm: (isShow: boolean) => void;
    handleSetValueDefaultForm: (task: Partial<Task>) => void;
}

export const TodoContext = React.createContext({} as TodoContextState);


export const TodoContextProvider = (props: any) => {
    const todo = loadTodoList();
    const [todoList, setTodoList] = useState<any>(todo || INITIAL_TASKS);
    const [isShowDialogForm, setIsShowDialogForm] = useState<boolean>(false);
    const [valueDefaultForm, setValueDefaultForm] = useState<Partial<Task>>({});

    const addTask = (task: Task) => {
        const state = structuredClone(todoList);
        state[task?.status]?.list?.push(task);
        setTodoList(state);
    };

    const updateTask = (task: Task, taskOld: Task) => {
        const state = structuredClone(todoList);
        if (task?.status === taskOld?.status) {
            const list = state[task?.status].list;
            state[task?.status].list = list?.map((item: Task) => (item?.id === task?.id) ? task : item);
            setTodoList(state);
        } else {
            const listOld = state[taskOld?.status].list;
            const listNew = state[task?.status].list;
            const listRemove = listOld?.filter((item: Task) => (item?.id != taskOld?.id));
            listNew?.push(task);
            state[taskOld?.status].list = listRemove;
            setTodoList(state);
        }
    };

    const deleteTask = (task: Task) => {
        if (task?.id) {
            const state = structuredClone(todoList);
            const list = state[task?.status].list;
            const listNew = list?.filter((item: Task) => (item?.id != task?.id));
            state[task?.status].list = listNew;
            setTodoList(state);
        }
    };

    const updateStatusTask = (task: Task, statusNew: string) => {
        if ((task?.id && statusNew) && (task?.status !== statusNew)) {
            const state = structuredClone(todoList);
            const listOld = state[task?.status].list;
            const listNew = state[statusNew].list;
            const listRemove = listOld?.filter((item: Task) => (item?.id != task?.id));
            listNew?.push({ ...task, status: statusNew });
            state[task?.status].list = listRemove;
            setTodoList(state);
        }
    };

    const changeShowDialogForm = (isShow: boolean) => {
        setIsShowDialogForm(isShow);
    };

    const handleSetValueDefaultForm = (task: Partial<Task> = {}) => {
        setValueDefaultForm(task);
    };

    useEffect(() => {
        saveTodoList(todoList);
    }, [todoList]);

    return (
        <TodoContext.Provider value={{ todoList, setTodoList, addTask, updateTask, deleteTask, updateStatusTask, isShowDialogForm, valueDefaultForm, changeShowDialogForm, handleSetValueDefaultForm }}>
            {props.children}
        </TodoContext.Provider>
    );
};