const { execSync } = require('child_process');
const { resolve } = require('path');
const { readdirSync, readFileSync } = require('fs');

/**
 * The npm registry URL to use (instead of the default URL)
 */
const REGISTRY = 'https://npm.pkg.github.com/creately';

/**
 * Returns a list of available package info
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
 * Returns a list of modified package info
 */
function getModifiedPackages() {
    const regex = /packages\/([a-z\-]+)/gm;
    const modifiedPaths = execSync(`git diff --name-only master`).toString();
    const packageDirs = new Set();
    const matches = modifiedPaths.match(regex);
    if (!matches) {
        return [];
    }
    for (const match of matches) {
        // NOTE: may not work on windows, check (but we're using this only on CI)
        const packageDir = match.split('/')[1];
        packageDirs.add(packageDir);
    }
    return getAvailablePackages()
        .filter(pkg => packageDirs.has(pkg.name));
}

/**
 * Execute an npm command with proper configurations set
 */
function executeNpmCommand(pkg, args) {
    try {
        const cmd = `npm ${args}`;
        const opt = { cwd: pkg.path };
        const out = execSync(cmd, opt);
        return { out: out.toString() };
    } catch (err) {
        return { err };
    }
}

/**
 * Checks whether the package version is already published
 * on Github Package Registry.
 */
function isPackagePublishedGPR(pkg) {
    const { out, err } = executeNpmCommand(pkg, `v ${pkg.info.name}@${pkg.info.version} --registry=${REGISTRY}`);
    return Boolean(out && out.toString().trim().length);
}

/**
 * Checks whether the package version is already published
 * on Default NPM Package Registry.
 */
function isPackagePublishedNPM(pkg) {
    const { out, err } = executeNpmCommand(pkg, `v ${pkg.info.name}@${pkg.info.version}`);
    return Boolean(out && out.toString().trim().length);
}

/**
 * Installs all npm dependencies using the `npm ci` command
 */
function installDependencies(pkg) {
    const { out, err } = executeNpmCommand(pkg, `ci --registry=${REGISTRY}`);
    if ( err ) {
        throw err;
    }
    return out && out.toString().length;
}

/**
 * Publish the new package version to Github Package Registry
 */
function publishPackageToGPR(pkg) {
    const { out, err } = executeNpmCommand(pkg, `publish --registry=${REGISTRY}`);
    if ( err ) {
        throw err;
    }
    return out && out.toString().length;
}

/**
 * Publish the new package version to Default NPM Package Registry
 */
function publishPackageToNPM(pkg) {
    const { out, err } = executeNpmCommand(pkg, `publish --access=public`);
    if ( err ) {
        throw err;
    }
    return out && out.toString().length;
}

/**
 * Publish the new package version to Github Package Registry
 */
function executeCustomScript(pkg, script, args = []) {
    const { out, err } = executeNpmCommand(pkg, `run ${script} -- ${args.join(' ')}`);
    if ( err ) {
        throw err;
    }
    return !!out;
}

/**
 * Export stuff!
 */
module.exports = {
    REGISTRY,
    getAvailablePackages,
    getModifiedPackages,
    executeNpmCommand,
    isPackagePublishedGPR,
    isPackagePublishedNPM,
    installDependencies,
    publishPackageToGPR,
    publishPackageToNPM,
    executeCustomScript,
}
