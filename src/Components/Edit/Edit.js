import "./edit.css";
import CreateOrUpdateMsg from "../Messages/CreateOrUpdateMsg";
import SuccessOrFailMsg from "../Messages/SuccessOrFailMsg";

function Edit({
  updateData,
  setUpdateData,
  updateItem,
  message,
  setMessage,
  setUpdateWindow,
  updateWindow,
  selectedItem,
}) {
  function handleChangeData(e) {
    e.preventDefault();
    let newData = { ...updateData, [e.target.name]: e.target.value };
    setUpdateData(newData);
  }

  function triggerUpdate(e) {
    e.preventDefault();
    updateItem(selectedItem.id);
  }

  function onCancleClick(e) {
    e.preventDefault();
    setUpdateData(null);
    setUpdateWindow(!updateWindow);
  }

  function setMessagefalse(e) {
    e.preventDefault();
    setMessage(false);
  }

  function genarateOptions(numOfOpt) {
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

  return (
    <div className="popup-box" key={selectedItem.id}>
      <div className="popup-inner">
        <div style={{ backgroundColor: "#F2EFDC", padding: "20px" }}>
          <div>
            {message ? <CreateOrUpdateMsg message={message} /> : ""}
            {message ? (
              <SuccessOrFailMsg
                message={message}
                setMessagetofalse={setMessagefalse}
              />
            ) : (
              ""
            )}
          </div>
          <div
            className="formDiv div1form"
            style={{ backgroundColor: "#F2EFDC", padding: "20px" }}
          >
            <h5>Update Item Details</h5>
            <form onSubmit={triggerUpdate}>
              <div className="form-group">
                <label htmlFor="inputAddress">Name</label>
                <input
                  onChange={handleChangeData}
                  type="text"
                  name="name"
                  className="form-control"
                  id="inputAddress"
                  placeholder="Gray Patch cable"
                  defaultValue={selectedItem.name}
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputAddress">Keywords/Other Information</label>
                <input
                  type="text"
                  name="keyword"
                  className="form-control"
                  id="inputAddress"
                  onChange={handleChangeData}
                  placeholder="7inch, gray, netwok"
                  defaultValue={selectedItem.keyword}
                />
              </div>

              <div className="form-row addShelvesDiv">
                <div className="form-group col-md-4" style={{ width: "50%" }}>
                  <label htmlFor="inputState">Shelf Number</label>
                  <select
                    name="shelf_num"
                    id="inputState"
                    className="form-control"
                    onChange={handleChangeData}
                  >
                    <option defaultValue>{selectedItem.shelf_num}</option>
                    {genarateOptions(19)}
                  </select>
                </div>
                <div className="form-group col-md-4" style={{ width: "50%" }}>
                  <label htmlFor="inputState">Level Number</label>
                  <select
                    name="level_num"
                    id="inputState"
                    className="form-control"
                    onChange={handleChangeData}
                  >
                    <option defaultValue>{selectedItem.level_num}</option>
                    {genarateOptions(13)}
                  </select>
                </div>
                <div className="form-group col-md-4" style={{ width: "50%" }}>
                  <label htmlFor="inputState">Bin Number</label>
                  <select
                    name="bin_num"
                    id="inputState"
                    className="form-control"
                    onChange={handleChangeData}
                  >
                    <option defaultValue>{selectedItem.bin_num}</option>
                    {genarateOptions(26)}
                  </select>
                </div>
              </div>
              <br />
              <hr />

              <br />
              <div className="editBtnBox">
                <div>
                  <button className="btn btn-success" type="submit">
                    Save
                  </button>
                </div>
                <div>
                  <button className="btn btn-warning" onClick={onCancleClick}>
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
