const STATUS = {
    todo: 'Todo',
    progress: 'In Progress',
    completed: 'Completed',
    overdue: 'Overdue',
};

const PRIORITY = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
};

const TAGS = {
    0: 'UX',
    1: 'DEV',
    2: 'PM',
    3: 'BA',
    4: 'QA',
};

const STATUS_PERCENT = {
    todo: 10,
    progress: 40,
    completed: 100,
    overdue: 100,
};

const renderInitialTasks = (): any => {
    let obj: any = {};
    for (const [key, value] of Object.entries(STATUS)) {
        obj[key] = {
            id: key,
            title: value,
            list: [],
        };
    };
    return obj;
};

const INITIAL_TASKS = renderInitialTasks();

export { STATUS, TAGS, PRIORITY, INITIAL_TASKS, STATUS_PERCENT };