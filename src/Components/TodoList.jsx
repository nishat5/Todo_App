import React, { useState, useEffect } from "react";
import "../Components/TodoList.css";

const TodoList = () => {
  const [value, setValue] = useState("");
  const [listArray, setListArray] = useState([]);

  // Load todos from localStorage on component mount
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("myData"));
    if (storedTodos.length > 0) {
      setListArray(storedTodos);
    }
  }, []);

  // Update localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("myData", JSON.stringify(listArray));
  }, [listArray]);

  const onChangeHandler = (e) => {
    setValue(e.target.value);
  };

  const addListItems = () => {
    if (value) {
      const newTodo = { id: Math.random(), text: value };
      setListArray((prevValue) => [...prevValue, newTodo]);
      setValue("");
    } else {
      alert("Enter Value");
    }
  };

  const removeBtnHandler = (id) => {
    setListArray(
      listArray.filter((listItem) => {
        return listItem.id !== id;
      })
    );
  };

  return (
    <div className="todoListWrapper">
      <img
        src="https://cdn-icons-png.flaticon.com/512/906/906334.png"
        style={{ width: "90px", margin: "5px auto" }}
      />
      <h1>Todo App (React JS)</h1>
      <div>
        <div className="inputDiv">
          <input
            type="text"
            placeholder="Enter your activity"
            value={value}
            onChange={onChangeHandler}
          />
          <button id="addButton" onClick={addListItems}>
            Add
          </button>
        </div>
        <div className="listDiv">
          <ul>
            {listArray.length > 0 ? (
              listArray.map((list) => {
                return (
                  // <>
                  <div className="innerListDiv" key={list.id}>
                    <li className="list">{list.text}</li>
                    <button
                      className="delBtn"
                      onClick={() => {
                        removeBtnHandler(list.id);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                  // </>
                );
              })
            ) : (
              <li className="unavailableList">
                No todo list available. Please add some.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
