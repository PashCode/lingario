function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="rounded-xl bg-white p-4 shadow">
        <p>Завантаження...</p>
      </div>
    </div>
  );
}

export default GlobalLoading;
