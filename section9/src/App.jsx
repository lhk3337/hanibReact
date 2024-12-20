import Editor from "./components/Editor";
import Header from "./components/Header";
import List from "./components/List";
import "./App.css";
import { useState, useRef } from "react";
import { useReducer } from "react";

const dummyData = [
  { id: 0, isDone: true, content: "Todo1", date: new Date().getTime() },
  { id: 1, isDone: false, content: "Todo2", date: new Date().getTime() },
  { id: 2, isDone: false, content: "Todo3", date: new Date().getTime() },
];

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      console.log([action.data, ...state]);
      return [action.data, ...state];
    case "UPDATE":
      return !isNaN(action.targetId)
        ? state.map((todo) => (todo.id === action.targetId ? { ...todo, isDone: !todo.isDone } : todo))
        : state.map((todo) => (todo.id === action.targetId ? { ...todo, content: action.upContent } : todo));
    case "DELETE":
      return state.filter((todo) => todo.id !== action.targetId);
    default:
      return state;
  }
}

function App() {
  const [todos, dispatch] = useReducer(reducer, dummyData);

  // const [todos, setTodos] = useState(dummyData);

  const idRef = useRef(3);

  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      data: { id: idRef.current++, isDone: false, content: content, date: new Date().getTime() },
    });

    // const newTodo = {
    //   id: idRef.current++,
    //   isDone: false,
    //   content: content,
    //   date: new Date().getTime(),
    // };
    // setTodos([newTodo, ...todos]);
  };

  const onUpdate = (targetId, upContent) => {
    console.log(targetId);
    dispatch({
      type: "UPDATE",
      targetId: targetId,
      upContent: upContent,
    });

    // if (!isNaN(targetId)) {
    //   setTodos(todos.map((todo) => (todo.id === targetId ? { ...todo, isDone: !todo.isDone } : todo)));
    // } else {
    //   setTodos(todos.map((todo) => (todo.id === targetId ? { ...todo, content: upContent } : todo)));
    // }
  };

  const onDelete = (targetId) => {
    dispatch({
      type: "DELETE",
      targetId: targetId,
    });
    // setTodos(todos.filter((todo) => todo.id !== targetId));
  };
  // console.log(todos);
  return (
    <div className="App">
      <Header />
      <Editor onCreate={onCreate} />
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;
