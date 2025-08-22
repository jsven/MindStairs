import { createRouter, createWebHistory } from 'vue-router'

// Page Components
import Home from '../views/Home.vue'
import StarMap from '../views/StarMap.vue'
import ModuleLayout from '../views/ModuleLayout.vue'

// Module Components - Grade 1
import NumberRecognition from '../modules/grade-1/number-recognition/index.vue'
import AdditionSubtractionWithin10 from '../modules/grade-1/addition-subtraction-within-10/index.vue'
import SimpleShapes from '../modules/grade-1/simple-shapes/index.vue'
import GemstoneSorter from '../modules/grade-1/simple-shapes/gemstone-sorter/index.vue'
import OwlSchedule from '../modules/grade-1/simple-shapes/owl-schedule/index.vue'

// Module Components - Grade 2  
import AdditionSubtractionWithin100 from '../modules/grade-2/addition-subtraction-within-100/index.vue'
import MultiplicationTables from '../modules/grade-2/multiplication-tables/index.vue'
import MushroomMatrix from '../modules/grade-2/multiplication-tables/mushroom-matrix/index.vue'
import LengthMeasurement from '../modules/grade-2/length-measurement/index.vue'

// Module Components - Grade 3
import Time from '../modules/grade-3/time/index.vue'
import Perimeter from '../modules/grade-3-4/perimeter/index.vue'
import PerimeterFence from '../modules/grade-3-4/perimeter/perimeter-fence/index.vue'
import Area from '../modules/grade-3/area/index.vue'

// Module Components - Grade 4
import Decimals from '../modules/grade-4/decimals/index.vue'
import FactorsAndMultiples from '../modules/grade-4/factors-and-multiples/index.vue'
import Angles from '../modules/grade-4/angles/index.vue'

// Module Components - Grade 5
import FractionOperations from '../modules/grade-5/fraction-operations/index.vue'
import Volume from '../modules/grade-5/volume/index.vue'
import CoordinateSystem from '../modules/grade-5/coordinate-system/index.vue'

// Module Components - Grade 6
import NegativeNumbers from '../modules/grade-6/negative-numbers/index.vue'
import RatiosAndProportions from '../modules/grade-6/ratios-and-proportions/index.vue'
import SimpleEquations from '../modules/grade-6/simple-equations/index.vue'

