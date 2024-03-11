export const validateRole = (role) => {
    switch (role) {
        case 1:
            return "admin";
        case 2:
            return "user";
        case 3:
            return "superadmin";
    }
};

export const validateHeader = (role) => {
    switch (role) {
        case 1:
            return "admin";
        case 2:
            return "client";
        case 3:
            return "superadmin";
    }
};
