const loadTodoList = () => {
    const todo: any = localStorage.getItem('data-todo');
    const data = JSON.parse(todo);
    return data;
}
const saveTodoList = (data: any) => {
    localStorage.setItem('data-todo', JSON.stringify(data));
}
export { loadTodoList, saveTodoList };