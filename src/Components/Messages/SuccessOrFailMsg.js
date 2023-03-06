function SuccessOrFailMsg({ message, setMessagetofalse }) {
  return (
    <>
      <div
        className={message.error ? "alert alert-danger" : "alert alert-success"}
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <span>{message.message}</span>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={setMessagetofalse}
        ></button>
      </div>
    </>
  );
}
export default SuccessOrFailMsg;
