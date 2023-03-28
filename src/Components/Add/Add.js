import { useState } from "react";
import "./add.css";
import CreateOrUpdateMsg from "../Messages/CreateOrUpdateMsg";
import SuccessOrFailMsg from "../Messages/SuccessOrFailMsg";
function Add({ resetHomePage, addNewItem, message, setMessage }) {
  const [newItem, setNewItem] = useState({});

  function AddItem(e) {
    e.preventDefault();
    // eslint-disable-next-line
    addNewItem({ ...newItem, ["availability"]: true });
    document.getElementById("addForm").reset();
  }
  function resetForm(e) {
    e.preventDefault();
    document.getElementById("addForm").reset();
  }
  function cancleNgoBack(e) {
    e.preventDefault();
    resetHomePage();
  }

  function createObject(e) {
    e.preventDefault();
    let newObj = {
      ...newItem,
      [e.target.name]: e.target.value,
    };
    setNewItem(newObj);
  }
  function setMessagetofalse(e) {
    e.preventDefault();
    setMessage(false);
  }

  function createOptions(numOfOpt) {
    var options = [];
    for (var i = 1; i < numOfOpt; i++) {
      options.push(i);
    }
    return options.map((e) => (
      <option value={e} key={e}>
        {e}
      </option>
    ));
  }

  function activateAddItemBtn() {
    if (
      newItem.name &&
      newItem.shelf_num !== "Choose..." &&
      newItem.shelf_num !== undefined
    ) {
      return false;
    } else {
      return true;
    }
  }
  return (
    <>
      <div>
        {message ? <CreateOrUpdateMsg message={message} /> : ""}
        {message ? (
          <SuccessOrFailMsg
            message={message}
            setMessagetofalse={setMessagetofalse}
          />
        ) : (
          ""
        )}
        <div>
          <div>
            <h4 styles={{ display: "flex" }}>Add an item to a new location</h4>
          </div>
          <form onSubmit={AddItem} className="addForm" id="addForm">
            <div className="form-group">
              <label htmlFor="inputAddress">
                <span style={{ color: "red" }}>
                  <b>*</b>
                </span>
                Name
              </label>
              <input
                onChange={createObject}
                type="text"
                name="name"
                className="form-control"
                id="inputAddress"
                placeholder="Gray Patch cable"
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputAddress">Keywords/Other Information</label>
              <input
                type="text"
                name="keyword"
                className="form-control"
                id="inputAddress"
                onChange={createObject}
                placeholder="7inch, gray, netwok"
              />
            </div>

            <div className="form-row addShelvesDiv">
              <div className="form-group col-md-4" style={{ width: "50%" }}>
                <label htmlFor="inputState">
                  <span style={{ color: "red" }}>
                    <b>*</b>
                  </span>
                  Shelf Number
                </label>
                <select
                  name="shelf_num"
                  id="inputState"
                  className="form-control"
                  onChange={createObject}
                >
                  <option defaultValue>Choose...</option>
                  {createOptions(19)}
                </select>
              </div>
              <div className="form-group col-md-4" style={{ width: "50%" }}>
                <label htmlFor="inputState">Level Number</label>
                <select
                  name="level_num"
                  id="inputState"
                  className="form-control"
                  onChange={createObject}
                >
                  <option defaultValue>Choose...</option>
                  {createOptions(13)}
                </select>
              </div>
              <div className="form-group col-md-4" style={{ width: "50%" }}>
                <label htmlFor="inputState">Bin Number</label>
                <select
                  name="bin_num"
                  id="inputState"
                  className="form-control"
                  onChange={createObject}
                >
                  <option defaultValue>Choose...</option>
                  {createOptions(26)}
                </select>
              </div>
            </div>
            <hr />

            <button
              type="submit"
              className="btn btn-success"
              style={{ margin: "20px" }}
              disabled={activateAddItemBtn()}
            >
              Add Item
            </button>
          </form>
          <div>
            <button
              className="btn btn-warning"
              style={{ margin: "20px" }}
              onClick={(e) => resetForm(e)}
            >
              Clear
            </button>
            <button
              className="btn btn-danger"
              style={{ margin: "20px" }}
              onClick={(e) => cancleNgoBack(e)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Add;
