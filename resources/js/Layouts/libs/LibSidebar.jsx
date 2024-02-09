import { validateRole } from "@/Components/Example";

export const MenuDashboardValidate = (user) => {
    const MenuAdminDashboard = [
        {
            name: "Dashboard",
            url: `/${validateRole(user?.role_id)}`,
            icon: "fas fa-th-large",
        },
    ];

    const MenuMahasiswaDashboard = [
        {
            name: "Dashboard",
            url: "/",
            icon: "fas fa-th-large",
        },
    ];

    switch (user?.role_id) {
        case 1:
            return MenuAdminDashboard;
        case 2:
            return MenuMahasiswaDashboard;
    }
};
