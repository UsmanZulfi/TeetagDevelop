import DataDetailCard from "@/dashboard/components/DataDetailCard/DataDetailCard";
import InnerHeader from "@/dashboard/components/InnerHeader/InnerHeader";
import { Loader } from "@/website/components/Loader/Loader";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import DashboardLayout from "module/dashboard/layout/DashboardLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const OrderDetail = () => {
  const router = useRouter();
  const { rowData } = router.query;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [orderData, setOrderData] = useState<any>(null);
  useEffect(() => {
    let dynamicData;
    if (Array.isArray(rowData)) {
      dynamicData = rowData.map((data) => JSON.parse(decodeURIComponent(data)));
    } else if (rowData) {
      dynamicData = JSON.parse(decodeURIComponent(rowData));
    }
    if (dynamicData) {
      const orderData = [
        {
          key: "Order ID",
          value: dynamicData.order_id,
        },
        {
          key: "Customer Name",
          value: dynamicData.billing.name,
        },
        {
          key: "Email",
          value: dynamicData.billing.email,
        },
        {
          key: "State of tagger",
          value: dynamicData.tager_state,
        },
        {
          key: "Purchase Date",
          value: dynamicData.createdAt,
        },
        {
          key: "Person Tagged",
          value: dynamicData.shipping.name,
        },
        {
          key: "State of Person tagged",
          value: dynamicData.tagee_state,
        },
        {
          key: "Shirts in Order",
          value: dynamicData.tags,
        },
        {
          key: "Source",
          value: dynamicData.payment_gateway,
        },
        {
          key: "Order Total",
          value: dynamicData.total,
        },
      ];
      setOrderData(orderData);
      setIsLoading(false);
    }
  }, [rowData]);

  return (
    <>
      {(isLoading && <Loader />) || (
        <>
          <TitleHead
            title="Order Detail"
            metaTitle="Order Detail"
            metaDesc="Order Detail"
          />
          <InnerHeader title="Order Detail" />
          <DataDetailCard dynamicData={orderData} />
        </>
      )}
    </>
  );
};

export default OrderDetail;

OrderDetail.getLayout = function (page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
