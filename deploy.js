const fs = require('fs-extra')

let deployFolder =
  'F:\\开发\\console-admin\\console-web\\src\\main\\resources\\static\\spa'
fs.remove(deployFolder)
  .then(() => {
    fs.copy('spa', deployFolder)
      .then(() => console.log('success!'))
      .catch(err => console.error(err))
  })
  .catch(err => {
    console.error(err)
  })
