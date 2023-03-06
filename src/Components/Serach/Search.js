import { useState } from "react";
import Edit from "../Edit/Edit";
import "./search.css";

function Search({
  resetHomePage,
  items,
  sendDeleteCommand,
  setUpdateWindow,
  updateWindow,
  updateData,
  setUpdateData,
  updateItem,
  message,
  setMessage,
}) {
  const [searchTearm, setSearchTerm] = useState("");
  const [confirmWindow, setConfirmWindow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  function abortPage(e) {
    e.preventDefault();
    document.getElementById("serachForm").reset();
    resetHomePage();
  }

  function clearSearch(e) {
    e.preventDefault();
    document.getElementById("serachForm").reset();
  }
  //Find items----------------------------------

  function searchItems(e) {
    e.preventDefault();
    let inputToLowercase = e.target.value.toLowerCase();
    setSearchTerm(inputToLowercase);
  }

  //Trigger Confirm to delete Item--------------------------------
  function triggerConfirm(e) {
    setConfirmWindow(!confirmWindow);
    setSelectedItem(e);
  }
  function confirmDelete(e) {
    e.preventDefault();
    setConfirmWindow(!confirmWindow);
    sendDeleteCommand(selectedItem);
  }

  function cancleDelete(e) {
    e.preventDefault();
    setConfirmWindow(!confirmWindow);
  }
  function editItem(e) {
    setSelectedItem(e);
    setUpdateWindow(!updateWindow);
  }

  return (
    <>
      {updateWindow ? (
        <Edit
          // setItemtoEdit={setItemtoEdit}
          // itemtoEdit={itemtoEdit}
          updateData={updateData}
          setUpdateData={setUpdateData}
          selectedItem={selectedItem}
          updateItem={updateItem}
          message={message}
          setMessage={setMessage}
          updateWindow={updateWindow}
          setUpdateWindow={setUpdateWindow}
        />
      ) : (
        ""
      )}
      {confirmWindow ? (
        <div className="popup-box">
          <div className="popup-inner">
            <div className="confirmationDiv">
              <p>Please click confirm to delete the item</p>
              <button
                type="button"
                className="btn btn-warning"
                onClick={cancleDelete}
              >
                Cancle
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={confirmDelete}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div id="search">
          <h3>Serach Items</h3>
          <h5 style={{ padding: "20px" }}>
            Type any keyword or words related to the item name
          </h5>
          <form id="serachForm">
            <input
              type="text"
              className="form-control searchInput"
              onChange={searchItems}
              id="inputAddress"
              placeholder="7inch patch cable"
            />
            <button
              type="submit"
              onClick={clearSearch}
              className="btn btn-primary"
              style={{ margin: "20px" }}
            >
              Clear
            </button>
          </form>
          <div>
            <button
              className="btn btn-danger"
              style={{ marginBottom: "40px" }}
              onClick={abortPage}
            >
              Cancel
            </button>
          </div>

          <div>
            {searchTearm.length > 0
              ? items
                  .filter((card) =>
                    card.name.toLowerCase().includes(searchTearm)
                  )
                  .map((e) => {
                    return (
                      <div
                        className="alert alert-info searchResults"
                        role="alert"
                        key={e.id}
                      >
                        <div
                          className="alert alert-info searchShelfResults"
                          role="alert"
                        >
                          <div>
                            <p>
                              Name: <b>{e.name}</b>
                            </p>
                            <p>Keyword: {e.keyword}</p>
                          </div>
                          <div>
                            <p>Shelf Number</p>
                            <p>Level Number</p>
                            <p>Bin Number</p>
                          </div>
                          <div>
                            <p>
                              :
                              <span className="binNums">
                                <b> {e.shelf_num}</b>
                              </span>
                            </p>
                            <p>
                              :
                              <span className="binNums">
                                <b> {e.level_num}</b>
                              </span>
                            </p>
                            <p>
                              :
                              <span className="binNums">
                                <b> {e.bin_num}</b>
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="buttonDiv">
                          <button
                            type="button"
                            className="btn btn-warning"
                            onClick={() => editItem(e)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => triggerConfirm(e)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })
              : ""}
          </div>
        </div>
      )}
    </>
  );
}

export default Search;
