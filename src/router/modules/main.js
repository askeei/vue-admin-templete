/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const mainRouter = {
  path: '/main',
  component: Layout,
  redirect: '/main/layer',
  name: 'Main',
  meta: {
    title: 'main',
    icon: 'chart'
  },
  children: [
    {
      path: 'layer',
      component: () => import('@/views/contents/main'),
      name: 'Layer',
      meta: { title: 'layer', noCache: true }
    }
  ]
}

export default mainRouter
