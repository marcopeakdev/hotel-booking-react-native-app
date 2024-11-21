export default function FilterButton({
  current,
  selection,
  icon,
  setFilterSelection,
}) {
  return (
    <button
      type="button"
      onClick={() => setFilterSelection(current === selection ? "" : selection)}
    >
      <div>
        <div>{icon}</div>
        <div>{selection}</div>
      </div>
    </button>
  );
}
