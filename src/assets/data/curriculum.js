// 年级和故事的JSON数据
export const curriculumData = [
  {
    id: 1,
    name: '一年级',
    description: '数字认知、简单加减法、基础图形',
    theme: '萌芽星云',
    modules: [
      {
        id: 'number-recognition',
        title: '数字认知',
        description: '认识0-20的数字，理解数的含义',
        status: 'available',
        icon: '🔢'
      },
      {
        id: 'addition-subtraction-within-10',
        title: '10以内加减法',
        description: '学习10以内的加法和减法运算',
        status: 'available',
        icon: '➕'
      },
      {
        id: 'simple-shapes',
        title: '简单图形',
        description: '认识圆形、正方形、三角形等基本图形',
        status: 'locked',
        icon: '⭕'
      }
    ]
  },
  {
    id: 2,
    name: '二年级',
    description: '进位加减法、乘法口诀、长度测量',
    theme: '工匠星座',
    modules: [
      {
        id: 'addition-subtraction-within-100',
        title: '100以内加减法',
        description: '掌握100以内的加减法运算，包括进退位',
        status: 'locked',
        icon: '➕'
      },
      {
        id: 'multiplication-tables',
        title: '乘法口诀',
        description: '学习并熟练掌握乘法口诀表',
        status: 'available',
        icon: '✖️'
      },
      {
        id: 'length-measurement',
        title: '长度测量',
        description: '学习使用尺子测量物体长度，理解长度单位',
        status: 'locked',
        icon: '📏'
      }
    ]
  },
  {
    id: 3,
    name: '三年级',
    description: '周长与面积、分数初识、时间概念',
    theme: '工匠星座',
    modules: [
      {
        id: 'perimeter-and-area',
        title: '周长与面积',
        description: '理解周长和面积的概念，学会计算方法',
        status: 'locked',
        icon: '📐'
      },
      {
        id: 'fraction-basics',
        title: '分数基础',
        description: '初步认识分数，理解分数的含义',
        status: 'locked',
        icon: '½'
      },
      {
        id: 'time-concept',
        title: '时间概念',
        description: '深入学习时间的读取和计算',
        status: 'locked',
        icon: '⏰'
      }
    ]
  },
  {
    id: 4,
    name: '四年级',
    description: '小数、因数与倍数、角度测量',
    theme: '逻辑旋臂',
    modules: [
      {
        id: 'decimals',
        title: '小数',
        description: '认识小数，学习小数的加减法',
        status: 'locked',
        icon: '🔢'
      },
      {
        id: 'factors-and-multiples',
        title: '因数与倍数',
        description: '理解因数和倍数的概念及其关系',
        status: 'locked',
        icon: '✖️'
      },
      {
        id: 'angles',
        title: '角度',
        description: '认识角的概念，学会测量角度',
        status: 'locked',
        icon: '📐'
      }
    ]
  },
  {
    id: 5,
    name: '五年级',
    description: '分数运算、体积概念、坐标系',
    theme: '逻辑旋臂',
    modules: [
      {
        id: 'fraction-operations',
        title: '分数运算',
        description: '掌握分数的加减乘除运算',
        status: 'locked',
        icon: '½'
      },
      {
        id: 'volume',
        title: '体积',
        description: '理解体积概念，学会计算常见立体图形的体积',
        status: 'locked',
        icon: '📦'
      },
      {
        id: 'coordinate-system',
        title: '坐标系',
        description: '学习平面直角坐标系，理解坐标概念',
        status: 'locked',
        icon: '📊'
      }
    ]
  },
  {
    id: 6,
    name: '六年级',
    description: '负数、比例、简易方程',
    theme: '逻辑旋臂',
    modules: [
      {
        id: 'negative-numbers',
        title: '负数',
        description: '认识负数，理解负数的意义和运算',
        status: 'locked',
        icon: '➖'
      },
      {
        id: 'ratios-and-proportions',
        title: '比例',
        description: '理解比例的概念，学会解比例问题',
        status: 'locked',
        icon: '➗'
      },
      {
        id: 'simple-equations',
        title: '简易方程',
        description: '学习用字母表示数，解简易方程',
        status: 'locked',
        icon: '🔢'
      }
    ]
  }
];

export default curriculumData;