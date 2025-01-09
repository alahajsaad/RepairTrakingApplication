import { MdDelete, MdModeEdit } from 'react-icons/md';

type TableProps<T extends { id: number }> = {
  data: T[];
  head?: string[];  // Optional for custom headers
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

const TableWithActions = <T extends { id: number }>({ data, head, onEdit, onDelete }: TableProps<T>) => {
  // Generate headers based on the object keys if head is not provided
  const headers = head || (data.length > 0 ? Object.keys(data[0]).filter(key => key !== 'id') : []);

  return (
    <div className="scrollable-table">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-4 py-2 border border-gray-300 text-left">{header}</th>
            ))}
            <th className="px-4 py-2 border border-gray-300 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            const { id } = item; // Destructure id from the item object
            return (
              <tr key={id} className="border-b">
                {Object.values(item).map((value, index) => (
                  <td key={index} className="px-4 py-2 border border-gray-300">{String(value)}</td>
                ))}
                <td className="px-4 py-2 border border-gray-300">
                  <div className="flex justify-end space-x-2">
                    <button className="edit text-green-500 hover:text-blue-700" onClick={() => onEdit(id)}><MdModeEdit /></button>
                    <button className="delete text-red-500 hover:text-red-700" onClick={() => onDelete(id)}><MdDelete /></button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableWithActions;
