import { useNavigate } from 'react-router-dom';
type TableProps<T> = {
  data: T[];
  head?: string[]; // Optional if you want to pass custom headers
  route : string;
 
};

const Table = <T extends object>({ data, head , route }: TableProps<T>) => {

 
  // Automatically generate headers from the first object if not provided
  const headers = head || (data.length > 0 ? Object.keys(data[0]) : []);
  
  const navigate = useNavigate();

  const handleRowClick = (id: any) => {
    navigate(`${route}/${id}`);  // Redirect to the specified route
  };

  return (
    <div className='relative overflow-x-auto shadow-custom sm:rounded-lg'>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {headers.map(h => (
              <th className="px-6 py-3" key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr className='cursor-pointer hover:text-gray-900' key={index} onClick={() => handleRowClick((item as any).id)}>
              {Object.keys(item).map(key => (
                <td className="px-6 py-4" key={key}>{(item as any)[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
