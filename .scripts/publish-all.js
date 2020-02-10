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
    console.log(`processing ${pkg.info.name}`)
    const isOnGPR = isPackagePublishedGPR(pkg);
    const isOnNPM = isPackagePublishedNPM(pkg);
    if (isOnNPM && isOnGPR) {
        continue;
    }
    installDependencies(pkg);
    executeCustomScript(pkg, 'test');
    if (!isOnGPR) {
        publishPackageToGPR(pkg);
    }
    if (!isOnNPM) {
        publishPackageToNPM(pkg);
    }
}
