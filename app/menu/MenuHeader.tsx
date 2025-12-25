"use client";

type Props = {
  table: number;
};

export default function MenuHeader({ table }: Props) {
  function changeTable() {
    localStorage.removeItem("windmill_table");
    localStorage.removeItem("windmill_name");
    location.reload(); // clean restart
  }

  return (
    <header className="sticky top-0 bg-white z-20 border-b mb-4">
      <div className="flex justify-between items-center px-4 py-3">
        <div>
          <h1 className="text-lg font-semibold text-black">
            Windmill Menu
          </h1>
          <p className="text-sm text-gray-600">
            Table {table}
          </p>
        </div>

        {/* CHANGE TABLE */}
        <button
          onClick={changeTable}
          className="text-sm underline text-gray-700"
        >
          Change
        </button>
      </div>
    </header>
  );
}
