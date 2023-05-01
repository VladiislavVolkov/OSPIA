export const readerFile = (image) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(image);
    fileReader.addEventListener('load', () => {
      resolve(fileReader.result);
    });
    fileReader.addEventListener('error', () => {
      reject(fileReader.error);
    });
  });
};
