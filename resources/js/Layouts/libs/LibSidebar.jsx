import { validateRole } from "@/Components/Example";

export const MenuDashboardValidate = (user) => {
    const MenuAdminDashboard = [
        {
            name: "Dashboard",
            url: `/${validateRole(user?.role_id)}`,
            icon: "fas fa-th-large",
        },
        {
            name: "Aproval",
            url: `/${validateRole(user?.role_id)}/aproval`,
            icon: "fas fa-check",
        },
        {
            name: "User",
            url: `/${validateRole(user?.role_id)}/user`,
            icon: "fas fa-users",
        },
        {
            name: "Tamplate",
            url: `/${validateRole(user?.role_id)}/tamplate`,
            icon: "fas fa-file",
        },
    ];

    const MenuClientDashboard = [
        {
            name: "Dashboard",
            url: "/",
            icon: "fas fa-th-large",
        },
        {
            name: "Laporan",
            url: "/laporan",
            icon: "fas fa-file",
        },
        {
            name: "History",
            url: "/history",
            icon: "fas fa-history",
        },
        {
            name: "Feedback",
            url: "/feedback",
            icon: "fas fa-exchange-alt",
        },
    ];

    const MenuSuperAdminDashboard = [
        {
            name: "Dashboard",
            url: "/superadmin",
            icon: "fas fa-th-large",
        },
        {
            name: "Client",
            url: "/superadmin/client",
            icon: "fas fa-users",
        },
        {
            name: "Admin",
            url: "/superadmin/admin",
            icon: "fas fa-users",
        },
    ];

    switch (user?.role_id) {
        case 1:
            return MenuAdminDashboard;
        case 2:
            return MenuClientDashboard;
        case 3:
            return MenuSuperAdminDashboard;
    }
};
