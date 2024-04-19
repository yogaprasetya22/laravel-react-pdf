import { MenuDashboardValidate } from "@/Layouts/libs/LibSidebar";
import { Link, usePage } from "@inertiajs/react";
import React, { useState, useEffect } from "react";

const Sidebar = ({ isSidebarOpen, user }) => {
    const { auth } = usePage().props;
    const [OpenDropdown, setOpenDropdown] = useState({
        dropdown1: false,
        dropdown2: false,
    });
    const MenuDashboard = MenuDashboardValidate(user);
    const path = window.location.pathname;

    let relevantPath;

    if (auth?.user?.role_id !== 2) {
        if (path.includes("/") && path.split("/").length > 2) {
            const segments = path.split("/");
            relevantPath = `/${segments[1]}/${segments[2]}`;
        } else {
            relevantPath = window.location.pathname;
        }
    } else {
        if (path.includes("/")) {
            const segments = path.split("/");
            relevantPath = `/${segments[1]}`;
        } else {
            relevantPath = window.location.pathname;
        }
    }
    return (
        <aside
            className={`h-screen lg:w-80 shadow-md w-[100%] lg:relative absolute z-10 ${
                isSidebarOpen
                    ? "transform translate-x-0 "
                    : "lg:translate-x-0  transform -translate-x-full"
            } lg:flex transition-transform duration-300 ease-in-out`}
        >
            <div className="lg:w-full md:w-[40%] w-[75%] bg-white h-full ">
                <div className="px-5 py-5 flex flex-col justify-between h-full  pb-20">
                    <ul className="flex flex-col gap-3 w-full">
                        {MenuDashboard &&
                            MenuDashboard.map((menu, index) => (
                                <div key={index}>
                                    {!menu.dropdown ? (
                                        <Link
                                            href={menu.url}
                                            className="cursor-pointer"
                                        >
                                            <li
                                                className={`font-medium w-full rounded-md text-gray-700 p-2 flex gap-2 items-center select-none ${
                                                    menu.url === relevantPath
                                                        ? "text-white  bg-green-500"
                                                        : "hover:text-black hover:bg-blue-gray-200"
                                                }`}
                                            >
                                                <i
                                                    className={`text-xl ${menu.icon}`}
                                                ></i>
                                                {menu.name}
                                            </li>
                                        </Link>
                                    ) : (
                                        <>
                                            <li
                                                className={`font-medium w-full cursor-pointer transition-all ease-in-out delay-75 flex justify-between rounded-md text-gray-700 p-2 gap-2 items-center select-none ${
                                                    menu.url ===
                                                    window.location.pathname
                                                        ? "text-gray-900  bg-blue-gray-200"
                                                        : "hover:text-black hover:bg-blue-gray-200"
                                                }`}
                                                onClick={() => {
                                                    if (
                                                        menu.url ===
                                                        window.location.pathname
                                                    ) {
                                                        setOpenDropdown(
                                                            (prevState) => ({
                                                                ...prevState,
                                                                dropdown1: true,
                                                            })
                                                        );
                                                    } else {
                                                        setOpenDropdown(
                                                            (prevState) => ({
                                                                ...prevState,
                                                                dropdown1:
                                                                    !prevState.dropdown1,
                                                            })
                                                        );
                                                    }
                                                }}
                                            >
                                                <p className=" flex gap-2 items-center  ">
                                                    <i
                                                        className={`text-xl ${menu.icon}`}
                                                    ></i>
                                                    {menu.name}
                                                </p>
                                                <i
                                                    className={`fas fa-chevron-${
                                                        OpenDropdown.dropdown1
                                                            ? "up"
                                                            : "down"
                                                    }`}
                                                ></i>
                                            </li>
                                            <ul className="pl-5">
                                                {OpenDropdown.dropdown1 &&
                                                    menu.dropdown.map(
                                                        (menu, index) => (
                                                            <Link
                                                                key={index}
                                                                href={menu.url}
                                                                className="cursor-pointer"
                                                            >
                                                                <li
                                                                    className={`font-medium w-full rounded-md text-gray-700 p-2 flex gap-2 items-center select-none ${
                                                                        menu.url ===
                                                                        window
                                                                            .location
                                                                            .pathname
                                                                            ? "text-white  bg-green-500"
                                                                            : "hover:text-black hover:bg-blue-gray-200"
                                                                    }`}
                                                                >
                                                                    <i
                                                                        className={`text-xl ${menu.icon}`}
                                                                    ></i>
                                                                    {menu.name}
                                                                </li>
                                                                <hr />
                                                            </Link>
                                                        )
                                                    )}
                                            </ul>
                                        </>
                                    )}
                                </div>
                            ))}
                    </ul>
                    <ul className="flex flex-col gap-3 w-full mb-5">
                        {/* Dorpdown */}
                        <li
                            className={`font-medium w-full cursor-pointer transition-all ease-in-out delay-75 flex justify-between rounded-md text-gray-700 px-2 gap-2 items-center select-none hover:text-black hover:bg-blue-gray-200`}
                            onClick={() =>
                                setOpenDropdown((prevState) => ({
                                    ...prevState,
                                    dropdown2: !prevState.dropdown2,
                                }))
                            }
                        >
                            <p className=" flex gap-2 items-center  ">
                                <i className={`text-xl fas fa-cog`}></i>
                                Settings
                            </p>
                            <i
                                className={`fas fa-chevron-${
                                    OpenDropdown.dropdown2 ? "up" : "down"
                                }`}
                            ></i>
                        </li>
                        <ul className="pl-5">
                            {OpenDropdown.dropdown2 && (
                                <>
                                    <Link
                                        href={route("profile.edit")}
                                        className="cursor-pointer"
                                    >
                                        <li
                                            className={`font-medium w-full rounded-md text-gray-700 p-2 flex gap-2 items-center select-none ${
                                                route("profile.edit").slice(
                                                    21
                                                ) === window.location.pathname
                                                    ? "text-white  bg-green-500"
                                                    : "hover:text-black hover:bg-blue-gray-200"
                                            }`}
                                        >
                                            <i
                                                className={`text-xl fas fa-user`}
                                            ></i>
                                            Profile
                                        </li>
                                    </Link>
                                    <Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                        className="cursor-pointer"
                                    >
                                        <li
                                            className={`font-medium w-full rounded-md text-gray-700 p-2 flex gap-2 items-center ${"hover:text-black hover:bg-blue-gray-200"}`}
                                        >
                                            <i
                                                className={`text-xl fas fa-sign-out-alt`}
                                            ></i>
                                            Logout
                                        </li>
                                    </Link>
                                </>
                            )}
                        </ul>
                    </ul>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
