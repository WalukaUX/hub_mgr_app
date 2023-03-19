import "./header.css";
function Header({
  setIsSearching,
  isSearching,
  add,
  setAdd,
  setHome,
  setActiveShelfView,
  activeShelfView,
}) {
  function serchAction() {
    setActiveShelfView(false);
    setHome(true);
    setIsSearching(false);
    setAdd(true);
  }
  function addAction() {
    setActiveShelfView(false);
    setHome(true);
    setIsSearching(true);
    setAdd(false);
  }
  function shelfView() {
    setActiveShelfView(!activeShelfView);
    setHome(true);
    setIsSearching(true);
    setAdd(true);
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
            className="btn btn-light searchBtn"
            disabled={activeShelfView}
          >
            Shelf View
          </button>
        </div>
      </div>
    </>
  );
}
export default Header;
