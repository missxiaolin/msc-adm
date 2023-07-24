module.exports = {
  dev: {
    env: "development",
    MOCK: false,
  },
  test: {
    env: "test",
    MOCK: false,
  },
  prod: {
    env: "production",
    MOCK: false,
  },
  mock: {
    env: "mock",
    MOCK: true,
  },
};
