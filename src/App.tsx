import {
  Checkbox,
  Container,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';
import { useMst } from './stores/root.store';
import { ITodoModel } from './stores/todos/todo.model';
import { observer } from 'mobx-react-lite';

const App = observer(() => {
  const { todosStore } = useMst();

  const onCheckboxClicked = (todo: ITodoModel) => {
    todo.toggle();
  };

  const addTodo = () => {
    todosStore.addTodo('test todo ' + Math.round(Math.random() * 10));
  };

  const removeTodo = (todo: ITodoModel) => {
    todosStore.removeTodo(todo);
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

      <Fab onClick={addTodo}>
        <Add />
      </Fab>
    </Container>
  );
});

export default App;
