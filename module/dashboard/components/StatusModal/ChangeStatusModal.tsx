import { useRouter } from "next/router";

const ChangeStatusModal = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/dashboard/scholarship");
  };
  return (
    <div className="container">
      <div className="verification__box">
        <div className="teetag__input mb-12">
          <label
            htmlFor="password"
            className="block mb-4 capitalize font-fugaz"
          >
            Status
          </label>
          <select
            name="status"
            id="status"
            className="w-full border border-gray-400 rounded py-2 px-4 mb-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="btn-teetag yellow w-full text-center"
            // onClick={}
          >
            Save Change
          </button>
          <button
            type="submit"
            className="btn-teetag green w-full text-center ml-10"
            onClick={handleClick}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default ChangeStatusModal;
