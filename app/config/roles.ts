import { User_Role } from "@prisma/client";

const allRoles = {
  [User_Role.ADMIN]: [
    "manageProducts",
    "manageInventory",
    "manageSessions",
    "getOrders",
    "manageUsers",
    "manageLoyalties",
    "updateOrderPaymentStatus",
    "updateOrderStatus",
  ],
  [User_Role.CASHIER]: ["updateOrderPaymentStatus"],
  [User_Role.KITCHEN]: [
    "manageSessions",
    "getOrders",
    "manageInventory",
    "updateOrderStatus",
  ],
  [User_Role.WAITER]: [],
  [User_Role.CUSTOMER]: [],
};

export const roles = Object.keys(allRoles);
export const roleRights = new Map(Object.entries(allRoles));
