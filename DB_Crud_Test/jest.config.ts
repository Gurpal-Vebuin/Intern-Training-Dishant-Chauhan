module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/test/integration/*.test.ts"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    transform: {
      "^.+\\.ts?$": "ts-jest",
    },  
    moduleNameMapper: {
      "^(\\.{1,2}/.*)\\.js$": "$1",  
    },
  };
  