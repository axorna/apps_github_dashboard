// import React from "react";
// import AuthProxiesTable from "../auth-proxies-table";
// import { PlainColumn } from "lib-javascript/duo/components/table/v2/helpers/columns";
// import PageTitle from "lib-javascript/duo/components/typography/page-title";
// import "./auth-proxy-dashboard.css";

// const PROXY_TABLE_COLUMNS = [
//   new PlainColumn({
//     headerText: "Name",
//     renderData: (data) => <a href={`/applications/authproxy/${data?.proxy_key}`}>{data?.name}</a> || 'Unknown',  
//   }),
//   new PlainColumn({
//     headerText: "Hostname",
//     renderData: (data) => data?.hostname || "Unknown",
//   }),
//   new PlainColumn({
//     headerText: "IP Address",
//     renderData: (data) => data?.ip_address || "Unknown",
//   }),
//   new PlainColumn({
//     headerText: "Status",
//     renderData: (data) => data?.status || "Unknown",
//   }),
//   new PlainColumn({
//     headerText: "Version",
//     renderData: (data) => data?.version || "Unknown",
//   }),
// ];

// export const AuthProxyDashboard = ({
//   authproxies,
// }: AuthProxyDashboardProps) => {
//   return (
//     <div className="auth-proxy-dashboard">
//       <PageTitle className="auth-proxy-dashboard-title">
//         Authentication proxies
//       </PageTitle>
//       <p className="auth-proxy-dashboard-desc">
//         See the state of your authentication proxies all in one place.
//       </p>
//       <AuthProxiesTable
//         className="auth-proxy-dashboard-table"
//         data={authproxies}
//         columns={PROXY_TABLE_COLUMNS}
//       />
//     </div>
//   );
// };
