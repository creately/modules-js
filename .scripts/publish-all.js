const {
    getAvailablePackages,
    isPackagePublished,
    installDependencies,
    publishPackageToGPR,
} = require('./_shared');

for ( const pkg of getAvailablePackages()) {
    if (isPackagePublished(pkg)) {
        continue;
    }
    installDependencies(pkg);
    publishPackageToGPR(pkg)
}
