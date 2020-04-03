const {
    getAvailablePackages,
    isPackagePublishedGPR,
    isPackagePublishedNPM,
    installDependencies,
    publishPackageToGPR,
    publishPackageToNPM,
    executeCustomScript,
} = require('./_shared');

for ( const pkg of getAvailablePackages()) {
    try {
        console.info(`\n*** Processing: ${pkg.info.name}\n`);
        console.info(`\n*** Checking whether package is published on GPR: ${pkg.info.name}\n`);
        const isOnGPR = isPackagePublishedGPR(pkg);
        console.info(`\n*** Checking whether package is published on NPM: ${pkg.info.name}\n`);
        const isOnNPM = isPackagePublishedNPM(pkg);
        if (isOnNPM && isOnGPR) {
            console.info(`\n*** Package is already published on GPR and NPM: ${pkg.info.name}\n`);
            continue;
        }
        console.info(`\n*** Installing dependencies of module: ${pkg.info.name}\n`);
        installDependencies(pkg);
        console.info(`\n*** Running unit tests of module: ${pkg.info.name}\n`);
        executeCustomScript(pkg, 'test');
        if (!isOnGPR) {
            console.info(`\n*** Publishing module to GPR: ${pkg.info.name}\n`);
            publishPackageToGPR(pkg);
        }
        if (!isOnNPM) {
            console.info(`\n*** Publishing module to NPM: ${pkg.info.name}\n`);
            publishPackageToNPM(pkg);
        }
        console.info(`\n*** Processed: ${pkg.info.name} successfully\n`);
    } catch (err) {
        console.error(`\n*** Failed to process: ${pkg.info.name}\n`);
        console.error(err && err.stack || err);
    }
}
