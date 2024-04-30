interface StateProps {
  id: number;
  state: string;
  tags: string;
}

const StateBox = ({ id, state, tags }: StateProps) => {
  return (
    <div className="flex flex-col mb-4 sm:mb-0 p-10  border-2 border-yellow-primary shadow-md items-center font-fugaz">
      <span className="leaderboard-number font-bold text-2xl ">{id + 1}</span>
      <span className="h6 text-green-light mt-2 uppercase text-center">
        {state}
      </span>
      <span className="h8 text-white mt-2 uppercase">{tags} tags</span>
    </div>
  );
};

export default StateBox;
