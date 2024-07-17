import privateRoute from "@/components/PrivateRoute/privateRoute";

const Orders = () => {
  return (
    <>
      <div>
        <h1>Past Orders</h1>
      </div>
    </>
  );
};

export default privateRoute(Orders);
