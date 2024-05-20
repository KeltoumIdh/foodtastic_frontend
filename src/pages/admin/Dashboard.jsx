import React, { useEffect } from "react";

import { FourCard } from "../../components/admin/cards/FourCard";
import { StockCard } from "../../components/admin/cards/StockProduct";
import { ListCard } from "../../components/admin/cards/listCard";
import ChartCard from "../../components/admin/cards/ChartCard";

const Dashboard = () => {
  // const { getUser, user } = useAuthContext();
  // const { setAuthenticated, user } = useUserContext();

  // useEffect(() => {
  //   setAuthenticated;
  // }, []);

  return (
    <div className="w-full">
      <div className="md:m-2 flex flex-col justify-between items-start gap-2 w-full md:w-[calc(100 - 5)] ">
        <div className="h-auto mb-2 w-full">
          {/* <FourCard /> */}
        </div>
        <div className="h-auto w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2">
          <div className="flex flex-col h-auto ">
            {/* <StockCard /> */}
          </div>

          <div className="flex flex-col h-auto ">
            {/* <ListCard /> */}
          </div>
        </div>
        <div className="h-auto w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2">
          <div className="flex flex-col h-auto ">
            {/* <ChartCard /> */}
          </div>

          <div className="flex flex-col h-auto ">{/* <ListCard /> */}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
