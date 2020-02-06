const {
    getModifiedPackages,
    isPackagePublished,
    installDependencies,
    publishPackageToGPR,
    executeCustomScript,
} = require('./_shared');

for ( const pkg of getModifiedPackages()) {
    console.log(`processing ${pkg.info.name}`)
    if (isPackagePublished(pkg)) {
        continue;
    }
    installDependencies(pkg);
    executeCustomScript(pkg, 'test');
    publishPackageToGPR(pkg);
}
