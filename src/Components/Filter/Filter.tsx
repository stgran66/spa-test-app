interface FilterProps {
  filter: string;
  handleInput: Function;
}

export const Filter = ({ filter, handleInput }: FilterProps) => {
  return (
    <div>
      <p>Please type number to filter products</p>
      <input
        type={'number'}
        value={filter}
        onChange={(evt) => {
          handleInput(evt);
        }}
      />
    </div>
  );
};