// Module Components - Grade 7
import RationalNumbers from '../modules/grade-7/rational-numbers/index.vue'
import ThermoElevator from '../modules/grade-7/rational-numbers/thermo-elevator/index.vue'
import PolynomialAdditionSubtraction from '../modules/grade-7/polynomial-addition-subtraction/index.vue'
import LinearEquations from '../modules/grade-7/linear-equations/index.vue'
import EquationDecoder from '../modules/grade-7/linear-equations/equation-decoder/index.vue'
import ParallelLines from '../modules/grade-7/parallel-lines/index.vue'
import CityLightPaths from '../modules/grade-7/parallel-lines/city-light-paths/index.vue'
import GeometricLanguage from '../modules/grade-7/geometric-language/index.vue'
import ProofPuzzle from '../modules/grade-7/geometric-language/proof-puzzle/index.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'MindStairs - 思维阶梯' }
  },
  {
    path: '/starmap/:gradeId?',
    name: 'StarMap',
    component: StarMap,
    props: true,
    meta: { title: '知识星图' }
  },
  
  // Grade 1 Routes
  {
    path: '/grade-1',
    children: [
      {
        path: 'number-recognition',
        component: ModuleLayout,
        props: { moduleComponent: NumberRecognition },
        meta: { 
          title: '数字认知 - 一年级',
          grade: 1,
          moduleId: 'number-recognition',
          breadcrumb: ['一年级', '数字认知']
        }
      },
      {
        path: 'addition-subtraction-within-10',
        component: ModuleLayout,
        props: { moduleComponent: AdditionSubtractionWithin10 },
        meta: { 
          title: '10以内加减法 - 一年级',
          grade: 1,
          moduleId: 'addition-subtraction-within-10',
          breadcrumb: ['一年级', '10以内加减法']
        }
      },
      {
        path: 'simple-shapes',
        component: ModuleLayout,
        props: { moduleComponent: SimpleShapes },
        meta: { 
          title: '简单图形 - 一年级',
          grade: 1,
          moduleId: 'simple-shapes',
          breadcrumb: ['一年级', '简单图形']
        }
      },
      {
        path: 'simple-shapes/gemstone-sorter',
        component: ModuleLayout,
        props: { moduleComponent: GemstoneSorter },
        meta: { 
          title: '宝石分类箱 - 简单图形',
          grade: 1,
          moduleId: 'simple-shapes',
          subModuleId: 'gemstone-sorter',
          breadcrumb: ['一年级', '简单图形', '宝石分类箱']
        }
      },
      {
        path: 'simple-shapes/owl-schedule',
        component: ModuleLayout,
        props: { moduleComponent: OwlSchedule },
        meta: { 
          title: '猫头鹰的作息 - 简单图形',
          grade: 1,
          moduleId: 'simple-shapes',
          subModuleId: 'owl-schedule',
          breadcrumb: ['一年级', '简单图形', '猫头鹰的作息']
        }
      }
    ]
  },
  
  // Grade 2 Routes
  {
    path: '/grade-2',
    children: [
      {
        path: 'addition-subtraction-within-100',
        component: ModuleLayout,
        props: { moduleComponent: AdditionSubtractionWithin100 },
        meta: { 
          title: '100以内加减法 - 二年级',
          grade: 2,
          moduleId: 'addition-subtraction-within-100',
          breadcrumb: ['二年级', '100以内加减法']
        }
      },
      {
        path: 'multiplication-tables',
        component: ModuleLayout,
        props: { moduleComponent: MultiplicationTables },
        meta: { 
          title: '乘法口诀 - 二年级',
          grade: 2,
          moduleId: 'multiplication-tables',
          breadcrumb: ['二年级', '乘法口诀']
        }
      },
      {
        path: 'multiplication-tables/mushroom-matrix',
        component: ModuleLayout,
        props: { moduleComponent: MushroomMatrix },
        meta: { 
          title: '蘑菇矩阵 - 乘法口诀',
          grade: 2,
          moduleId: 'multiplication-tables',
          subModuleId: 'mushroom-matrix',
          breadcrumb: ['二年级', '乘法口诀', '蘑菇矩阵']
        }
      },
      {
        path: 'length-measurement',
        component: ModuleLayout,
        props: { moduleComponent: LengthMeasurement },
        meta: { 
          title: '长度测量 - 二年级',
          grade: 2,
          moduleId: 'length-measurement',
          breadcrumb: ['二年级', '长度测量']
        }
      }
    ]
  },
  
  // Grade 3 Routes
  {
    path: '/grade-3',
    children: [
      {
        path: 'time',
        component: ModuleLayout,
        props: { moduleComponent: Time },
        meta: { 
          title: '时分秒 - 三年级',
          grade: 3,
          moduleId: 'time',
          breadcrumb: ['三年级', '时分秒']
        }
      },
      {
        path: 'perimeter',
        component: ModuleLayout,
        props: { moduleComponent: Perimeter },
        meta: { 
          title: '周长 - 三年级',
          grade: 3,
          moduleId: 'perimeter',
          breadcrumb: ['三年级', '周长']
        }
      },
      {
        path: 'perimeter/perimeter-fence',
        component: ModuleLayout,
        props: { moduleComponent: PerimeterFence },
        meta: { 
          title: '围栏围圈 - 周长',
          grade: 3,
          moduleId: 'perimeter',
          subModuleId: 'perimeter-fence',
          breadcrumb: ['三年级', '周长', '围栏围圈']
        }
      },
      {
        path: 'area',
        component: ModuleLayout,
        props: { moduleComponent: Area },
        meta: { 
          title: '面积 - 三年级',
          grade: 3,
          moduleId: 'area',
          breadcrumb: ['三年级', '面积']
        }
      }
    ]
  },
  
  // Grade 4 Routes
  {
    path: '/grade-4',
    children: [
      {
        path: 'decimals',
        component: ModuleLayout,
        props: { moduleComponent: Decimals },
        meta: { 
          title: '小数 - 四年级',
          grade: 4,
          moduleId: 'decimals',
          breadcrumb: ['四年级', '小数']
        }
      },
      {
        path: 'factors-and-multiples',
        component: ModuleLayout,
        props: { moduleComponent: FactorsAndMultiples },
        meta: { 
          title: '因数与倍数 - 四年级',
          grade: 4,
          moduleId: 'factors-and-multiples',
          breadcrumb: ['四年级', '因数与倍数']
        }
      },
      {
        path: 'angles',
        component: ModuleLayout,
        props: { moduleComponent: Angles },
        meta: { 
          title: '角度 - 四年级',
          grade: 4,
          moduleId: 'angles',
          breadcrumb: ['四年级', '角度']
        }
      }
    ]
  },
  
  // Grade 5 Routes
  {
    path: '/grade-5',
    children: [
      {
        path: 'fraction-operations',
        component: ModuleLayout,
        props: { moduleComponent: FractionOperations },
        meta: { 
          title: '分数运算 - 五年级',
          grade: 5,
          moduleId: 'fraction-operations',
          breadcrumb: ['五年级', '分数运算']
        }
      },
      {
        path: 'volume',
        component: ModuleLayout,
        props: { moduleComponent: Volume },
        meta: { 
          title: '体积 - 五年级',
          grade: 5,
          moduleId: 'volume',
          breadcrumb: ['五年级', '体积']
        }
      },
      {
        path: 'coordinate-system',
        component: ModuleLayout,
        props: { moduleComponent: CoordinateSystem },
        meta: { 
          title: '坐标系 - 五年级',
          grade: 5,
          moduleId: 'coordinate-system',
          breadcrumb: ['五年级', '坐标系']
        }
      }
    ]
  },
  
  // Grade 6 Routes
  {
    path: '/grade-6',
    children: [
      {
        path: 'negative-numbers',
        component: ModuleLayout,
        props: { moduleComponent: NegativeNumbers },
        meta: { 
          title: '负数 - 六年级',
          grade: 6,
          moduleId: 'negative-numbers',
          breadcrumb: ['六年级', '负数']
        }
      },
      {
        path: 'ratios-and-proportions',
        component: ModuleLayout,
        props: { moduleComponent: RatiosAndProportions },
        meta: { 
          title: '比例 - 六年级',
          grade: 6,
          moduleId: 'ratios-and-proportions',
          breadcrumb: ['六年级', '比例']
        }
      },
      {
        path: 'simple-equations',
        component: ModuleLayout,
        props: { moduleComponent: SimpleEquations },
        meta: { 
          title: '简易方程 - 六年级',
          grade: 6,
          moduleId: 'simple-equations',
          breadcrumb: ['六年级', '简易方程']
        }
      }
    ]
  },
  
  // Grade 7 Routes
  {
    path: '/grade-7',
    children: [
      {
        path: 'rational-numbers',
        component: ModuleLayout,
        props: { moduleComponent: RationalNumbers },
        meta: { 
          title: '有理数 - 七年级',
          grade: 7,
          moduleId: 'rational-numbers',
          breadcrumb: ['七年级', '有理数']
        }
      },
      {
        path: 'rational-numbers/thermo-elevator',
        component: ModuleLayout,
        props: { moduleComponent: ThermoElevator },
        meta: { 
          title: '温度电梯 - 有理数',
          grade: 7,
          moduleId: 'rational-numbers',
          subModuleId: 'thermo-elevator',
          breadcrumb: ['七年级', '有理数', '温度电梯']
        }
      },
      {
        path: 'polynomial-addition-subtraction',
        component: ModuleLayout,
        props: { moduleComponent: PolynomialAdditionSubtraction },
        meta: { 
          title: '整式加减 - 七年级',
          grade: 7,
          moduleId: 'polynomial-addition-subtraction',
          breadcrumb: ['七年级', '整式加减']
        }
      },
      {
        path: 'linear-equations',
        component: ModuleLayout,
        props: { moduleComponent: LinearEquations },
        meta: { 
          title: '一元一次方程 - 七年级',
          grade: 7,
          moduleId: 'linear-equations',
          breadcrumb: ['七年级', '一元一次方程']
        }
      },
      {
        path: 'linear-equations/equation-decoder',
        component: ModuleLayout,
        props: { moduleComponent: EquationDecoder },
        meta: { 
          title: '方程解码器 - 一元一次方程',
          grade: 7,
          moduleId: 'linear-equations',
          subModuleId: 'equation-decoder',
          breadcrumb: ['七年级', '一元一次方程', '方程解码器']
        }
      },
      {
        path: 'parallel-lines',
        component: ModuleLayout,
        props: { moduleComponent: ParallelLines },
        meta: { 
          title: '相交线与平行线 - 七年级',
          grade: 7,
          moduleId: 'parallel-lines',
          breadcrumb: ['七年级', '相交线与平行线']
        }
      },
      {
        path: 'parallel-lines/city-light-paths',
        component: ModuleLayout,
        props: { moduleComponent: CityLightPaths },
        meta: { 
          title: '城市光路 - 相交线与平行线',
          grade: 7,
          moduleId: 'parallel-lines',
          subModuleId: 'city-light-paths',
          breadcrumb: ['七年级', '相交线与平行线', '城市光路']
        }
      },
      {
        path: 'geometric-language',
        component: ModuleLayout,
        props: { moduleComponent: GeometricLanguage },
        meta: { 
          title: '几何语言 - 七年级',
          grade: 7,
          moduleId: 'geometric-language',
          breadcrumb: ['七年级', '几何语言']
        }
      },
      {
        path: 'geometric-language/proof-puzzle',
        component: ModuleLayout,
        props: { moduleComponent: ProofPuzzle },
        meta: { 
          title: '证明拼图 - 几何语言',
          grade: 7,
          moduleId: 'geometric-language',
          subModuleId: 'proof-puzzle',
          breadcrumb: ['七年级', '几何语言', '证明拼图']
        }
      }
    ]
  },
  
  // 404 Route
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Navigation guard to set page titles
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router