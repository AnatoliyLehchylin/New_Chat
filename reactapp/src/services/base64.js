const uint8Array = new Uint8Array(newPost.photoFile.data);

// Преобразование Uint8Array в строку Base64
// Преобразование Uint8Array в строку Base64
const base64String = btoa(String.fromCharCode.apply(null, uint8Array));
console.log('base64Str', base64String)

function isBase64(str) {
    try {
        // Проверяем, может ли строка быть успешно декодирована из Base64
        return btoa(atob(str)) === str;
    } catch (err) {
        return false;
    }
}

// Пример использования

if (isBase64(base64String)) {
    console.log('Это строка Base64');
} else {
    console.log('Это не строка Base64');
}

//--------------------------------------

if(newPost.photoFileUserPost) {
    const sizeInBytes = Math.ceil((newPost.photoFileUserPost.length * 6) / 8);
    const sizeInKB = sizeInBytes / 1024;
    console.log(`Размер Post файла в килобайтах: ${sizeInKB.toFixed(2)} KB`);
}
if(newPost.photoFileUser) {
    const sizeInBytesUser = Math.ceil((user.photoFileUser.length * 6) / 8);
    const sizeInKBUser = sizeInBytesUser / 1024;
    console.log(`Размер Avatar файла в килобайтах: ${sizeInKBUser.toFixed(2)} KB`);
}