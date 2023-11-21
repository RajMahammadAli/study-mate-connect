export default function ({ items, idx, handleGiveMarkPage }) {
  console.log(items);
  return (
    <>
      <tr>
        <th>{idx + 1}</th>
        <td>{items.title}</td>
        <td>{items.marks}</td>
        <td>{items.examineeName}</td>
        <th>
          <button onClick={handleGiveMarkPage} className="btn btn-ghost btn-xs">
            Give a mark
          </button>
        </th>
      </tr>
    </>
  );
}
