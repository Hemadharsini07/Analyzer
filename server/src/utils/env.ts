export const getPort = (): number => {
  const parsedPort = Number(process.env.PORT || 5000);
  return Number.isNaN(parsedPort) ? 5000 : parsedPort;
};
