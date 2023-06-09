import Multer from 'multer';

export const upload = Multer({
  dest: 'uploads/',
});