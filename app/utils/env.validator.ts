import { config } from "dotenv";

if (process.env.NODE_ENV === "production") {
  config({ path: ".env.prod" });
  console.log("Loaded Production Environment Variables");
} else if (process.env.NODE_ENV === "development") {
  config({ path: ".env.dev" });
  console.log("Loaded Development Environment Variables");
}

export default () => {
  const requiredVariables = [
    "BACKEND_BASE_URL",
    "FRONTEND_BASE_URL",
    "DATABASE_URL",
    "APP_PORT",
  ];

  const missingVariables = requiredVariables.filter(
    (variable) => !process.env[variable]
  );

  if (missingVariables.length > 0) {
    console.error(
      `Missing required environment variables: ${missingVariables.join(", ")}`
    );
    process.exit(1);
  }

  if (isNaN(Number(process.env.APP_PORT))) {
    console.error("APP_PORT must be a number");
    process.exit(1);
  }

  console.log("Environment variables are valid.");
};
