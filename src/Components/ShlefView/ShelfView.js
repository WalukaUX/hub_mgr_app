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
          <div
            style={{
              backgroundColor: "#FFEBB4",
              height: "50px",
              border: "1px solid black",
            }}
            key={subKey}
          >
            <div>
              <span>Level {levelNumber + 1}</span>
            </div>
            <div className="binsMainDiv">
              {genarateBins(itemArray, levelNumber + 1, shelfNumber)}
            </div>
          </div>
        );
      });
  }

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
            let findId = document.getElementById(idOfTheItem.toString());
            console.log(findId);
            if (!findId) {
              return (
                <div key={binKey} className="btn btn-success" id={idOfTheItem}>
                  <p>{item.bin_num}</p>
                  <span style={{ color: "blue", fontSize: "10px" }}>
                    {countItems()}
                  </span>
                </div>
              );
            } else {
              let currentValue = document.getElementById(toString(idOfTheItem));
              return "";
            }
          } else {
            return "";
          }
        });
    }
  }

  function countItems(itm) {
    return 11;
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
