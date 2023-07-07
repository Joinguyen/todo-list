
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import { Button, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { styled } from "@mui/material/styles";
import React, { FC, Fragment, useContext, useEffect, useState, useTransition } from 'react';
import { Task } from "../Model/Task";
import { STATUS } from '../constant/default';
import CardList from './CardList';
import { TodoContext } from "./TodoContext";


const StyledTab = styled(Tab)({
  "&.Mui-selected": {
    color: "#4A55A2"
  }
});

const StyledTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    backgroundColor: "#4A55A2"
  },
});

const StyledTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    borderRadius: '50px'
  },
  '& label.Mui-focused': {
    color: '#4A55A2',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#4A55A2',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#4A55A2',
    },
    '&:hover fieldset': {
      borderColor: '#4A55A2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#4A55A2',
      borderWidth: '1.5px',
    },
  },
});

export const TodoList: FC = () => {
  const { todoList, changeShowDialogForm, handleSetValueDefaultForm, updateStatusTask } = useContext(TodoContext);
  const [dataTodoList, setDataTodoList] = useState(todoList);
  const [_isPending, startTransition] = useTransition();
  const [valueTab, setValueTab] = useState<string>('ALL');
  const [keywordSearch, setKeywordSearch] = useState<string>('');

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    handleFilterData(keywordSearch, newValue);
    setValueTab(newValue);
  };

  const isCheckShowColumn = (id: string): boolean => {
    return (id === valueTab || valueTab === 'ALL');
  };

  const checkIncludeString = (string: string = '', substring: string = ''): boolean => {
    return (String(string).toLowerCase()).includes(String(substring).toLowerCase());
  }
  const handleFilterData = (keyword: string = keywordSearch, tabActive: string = valueTab, todo: Task[] = todoList) => {
    const state = structuredClone(todo);
    if (tabActive === 'ALL') {
      for (const [key, value] of Object.entries(state)) {
        const list = value?.list;
        const listFilter = list?.filter((item: Task) => checkIncludeString(item?.title, keyword));
        state[key].list = listFilter;
      }
    } else {
      const list = state[tabActive]?.list;
      const listFilter = list.filter((item: Task) => checkIncludeString(item?.title, keyword));
      state[tabActive].list = listFilter;
    }
    setDataTodoList(state);
    setKeywordSearch(keyword);
  };

  const handleOnSearch = (event: React.SyntheticEvent) => {
    startTransition(() => {
      handleFilterData(event?.target?.value);
    });
  };

  const handleUpdateStatusTask = (task: Task, status: string) => {
    updateStatusTask(task, status);
  }

  const handleClickOpenFormAddTask = () => {
    handleSetValueDefaultForm({});
    changeShowDialogForm(true);
  };

  useEffect(() => {
    handleFilterData(undefined, undefined, todoList);
  }, [todoList]);

  return (
    <Grid container spacing={2} style={{ marginTop: '20px' }}>
      <Grid item xs={7} sm={9} md={10} className="d-flex align-items-center justify-content-start">
        <StyledTextField
          fullWidth
          size="small"
          id="search"
          name="search"
          label="Search"
          defaultValue=""
          focused
          color="secondary"
          onChange={handleOnSearch}
        />
      </Grid>
      <Grid item xs={5} sm={3} md={2} className="d-flex align-items-center justify-content-end">
        <Button variant="outlined" onClick={handleClickOpenFormAddTask} sx={{
          borderColor: '#5A96E3', backgroundColor: '#5A96E3', color: '#FFF', ":hover": {
            borderColor: '#0A6EBD',
            color: '#FFF',
            backgroundColor: '#0A6EBD',
          }
        }} >
          <SplitscreenIcon style={{ marginRight: '10px' }} />  Add Task
        </Button>
      </Grid>
      <Grid item xs={12} sm={12} md={12} style={{ marginBottom: '20px' }}>
        <StyledTabs
          value={valueTab}
          onChange={handleChange}
          aria-label="wrapped label tabs example"
          variant="scrollable"
        >
          <StyledTab value="ALL" label="All" />
          {Object.entries(STATUS).map(([key, value]: [string, string]) => (
            <StyledTab label={value} key={key} value={key} />
          ))}
        </StyledTabs>
      </Grid>
      {Object.values(dataTodoList).map(col => (
        isCheckShowColumn(col.id) ?
          (<Grid item xs={12} sm={6} md={3} key={col.id} >
            <CardList col={col} handleUpdateStatusTask={handleUpdateStatusTask} />
          </Grid>) : < Fragment key={col.id} ></Fragment>
      ))}
    </Grid>
  );
};

