import React from 'react';

interface DataSource {
  name: string;
  age: number;
  gender: string;
}

const CurItem: React.FC<{ dataSource: DataSource }> = ({ dataSource }) => {
  const { name, age, gender } = dataSource || {};
  return (
    <>
      <div>{name}</div>
      <div>{age}</div>
      <div>{gender}</div>
    </>
  );
};

export default CurItem;
