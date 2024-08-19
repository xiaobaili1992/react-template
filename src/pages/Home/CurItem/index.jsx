const CurItem = ({ dataSource }) => {
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
