export enum Role {
    ADMIN = "ADMIN",
    FARMER = "FARMER"
}

export const roleMap = new Map<string, Role>(
    [
        ['ADMIN', Role.ADMIN],
        ['FARMER', Role.FARMER],
    ]);

export function getRole(role: string): Role {
    switch (role) {
    case 'ADMIN': return Role.ADMIN;
    case 'FARMER': return Role.FARMER;
    default: return Role.FARMER;
    }
}