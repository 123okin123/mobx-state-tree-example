import {
  Box,
  Button,
  Checkbox,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';
import { observer } from 'mobx-react-lite';
import { ChangeEvent, useState } from 'react';
import { useMst } from './hooks/use-mst';
import { ITodoModel } from './stores/todos/todo.model';

const App = observer(() => {
  const { todosStore } = useMst();
  const [newTodoText, setNewTodoText] = useState('');

  const onCheckboxClicked = (todo: ITodoModel) => {
    todo.toggle();
  };

  const addTodo = () => {
    todosStore.addTodo(newTodoText);
    setNewTodoText('');
  };

  const removeTodo = (todo: ITodoModel) => {
    todosStore.removeTodo(todo);
  };

  const handleNewTodoTextChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setNewTodoText(event.target.value);
  };

  return (
    <Container>
      <List>
        {todosStore.todos.map((todo) => {
          const labelId = `checkbox-list-label-${todo.id}`;

          return (
            <ListItem
              key={todo.id}
              role={undefined}
              dense
              button
              onClick={() => onCheckboxClicked(todo)}
            >
              <ListItemIcon>
                <Checkbox
                  edge='start'
                  checked={todo.completed}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={todo.text} />

              <ListItemSecondaryAction onClick={() => removeTodo(todo)}>
                <IconButton edge='end' aria-label='comments'>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>

      <Box display='flex' alignItems='center'>
        <Box mr={3}>
          <TextField
            margin='dense'
            id='outlined-basic'
            label='New Todo'
            variant='outlined'
            value={newTodoText}
            onChange={handleNewTodoTextChange}
          />
        </Box>
        <Button
          disabled={!newTodoText}
          variant='contained'
          color='primary'
          onClick={addTodo}
          endIcon={<Add />}
        >
          Add
        </Button>
      </Box>
    </Container>
  );
});

export default App;
