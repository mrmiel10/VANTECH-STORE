"use client"
import React from "react";
import { Navbar } from "./Navbar/Navbar";
import { UserNav } from "./Navbar/UserNav";
export const NavbarPage = () => {
  return (
    <Navbar>
      <UserNav />
    </Navbar>
  );
};

