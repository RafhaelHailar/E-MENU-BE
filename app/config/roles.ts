import { User_Role } from "@prisma/client";

const allRoles = {
  [User_Role.ADMIN]: ["manageProducts", "getSessions"],
  [User_Role.CASHIER]: [],
  [User_Role.KITCHEN]: [],
  [User_Role.WAITER]: [],
  [User_Role.CUSTOMER]: [],
};

export const roles = Object.keys(allRoles);
export const roleRights = new Map(Object.entries(allRoles));
