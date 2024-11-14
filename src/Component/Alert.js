import React from 'react';

const Alert = ({ type, message, onClose }) => {
  const alertStyles = {
    default: 'bg-blue-500 text-white',
    success: 'bg-green-600 text-white',
    warning: 'bg-yellow-600 text-white',
    danger: 'bg-red-600 text-white',
  };

  return (
    <div className={`flex w-96 shadow-lg rounded-lg`}>
      <div className={`${alertStyles[type]} py-4 px-6 rounded-l-lg flex items-center`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="fill-current text-white" width="20" height="20">
          {/* Add the SVG path for different alert types */}
          {type === 'success' && (
            <path fillRule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path>
          )}
          {type === 'warning' && (
            <path fillRule="evenodd" d="M8.22 1.754a.25.25 0 00-.44 0L1.698 13.132a.25.25 0 00.22.368h12.164a.25.25 0 00.22-.368L8.22 1.754z"></path>
          )}
          {type === 'danger' && (
            <path fillRule="evenodd" d="M4.47.22A.75.75 0 015 0h6a.75.75 0 01.53.22l4.25 4.25c.141.14.22.331.22.53v6a.75.75 0 01-.22.53l-4.25 4.25A.75.75 0 0111 16H5a.75.75 0 01-.53-.22L.22 11.53A.75.75 0 010 11V5a.75.75 0 01.22-.53L4.47.22z"></path>
          )}
          {type === 'default' && (
            <path fillRule="evenodd" d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm6.5-.25A.75.75 0 017.25 7h1a.75.75 0 01.75.75v2.75h.25a.75.75 0 010 1.5h-2a.75.75 0 010-1.5h.25v-2h-.25a.75.75 0 01-.75-.75zM8 6a1 1 0 100-2 1 1 0 000 2z"></path>
          )}
        </svg>
      </div>
      <div className="px-4 py-6 bg-white rounded-r-lg flex justify-between items-center w-full border border-l-transparent border-gray-200">
        <div>{message}</div>
        <button onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" className="fill-current text-gray-700" width="20" height="20">
            <path fillRule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Alert;
