import React from 'react';

const StatsCard = ({ icon, title, value, change }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <div className="flex items-baseline mt-1">
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            {change && (
              <span className={`ml-2 text-sm ${
                change.positive ? 'text-green-600' : 'text-red-600'
              }`}>
                {change.positive ? '+' : '-'}{change.value}
              </span>
            )}
          </div>
        </div>
        <div className="p-3 bg-indigo-50 rounded-lg">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;