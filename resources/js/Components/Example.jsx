export const validateRole = (role) => {
    switch (role) {
        case 1:
            return "admin";
        case 2:
            return "user";
    }
};

export const validateHeader = (role) => {
    switch (role) {
        case 1:
            return "admin";
        case 2:
            return "client";
    }
};
