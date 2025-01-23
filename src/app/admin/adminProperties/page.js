import AdminLayout from '@/app/layout';

const PropertyManagement = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Properties</h2>
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through properties here */}
          <tr>
            <td className="border px-4 py-2">1</td>
            <td className="border px-4 py-2">Luxury Villa</td>
            <td className="border px-4 py-2">$1,200,000</td>
            <td className="border px-4 py-2">
              <button className="bg-blue-500 text-white px-3 py-1 rounded">
                Edit
              </button>
              <button className="bg-red-500 text-white px-3 py-1 rounded ml-2">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
  );
};

export default PropertyManagement;
