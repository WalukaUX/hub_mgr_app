import { useState } from "react";

function BinCard({
  itemcard,
  sendDeleteCommand,
  updateData,
  setUpdateData,
  updateItem,
}) {
  const [deleteWindow, setDeleteWindow] = useState(false);
  const [editWndw, setEditeWndw] = useState(false);

  function confirmDeleteAction(card) {
    setEditeWndw(true);
    sendDeleteCommand(card);
  }

  function triggerEditItem(card) {
    setEditeWndw(true);
    setUpdateData(card);
  }

  function changeItemValue(e) {
    let newObj = { ...updateData, [e.target.name]: e.target.value };
    setUpdateData(newObj);
  }

  function saveEditedItem() {
    updateItem(itemcard.id);
    setEditeWndw(false);
  }
  return (
    <div className="alert alert-info searchResults" role="alert">
      <div className="alert alert-info searchShelfResults" role="alert">
        <div>
          <p>
            Name:{" "}
            {!editWndw ? (
              <b>{itemcard.name}</b>
            ) : (
              <input
                name="name"
                defaultValue={itemcard.name}
                onChange={changeItemValue}
              />
            )}
          </p>
          <p>
            Keyword:{" "}
            {!editWndw ? (
              itemcard.keyword
            ) : (
              <input
                name="keyword"
                defaultValue={itemcard.keyword}
                onChange={changeItemValue}
              />
            )}
          </p>
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
              {!editWndw ? (
                <b> {itemcard.shelf_num}</b>
              ) : (
                <input
                  name="shelf_num"
                  defaultValue={itemcard.shelf_num}
                  onChange={changeItemValue}
                />
              )}
            </span>
          </p>
          <p>
            :
            <span className="binNums">
              {!editWndw ? (
                <b> {itemcard.level_num}</b>
              ) : (
                <input
                  name="level_num"
                  defaultValue={itemcard.level_num}
                  onChange={changeItemValue}
                />
              )}
            </span>
          </p>
          <p>
            :
            <span className="binNums">
              {!editWndw ? (
                <b> {itemcard.bin_num}</b>
              ) : (
                <input
                  name="bin_num"
                  defaultValue={itemcard.bin_num}
                  onChange={changeItemValue}
                />
              )}
            </span>
          </p>
        </div>
      </div>
      {!deleteWindow ? (
        <div className="buttonDiv">
          {!editWndw ? (
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => triggerEditItem(itemcard)}
            >
              Edit
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => setEditeWndw(false)}
            >
              Cancel
            </button>
          )}
          {!editWndw ? (
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => setDeleteWindow(true)}
            >
              Delete
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-success"
              onClick={saveEditedItem}
            >
              Save
            </button>
          )}
        </div>
      ) : (
        <div className="buttonDiv alert alert-danger">
          <h6 className="alert alert-warning">
            Click confirm button to delete this item
          </h6>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => setDeleteWindow(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => confirmDeleteAction(itemcard)}
          >
            Confirm and Delete
          </button>
        </div>
      )}
    </div>
  );
}
export default BinCard;
