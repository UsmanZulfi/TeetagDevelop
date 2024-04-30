import styles from "./DataDetailCard.module.css";
interface DataDetailCardProps {
  user?: any;
  otherData?: any;
  dynamicData?: any;
}
const DataDetailCard = ({
  user,
  otherData,
  dynamicData,
}: DataDetailCardProps) => {
  return (
    <>
      {(user && (
        <div className={styles.card}>
          <div>
            <p className="font-bold mb-2">Name</p>
            <p>{user.name}</p>
          </div>
          <div>
            <p className="font-bold mb-2">Player Id</p>
            <p>{user.id}</p>
          </div>

          <div>
            <p className="font-bold mb-2">Email</p>
            <p>{user.email}</p>
          </div>

          <div>
            <p className="font-bold mb-2">Phone Number</p>
            <p>{user.phone}</p>
          </div>

          <div>
            <p className="font-bold mb-2">State</p>
            <p>{user.state}</p>
          </div>

          <div>
            <p className="font-bold mb-2">Personal Tags</p>
            <p>{user.total_tags}</p>
          </div>
          {user.minion_code && (
            <div>
              <p className="font-bold mb-2">State Ambassador Code</p>
              <p>{user.minion_code}</p>
            </div>
          )}
          {user.influencer_code && (
            <div>
              <p className="font-bold mb-2">Influencer Code</p>
              <p>{user.influencer_code}</p>
            </div>
          )}
        </div>
      )) ||
        (otherData && (
          <div className={styles.card}>
            <div>
              <p className="font-bold mb-2">Total Earned</p>
              <p>${otherData.totalEarned}</p>
            </div>
            <div>
              <p className="font-bold mb-2">Number of Chains</p>
              <p>{otherData.noOfChains}</p>
            </div>

            <div>
              <p className="font-bold mb-2">Number of Tags</p>
              <p>{otherData.noOfTags}</p>
            </div>
          </div>
        )) ||
        (dynamicData && (
          <div className={styles.card}>
            {dynamicData?.map((data: any) => {
              return (
                <div key={data.key}>
                  <p className="font-bold mb-2">{data.key}</p>
                  <p>{data.value}</p>
                </div>
              );
            })}
          </div>
        ))}
    </>
  );
};

export default DataDetailCard;
