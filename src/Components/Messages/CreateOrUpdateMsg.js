import "./messagesStying.css"

function CreateOrUpdateMsg({ message }) {
  return (
    <div className="alert alert-primary">
      <div className="messageDiv" role="alert">
        <div className="messageInnerDiv">
          <div className="labels">
            <p>Name</p>
            <p>Keywords</p>
          </div>
          <div>
            <p>:{message.name}</p>
            <p>:{message.keyword}</p>
          </div>
        </div>
        <div className="messageInnerDiv">
          <div className="labels">
            <p>Shelf Number</p>
            <p>Level Number</p>
            <p>Bin Number</p>
          </div>
          <div>
            <p>:{message.shelf_num}</p>
            <p>:{message.level_num}</p>
            <p>:{message.bin_num}</p>
          </div>
        </div>
      </div>
      <div className="messageDiv" role="alert">
      <p className="linkURL">URL :{message.url}</p>
      </div>
    </div>
  );
}
export default CreateOrUpdateMsg;
