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
              <label htmlFor="inputAddress">Name</label>
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
                <label htmlFor="inputState">Shelf Number</label>
                <select
                  name="shelf_num"
                  id="inputState"
                  className="form-control"
                  onChange={createObject}
                >
                  <option defaultValue>Choose...</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
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
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
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
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                </select>
              </div>
            </div>
            <hr />

            <button
              type="submit"
              className="btn btn-success"
              style={{ margin: "20px" }}
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
