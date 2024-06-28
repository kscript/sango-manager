import { ref } from 'vue'

export const tools = ref([
  {
    name: 'shp',
    text: 'shp文件解析',
    path: '/shp',
    content: '在三国群英传里, shp文件其实就是图片文件, 解析shp文件后, 会返回一个json对象, 包含图片的尺寸和偏移量, 并提供一个可以临时访问的图片路径.',
    code: `
    import { parseShp } from '@/utils/shp'
    const shp = parseIni(arrayBuffer)
    console.log(shp)
    `,
    desc: 'parseShp不依赖任何第三方模块, 可以直接移植到其他项目中使用'
  },
  {
    name: 'ini',
    text: 'ini文件解析',
    path: '/ini',
    content: 'ini文件是配置文件, 三国群英传繁体中文版用的是big5编码. 解析ini文件时, 默认会进行转码, 并返回一个json对象.',
    code: `
    import { parseIni } from '@/utils/ini'
    const ini = parseIni(arrayBuffer)
    console.log(ini)
    `,
    desc: 'parseIni依赖iconv-lite模块, 移植到其他项目中需要安装iconv-lite. 如果用的不是繁体中文版, 那么ini文件可能不是big5编码, parseIn支持传入第二个参数 options, 可以根据实际情况, 传入 { encoding: \'utf-8\' } 或者其它编码'
  }
])
