import React from 'react';
const CardComponent = () => {
  return (
    <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex">
        <div className="flex-none w-1/3">
          <img src="https://english.cdn.zeenews.com/sites/default/files/2023/10/03/00000003_8.jpg" alt="..." className="h-full w-full object-cover" />
        </div>
        <div className="flex-1 p-4">
          <h5 className="text-lg font-bold">Card title</h5>
          <p className="text-gray-700 mt-2">
            This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
          </p>
          <p className="text-gray-500 text-sm mt-4">Last updated 3 mins ago</p>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
