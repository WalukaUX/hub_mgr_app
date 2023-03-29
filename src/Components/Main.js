import React, { useState, useEffect } from "react";
import BASE_URL from "../constrains/URL";
import Search from "./Search/Search";
import Header from "./Head/Header";
import Add from "./Add/Add";
import "./main.css";
import Background from "./Background/Background";
import ShelfView from "./ShlefView/ShelfView";
//import Edit from "./Edit/Edit";

function Main() {
  const [home, setHome] = useState(false);
  const [isSearching, setIsSearching] = useState(true);
  const [add, setAdd] = useState(true);
  const [items, setItems] = useState(null);
  const [message, setMessage] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const [updateWindow, setUpdateWindow] = useState(false);
  const [activeShelfView, setActiveShelfView] = useState(true);
  // const [updateData, setUpdateData] = useState(null);

  function resetHomePage() {
    setHome(false);
    setIsSearching(true);
    setAdd(true);
  }

  //Get items-------------------------------
  useEffect(() => {
    fetch(BASE_URL + `/items`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((r) => r.json())
      .then((r) => {
        let filterValidItems = r.filter(
          (card) => card.name !== null && card.shelf_num !== null
        );
        setItems(filterValidItems);
      });
  }, []);

  //Add a new Item-------------------------
  function addNewItem(item) {
    fetch(BASE_URL + `/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then((res) => {
      if (res.ok) {
        res.json().then((itm) => {
          items.unshift(itm);
          let msg = {
            ...itm,
            message: "Successfully added",
            error: false,
          };
          setMessage(msg);
          setTimeout(() => {
            setMessage(false);
          }, 5000);
        });
      } else {
        res.json().then((err) => {
          alert({ message: `${err}`, error: true });
        });
      }
    });
  }
  //Delete Item--------------------------------

  function sendDeleteCommand(e) {
    fetch(BASE_URL + `/items/${e.id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        res.json().then(() => {
          const removeDeletedItem = items.filter((x) => x.id !== e.id);
          setItems(removeDeletedItem);
        });
      } else {
        res.json().then((err) => {
          alert({ message: `${err}`, error: true });
        });
      }
    });
  }

  //Update Item-------------------------------------

  function updateItem(id) {
    fetch(BASE_URL + `/items/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((itm) => {
          setuniqueArray(itm);
        });
      } else {
        res.json().then((err) => {
          alert({ message: `${err}`, error: true });
        });
      }
    });
  }

  function setuniqueArray(itm) {
    let msg = {
      ...itm,
      message: "Successfully added",
      error: false,
    };
    setMessage(msg);
    //--------------
    setUpdateData(null);
    const newUpdatedItems = items.filter((x) => x.id !== itm.id);
    setItems([...newUpdatedItems, itm]);

    setTimeout(() => {
      setMessage(false);
      setUpdateWindow(!updateWindow);
    }, 5000);
  }

  return (
    <>
      <div>
        <Header
          setIsSearching={setIsSearching}
          isSearching={isSearching}
          add={add}
          setAdd={setAdd}
          setHome={setHome}
          setActiveShelfView={setActiveShelfView}
          activeShelfView={activeShelfView}
        />
        <div id="mainPage">
          {home ? (
            activeShelfView ? (
              <ShelfView
                items={items}
                sendDeleteCommand={sendDeleteCommand}
                updateData={updateData}
                setUpdateData={setUpdateData}
                updateItem={updateItem}
              />
            ) : !isSearching ? (
              <div>
                <Search
                  resetHomePage={resetHomePage}
                  items={items}
                  sendDeleteCommand={sendDeleteCommand}
                  updateData={updateData}
                  setUpdateData={setUpdateData}
                  updateWindow={updateWindow}
                  setUpdateWindow={setUpdateWindow}
                  updateItem={updateItem}
                  message={message}
                  setMessage={setMessage}
                />
              </div>
            ) : (
              <div className="mainSection2">
                <Add
                  resetHomePage={resetHomePage}
                  setItems={setItems}
                  addNewItem={addNewItem}
                  message={message}
                  setMessage={setMessage}
                />
              </div>
            )
          ) : (
            <Background />
          )}
        </div>
      </div>
      {/* ); */}
    </>
  );
}
export default Main;
