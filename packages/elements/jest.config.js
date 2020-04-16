module.exports = {
    roots: ["./src"],
    moduleFileExtensions: ["ts", "tsx", "js", "svg"],
    testPathIgnorePatterns: ["node_modules/"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        ".+\\.(svg|ttf|woff|woff2)$": "jest-transform-stub"
    },
    testMatch: ["**/*.spec.(ts|tsx)"],
};