function CheckDeleteAccount({ deleteAccount, setIsDeleteConfirm }) {
  return (
    <div>
      <h1>Ви впевнені?</h1>

      <button onClick={() => deleteAccount()}>Так</button>
      <button onClick={() => setIsDeleteConfirm(false)}>Ні</button>
    </div>
  );
}

export default CheckDeleteAccount;
