import { useState } from "react";
import "./shelfView.css";

function ShelfView({ items }) {
  const [itemPopUpwin, setItemPopUpwin] = useState(false);
  const [binItem, setBinItem] = useState({});
  const slvs = [
    [4],
    [4],
    [4],
    [4],
    [5],
    [8],
    [12],
    [5],
    [8],
    [8],
    [5],
    [6],
    [5],
    [5],
    [5],
    [6],
    [5],
    [6],
  ];

  function genarateShelfs() {
    items.forEach((e) => {
      if (e.shelf_num !== null) {
        slvs[e.shelf_num - 1].push(e);
      }
    });

    return createDiv();
  }

  function createDiv() {
    let createDiv = slvs.map((itemArray, idx) => {
      let shelfNumber = idx + 1;
      return (
        <div className="subDiv" key={shelfNumber * 7}>
          <div>
            <h4>Shelf Number {shelfNumber}</h4>
          </div>
          {createLevels(itemArray, shelfNumber)}
        </div>
      );
    });
    return createDiv;
  }
  function createLevels(itemArray, shelfNumber) {
    var indents = [];
    for (var i = 0; i < itemArray[0]; i++) {
      indents.push(i);
    }
    return indents
      .sort((a, b) => b - a)
      .map((levelNumber) => {
        return (
          <div className="levelDiv" key={levelNumber * 5}>
            <div>
              <span>Level {levelNumber + 1}</span>
            </div>
            <div className="binsMainDiv">
              <div className="binNumMainDiv">
                <div className="binNumDiv">Bin</div>
                <div className="binNumDiv">Num</div>
                <div className="binNumDiv">➡️</div>
              </div>
              {genarateBins(itemArray, levelNumber + 1, shelfNumber)}
            </div>
          </div>
        );
      });
  }
  let uniqueDivIds = new Set();
  let itemCount = [];
  function genarateBins(itemArray, levelNumber, shelfNumber) {
    if (itemArray.length !== 1) {
      return itemArray
        .sort((a, b) => a.bin_num - b.bin_num)
        .map((item, idx) => {
          if (levelNumber === item.level_num) {
            itemCount.push(item.bin_num);
            let idOfTheItem = `${shelfNumber}${levelNumber}${item.bin_num}`;
            if (!uniqueDivIds.has(idOfTheItem)) {
              uniqueDivIds.add(idOfTheItem);
              return (
                <div
                  key={idx + 1}
                  onClick={() => {
                    openPopup(item);
                  }}
                  className="binButton"
                  id={idOfTheItem}
                >
                  <span>{item.bin_num}</span>
                  <span style={{ color: "blue", fontSize: "10px" }}></span>
                </div>
              );
            } else {
              return "";
            }
          } else {
            return "";
          }
        });
    }
  }

  function openPopup(clickedItem) {
    setBinItem(clickedItem);
    setItemPopUpwin(true);
  }

  function createBinItemcards() {
    return items.map((itmcard) => {
      if (
        itmcard.shelf_num === binItem.shelf_num &&
        itmcard.level_num === binItem.level_num &&
        itmcard.bin_num === binItem.bin_num
      ) {
        return (
          <>
            <div className="alert alert-info searchResults" role="alert">
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
                  // onClick={() => editItem(itmcard)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  // onClick={() => triggerConfirm(itmcard)}
                >
                  Delete
                </button>
              </div>
            </div>
          </>
        );
      } else {
        return "";
      }
    });
  }
  return (
    <>
      <div>
        <h1>Shelf view</h1>
        <div className="mainGrid">
          {genarateShelfs()}
          {itemPopUpwin ? (
            <div className="popup-box">
              <div className="popup-inner">
                <div style={{ backgroundColor: "#F2EFDC", padding: "20px" }}>
                  <h4>
                    Items in Shelf number {binItem.shelf_num}, Level Number{" "}
                    {binItem.level_num}{" "}
                    {binItem.bin_num ? `, BinNumber ${binItem.bin_num}` : ""}
                  </h4>
                  {createBinItemcards()}
                  <div className="editBtnBox">
                    <div>
                      <button className="btn btn-success" type="submit">
                        Save
                      </button>
                    </div>
                    <div>
                      <button
                        className="btn btn-warning"
                        style={{ marginLeft: "20px" }}
                        onClick={() => setItemPopUpwin(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default ShelfView;

///issue shelfview renders twice
