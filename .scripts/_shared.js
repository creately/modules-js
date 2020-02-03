const { execSync } = require('child_process');
const { resolve } = require('path');
const { readdirSync, readFileSync } = require('fs');

/**
 * The npm registry URL to use (instead of the default URL)
 */
const REGISTRY = 'https://npm.pkg.github.com/creately';

/**
 * Returns a list of package info
 */
function getAvailablePackages() {
    return readdirSync(resolve('./packages'))
        .filter(ent => !ent.startsWith('_'))
        .map(dir => ({
            name: dir,
            path: resolve(`./packages/${dir}`),
            info: JSON.parse( readFileSync(`./packages/${dir}/package.json`, 'utf-8')),
        }));
}

/**
 * Execute an npm command with proper configurations set
 */
function executeNpmCommand(pkg, args) {
    try {
        const cmd = `npm ${args} --registry=${REGISTRY}`;
        const opt = { cwd: pkg.path };
        const out = execSync(cmd, opt);
        return { out: out.toString() };
    } catch (err) {
        return { err };
    }
}

/**
 * Checks whether the package version is already published
 */
function isPackagePublished(pkg) {
    const { out, err } = executeNpmCommand(pkg, `v ${pkg.info.name}@${pkg.info.version}`);
    return out && out.toString().length;
}

/**
 * Installs all npm dependencies using the `npm ci` command
 */
function installDependencies(pkg) {
    const { out, err } = executeNpmCommand(pkg, `ci`);
    return out && out.toString().length;
}

/**
 * Publish the new package version to Github Package Registry
 */
function publishPackageToGPR(pkg) {
    const { out, err } = executeNpmCommand(pkg, `publish`);
    return out && out.toString().length;
}

/**
 * Export stuff!
 */
module.exports = {
    REGISTRY,
    getAvailablePackages,
    executeNpmCommand,
    isPackagePublished,
    installDependencies,
    publishPackageToGPR,
}
