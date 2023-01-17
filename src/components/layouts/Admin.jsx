import React from "react";

// components

import AdminNavbar from "@/components/Navbars/AdminNavbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import HeadLayoutDynamic from "../globals/HeadLayoutDynamic";
import HeaderStats from "@/components/Headers/HeaderStats";

export default function Admin({ children, title }) {
  let titlePage = title ? "KARAZ ERP - " + title : "KARAZ ERP - DASHBOARD";
  return (
    <>
      <HeadLayoutDynamic
        title={titlePage}
        description="Sistema de Gestion Documentaria, Contable y Ventas."
        keywords="ERP, KARAZ, SISTEMA, GESTION, DOCUMENTARIA, CONTABLE, VENTAS"
      />
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-800">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">{children}</div>
      </div>
    </>
  );
}
