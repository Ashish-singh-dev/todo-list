import { Button, Input, List, Space, Typography } from "antd";
import { observer, useObserver } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useTodoStore } from "../context/TodoContext";
import { DeleteOutlined } from "@ant-design/icons";
import Checkbox from "./Checkbox";

const { Title, Text } = Typography;

const TodoList = () => {
  const [value, setValue] = useState("");
  const todoStore = useTodoStore();

  function createTodo() {
    if (value === "") return;
    todoStore.addTodo(value);
    setValue("");
  }

  useEffect(() => {
    todoStore.getTodos();
  }, []);

  return (
    <List
      size="large"
      header={
        <div style={{ textAlign: "center" }}>
          <Space>
            <Input
              type="text"
              value={value}
              placeholder="type todo..."
              onChange={(e) => setValue(e.target.value)}
              onPressEnter={createTodo}
            />
            <Button type="primary" onClick={createTodo}>
              Add Todo
            </Button>
          </Space>
        </div>
      }
      loading={todoStore.isLoading}
      bordered
      dataSource={todoStore.todos}
      renderItem={(item, index) => (
        <List.Item
          key={item.id}
          actions={[
            <Button
              key={index.toString()}
              size="middle"
              shape="round"
              icon={<DeleteOutlined />}
              danger
              onClick={() => {
                todoStore.removeTodo(item.id);
              }}
            >
              Delete
            </Button>,
          ]}
        >
          <Space>
            <Checkbox
              id={item.id}
              completed={item.completed}
              toggleComplete={todoStore.toggleComplete}
            />
            <Title level={5}>
              <Text delete={item.completed}>{item.title}</Text>
            </Title>
          </Space>
        </List.Item>
      )}
    />
  );
};

export default observer(TodoList);
