import "./search.css";
function SearchedCard({ itmcard, triggerConfirm, editItem }) {
  return (
    <>
      <div
        className="alert alert-info searchResults"
        role="alert"
        key={itmcard.id}
      >
        <div className="alert alert-info searchShelfResults" role="alert">
          <div>
            <p>
              Name: <b>{itmcard.name}</b>
            </p>
            <p>Keyword: {itmcard.keyword}</p>
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
                <b> {itmcard.shelf_num}</b>
              </span>
            </p>
            <p>
              :
              <span className="binNums">
                <b> {itmcard.level_num}</b>
              </span>
            </p>
            <p>
              :
              <span className="binNums">
                <b> {itmcard.bin_num}</b>
              </span>
            </p>
          </div>
        </div>
        <div className="buttonDiv">
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => editItem(itmcard)}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => triggerConfirm(itmcard)}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default SearchedCard;
