module.exports = {
    roots: ["./src"],
    moduleFileExtensions: ["ts", "tsx", "js"],
    testPathIgnorePatterns: ["node_modules/"],
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    testMatch: ["**/*.spec.(ts|tsx)"],
    moduleNameMapper: {
        // Mocks out all these file formats when tests are run
        "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    }
};
