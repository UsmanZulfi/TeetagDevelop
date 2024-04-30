interface DashboardTitleHeadProps {
  name: string;
  state: string;
}

const DashboardTitleHead = ({ name, state }: DashboardTitleHeadProps) => {
  return (
    <div className="mt-6 flex items-center gap-6">
      <h5 className="h5 font-fugaz uppercase ">
        Welcome <span className="text-yellow-primary"> {name}</span>{" "}
      </h5>
      <p className="text-xl text-green-light">({state})</p>
    </div>
  );
};

export default DashboardTitleHead;
