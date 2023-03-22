import "./shelfView.css";

function ShelfView({ items }) {
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
        <div className="subDiv" key={shelfNumber}>
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
        let subKey = levelNumber * 5;
        return (
          <div className="levelDiv" key={subKey}>
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
  function genarateBins(itemArray, levelNumber, shelfNumber) {
    if (itemArray.length !== 1) {
      return itemArray
        .sort((a, b) => a.bin_num - b.bin_num)
        .map((item, idx) => {
          let binKey = idx + 1;
          if (levelNumber === item.level_num) {
            let itemCount = [];
            itemCount.push(item.bin_num);
            let idOfTheItem = `${shelfNumber}${levelNumber}${item.bin_num}`;
            // let findId = document.getElementById(idOfTheItem.toString());
            if (!uniqueDivIds.has(idOfTheItem)) {
              uniqueDivIds.add(idOfTheItem);
              return (
                <div
                  key={binKey}
                  onClick={() => openPopup(item)}
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

  function openPopup(item) {
    console.log(item);
  }
  return (
    <>
      <h1>Shelf view</h1>
      <div className="mainGrid">{genarateShelfs()}</div>
    </>
  );
}

export default ShelfView;

///issue shelfview renders twice
