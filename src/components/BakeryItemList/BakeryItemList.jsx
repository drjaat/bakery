import React from 'react';
import BakeryItem from './BakeryItem';

const BakeryItemList = ({ items }) => {
  return (
    <div className="grid grid-cols-4 gap-4 mt-8 mx-4">
      {items.map((item) => (
        <BakeryItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default BakeryItemList;
