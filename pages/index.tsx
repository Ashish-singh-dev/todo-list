import Head from "next/head";
import TodoList from "../components/TodoList";
import TodoProvider from "../context/TodoContext";
import { Layout, Typography } from "antd";

const { Header, Content } = Layout;
const { Title } = Typography;

export default function Home() {
  return (
    <div>
      <Head>
        <title>Mobx & Ant Design TodoList</title>
        <meta name="description" content="Todo List" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TodoProvider>
        <Layout>
          <Header>
            <div style={{ textAlign: "center" }}>
              <Title style={{ color: "#fff" }}>Todos</Title>
            </div>
          </Header>
          <Content style={{ backgroundColor: "#fff" }}>
            {/* @ts-ignore */}
            <TodoList />
          </Content>
        </Layout>
      </TodoProvider>
    </div>
  );
}
