import { useState } from "react";
import "./shelfView.css";
import BinCard from "./BinCard";

function ShelfView({
  items,
  sendDeleteCommand,
  updateData,
  setUpdateData,
  updateItem,
}) {
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
            <h4 className="slfnumberh4">Shelf Number {shelfNumber}</h4>
            {findItemsWithoutaLevel(itemArray)}
          </div>
          {createLevels(itemArray, shelfNumber)}
        </div>
      );
    });
    return createDiv;
  }
  function findItemsWithoutaLevel(array){
    let itmscount=0;
    let filterItems=array.map((item,idx)=>{
      
      if((item.level_num === 0 || item.level_num === null)&& itmscount === 0 ){
        itmscount++;
        return <div
        key={idx + "A"}
        onClick={() => {
          openPopup(item);
        }}
        className="topOfTheShelfBtn binButton"
      >
        <span style={{ color: "blue", fontSize: "10px" }}>On the top of the shelf</span>
      </div>
      }
    })
    return filterItems
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
                  className="binButton binButtonIntheShelf"
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
          <BinCard
            itemcard={itmcard}
            key={itmcard.id}
            sendDeleteCommand={sendDeleteCommand}
            updateData={updateData}
            setUpdateData={setUpdateData}
            updateItem={updateItem}
          />
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
            <div className="popup-box binViewInner">
              <div className="popup-inner iner">
                <div
                  style={{
                    backgroundColor: "#F2EFDC",
                    padding: "10px 20px 0 20px",
                    overflow: "scroll",
                  }}
                >
                  <h4 className="alert alert-success popUpeditH1">
                    Items in Shelf number {binItem.shelf_num}, Level Number{" "}
                    {binItem.level_num}{" "}
                    {binItem.bin_num ? `, BinNumber ${binItem.bin_num}` : ""}
                  </h4>

                  {createBinItemcards()}
                  <div className="alert alert-primary popUpeditBtnBox">
                    <div>
                      <button
                        className="btn btn-warning"
                        style={{ marginLeft: "20px" }}
                        onClick={() => setItemPopUpwin(false)}
                      >
                        Go Back
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
