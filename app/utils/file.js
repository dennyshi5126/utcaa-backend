import uuid from 'uuid';
import path from 'path';

const uploadToLocal = (files, targetPath) => {
  const uploadPromise = new Promise((resolve, reject) => {
    if (!files) {
      reject(Error('INVALID_INPUT'));
    } else {
      let filepathArray = [];
      const fileUploadPromises = [];

      for (let i = 0; i < files.length; i++) {
        const newName = `${uuid.v4()}${path.extname(files[i].name)}`;
        filepathArray.push(newName);
        fileUploadPromises.push(files[i].mv(targetPath + newName));
      }
      Promise.all(fileUploadPromises)
        .then(() => {
          resolve(filepathArray);
        })
        .catch(reject);
    }
  });
  return uploadPromise;
};

export default {
  uploadToLocal,
};
