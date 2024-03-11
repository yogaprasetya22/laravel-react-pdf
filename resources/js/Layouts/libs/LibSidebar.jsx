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
    ];

    const MenuMahasiswaDashboard = [
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
    ];

    switch (user?.role_id) {
        case 1:
            return MenuAdminDashboard;
        case 2:
            return MenuMahasiswaDashboard;
    }
};
