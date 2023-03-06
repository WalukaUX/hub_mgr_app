import "./header.css";
function Header({
  setIsSearching,
  isSearching,
  add,
  setAdd,
  setHome,
  shelfView,
}) {
  function serchAction() {
    setHome(true);
    setIsSearching(false);
    setAdd(true);
  }
  function addAction() {
    setHome(true);
    setIsSearching(true);
    setAdd(false);
  }
  return (
    <>
      <div id="header">
        <div>
          <h1>Lost in Cage? Need something? Try me...</h1>
        </div>
        <div>
          <button
            onClick={serchAction}
            type="button"
            className="btn btn-success searchBtn"
            disabled={!isSearching}
          >
            Serach Items
          </button>
          <button
            onClick={addAction}
            type="button"
            className="btn btn-info addBtn"
            disabled={!add}
          >
            Add Items
          </button>
        </div>
        <div>
          <button
            onClick={shelfView}
            type="button"
            className="btn btn-success searchBtn"
          >
            Shelf View
          </button>
        </div>
      </div>
    </>
  );
}
export default Header;
