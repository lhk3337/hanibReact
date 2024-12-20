import Editor from "./components/Editor";
import Header from "./components/Header";
import List from "./components/List";
import "./App.css";
import { useState, useRef } from "react";

const dummyData = [
  { id: 0, isDone: true, content: "Todo1", date: new Date().getTime() },
  { id: 1, isDone: false, content: "Todo2", date: new Date().getTime() },
  { id: 2, isDone: false, content: "Todo3", date: new Date().getTime() },
];

function App() {
  const [todos, setTodos] = useState(dummyData);
  const idRef = useRef(3);

  const onCreate = (content) => {
    const newTodo = {
      id: idRef.current++,
      isDone: false,
      content: content,
      date: new Date().getTime(),
    };
    setTodos([newTodo, ...todos]);
  };

  const onUpdate = (targetId, upContent) => {
    if (!isNaN(targetId)) {
      setTodos(todos.map((todo) => (todo.id === targetId ? { ...todo, isDone: !todo.isDone } : todo)));
    } else {
      setTodos(todos.map((todo) => (todo.id === targetId ? { ...todo, content: upContent } : todo)));
    }
  };

  const onDelete = (targetId) => {
    setTodos(todos.filter((todo) => todo.id !== targetId));
  };

  return (
    <div className="App">
      <Header />
      <Editor onCreate={onCreate} />
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;
