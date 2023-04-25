import { useState } from "react";
import Edit from "../Edit/Edit";
import "./search.css";
import SearchedCard from "./SerchedCard";

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
    document.getElementById("searchForm").reset();
    resetHomePage();
  }

  function clearSearch(e) {
    e.preventDefault();
    document.getElementById("searchForm").reset();
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
          <h3>Search Items</h3>
          <h5 style={{ padding: "20px" }}>
            Type any keyword or words related to the item name
          </h5>
          <form id="searchForm">
            <input
              type="text"
              autoFocus
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
                  .map((itmcard) => {
                    return (
                      <SearchedCard
                        itmcard={itmcard}
                        key={itmcard.id}
                        triggerConfirm={triggerConfirm}
                        editItem={editItem}
                      />
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
