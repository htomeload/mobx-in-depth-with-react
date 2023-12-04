import { observer } from "mobx-react-lite";
import TodoList from "./components/TodoList";
import UserList from "./components/UserList";
import { useStore } from "./model/helper/user-store";
import { Views } from "./model/ui/global.view";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const {
    uiStore: { globalViewStore },
  } = useStore();

  const getCurrentView = () => {
    if (globalViewStore.currentView === Views.Todos) {
      return <TodoList />;
    }

    if (globalViewStore.currentView === Views.Users) {
      return <UserList />;
    }

    return null;
  };

  const handleUpdateCurrentView = (view: Views) => {
    globalViewStore.updateView(view);
  };

  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-dark">
        <div style={{ flexDirection: "row" }} className="navbar-nav">
          <span
            className={`nav-item${
              globalViewStore.currentView === Views.Todos ? " active" : ""
            }`}
          >
            <a
              className="nav-link"
              href="#"
              onClick={() => handleUpdateCurrentView(Views.Todos)}
            >
              {`${Views.Todos}`} View
            </a>
          </span>
          <span
            style={{ marginLeft: "15px" }}
            className={`nav-item${
              globalViewStore.currentView === Views.Users ? " active" : ""
            }`}
          >
            <a
              className="nav-link"
              href="#"
              onClick={() => handleUpdateCurrentView(Views.Users)}
            >
              {`${Views.Users}`} View
            </a>
          </span>
        </div>
      </nav>

      {getCurrentView()}
    </div>
  );
}

export default observer(App);
