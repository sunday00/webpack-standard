const fs = require('fs');
const path = require('path');

function BuildHashedMenifestPlugin (options) {
    this.options = options;
}

BuildHashedMenifestPlugin.prototype.apply = function( compiler ){
    // compiler.plugin('emit', (compiler, callback) => {

    //     let stats = compiler.getStats();
    //     let source = JSON.stringify(stats.toJson().assetsByChunkName);
    //     let size = source.length;

    //     compiler.assets['manifest.json'] = {
    //        source: ()=> source,
    //         size: ()=>size,
    //     }

    //     callback();
    // });
    compiler.hooks.emit.tapAsync('BuildHashedMenifestPlugin', (compilation, callback) => {

        let stats = compilation.getStats();
        let source = JSON.stringify(stats.toJson().assetsByChunkName);
        let size = source.length;

        compilation.assets['manifest.json'] = {
           source: ()=> source,
            size: ()=>size,
        }

        callback();
    });
    // compiler.plugin('done', this.writeMenifest);
}

// BuildHashedMenifestPlugin.prototype.writeMenifest = function(stats){
//     fs.writeFileSync(
//         path.resolve("dist/manifest.json"),
//         JSON.stringify(stats.toJson().assetsByChunkName)
//     );
// }

module.exports = BuildHashedMenifestPlugin;