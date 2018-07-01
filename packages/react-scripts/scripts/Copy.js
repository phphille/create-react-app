var fs = require('fs');
var path = require('path');
const paths = require('../config/paths');


async function ReadDir(path){
	return new Promise((resolve, reject) => {
		fs.readdir(path, (err, list) => {
			if (err) reject()
			resolve({'path': path, 'list': list})
		})
	})
}
async function Unlink(path){
	return new Promise((resolve, reject) => {
		CheckFileExists(path)
			.then(() => {
				fs.unlink(path, (err) => {
					resolve()
				})
			})
			.catch(() => resolve())
	})
}
async function Rmdir(path){
	return new Promise((resolve, reject) => {
		CheckDirExists(path)
			.then(() => {
				fs.remove(path, (err) => {
					if(err){
						throw err
					}
					resolve()
				})
			})
			.catch(() => resolve())
	})
}

async function CheckDirExists(path){
	return new Promise((resolve, reject) => {
		fs.readdir(path, (err, list) => {
			if (err) {
				return reject()
			}
			return resolve()
		})
	})
}

async function CheckFileExists(path){
	return new Promise((resolve, reject) => {
		if(fs.existsSync(path)){
			resolve()
		} else {
			reject()
		}
	})
}


function copyFileSync( source, target ) {

    var targetFile = target;

    //if target is a directory a new file with the same name will be created
    if ( fs.existsSync( target ) ) {
        if ( fs.lstatSync( target ).isDirectory() ) {
            targetFile = path.join( target, path.basename( source ) );
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
}


function copyFolderRecursiveSync( source, target ) {
    var files = [];

    //check if folder needs to be created or integrated
    var targetFolder = path.join( target, path.basename( source ) );
    if ( !fs.existsSync( targetFolder ) ) {
        fs.mkdirSync( targetFolder );
    }

    //copy
    if ( fs.lstatSync( source ).isDirectory() ) {
        files = fs.readdirSync( source );
        files.forEach( function ( file ) {
            var curSource = path.join( source, file );
            if ( fs.lstatSync( curSource ).isDirectory() ) {
                copyFolderRecursiveSync( curSource, targetFolder );
            } else {
                copyFileSync( curSource, targetFolder );
            }
        } );
    }
}



function DeleteFiles(startPath){
	let SubFolders = [];

	return new Promise((resolve1, reject1) => {
		function RunList({path, list}){
			// console.log('list', list);
			return new Promise((resolve2, reject2) => {
				let folders = [];
				// console.log('list', list);
				for (let i = 0; i < list.length; i++) {
					if(list[i].filename.indexOf('.') === -1){
						// console.log('found folder '+path + '/' +list[i].filename+', do check it out');
						SubFolders.push(path + '/' +list[i].filename);
						folders.push(
							new Promise((resolve3, reject3) => {
								ReadDir(path + '/' +list[i].filename)
									.then(res => RunList(res).then(() => {
										// console.log('resolve3', path + '/' +list[i].filename)
										resolve3()
									}))
									.catch(res => resolve3())
							})
						)
					}
					else {
						// console.log('found file '+path + '/' +list[i].filename+', remove it');
						Unlink(path + '/' +list[i].filename).then(() => true)
					}
				}

				// console.log('folders', folders);
				if(!folders.length){
					// console.log('resolve2', 'empty-folder')
					resolve2();
				}
				else {
					Promise.all(folders).then(() => {
						// console.log('resolve2', folders)
						resolve2();
					})
				}
			})
		}

		ReadDir(startPath)
			.then(res => RunList(res)
				.then(() => {
					let SubFolderPromises = [];
					SubFolders.sort((a, b) => {
						aSlashes = a.split('/').length;
						bSlashes = b.split('/').length;

						if ( bSlashes > aSlashes ) { return  1; }
				    if ( aSlashes > bSlashes ) { return -1; }
				    return 0;
					})
					.push(startPath)

					Promise.all(
						SubFolders.map(path => new Promise((res, rej) => Rmdir(path).then(() => res()) ))
					).then(() => resolve1())
				}))
			.catch(res => resolve1())

	});
}

DeleteFiles(paths.backendBuild )
  .then(() => copyFolderRecursiveSync(paths.appBuild, paths.backendPath))
