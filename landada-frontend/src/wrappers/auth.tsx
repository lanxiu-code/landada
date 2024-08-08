import { history, Navigate, Outlet, useAccess, useModel } from "umi";
export default (props: any) => {
  const access = useAccess();
  if (access.canUser) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};
