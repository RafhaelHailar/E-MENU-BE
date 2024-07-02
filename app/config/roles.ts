import { User_Role } from "@prisma/client";

const allRoles = {
  [User_Role.ADMIN]: ["manageProducts", "getSessions"],
};

export const roles = Object.keys(allRoles);
export const roleRights = new Map(Object.entries(allRoles));
