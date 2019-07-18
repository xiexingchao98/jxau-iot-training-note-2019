const chars = '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=<>/?[]{}'
const reverseChars = Array.from(chars).reverse().toString()

module.exports = class extends think.Controller {
  // 上传文件成功后，返回仅供外部查看的虚拟文件名
  async uploadAction () {
    let file = this.file('file')
    let filepath = think.ROOT_PATH + '/www/static/upload/' + file.name
    think.mkdir(path.dirname(filepath))
    await rename(file.path, filepath)
    this.body = encrypt(file.name)    // 返回加密的文件名
  }
  async downloadAction () {
    // 获取真实文件名后，再跳转下载
    let filename = decrypt(this.ctx.param('f'))
    this.ctx.download(think.ROOT_PATH + '/www/static/upload/' + filename)
  }
}

function encrypt (filename)  {
  return convert(filename, chars, reverseChars)
}

function decrypt (filename) {
  return convert(filename, reverseChars, chars)
}

/*
 * 简单的字符串转换
 * 将输入串中的每一个 char 从 currentChars 转换成 targetChars 中对应的 char
 */
function convert(str, currentChars, targetChars) {
  let len = str.length
  let ret = ''
  for (let i = 0; i < len; ++i) {
    let ch = str.charAt(i)
    let index = currentChars.indexOf(ch)
    if (index != -1) {
      ch = targetChars.charAt(index)
    }
    ret += ch
  }
  return ret
}