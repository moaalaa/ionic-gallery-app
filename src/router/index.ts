import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Gallery from '../views/Gallery.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/gallery/lists'
	},
	{
		path: '/gallery/',
		component: Gallery,
		children: [
			{
				path: '',
				redirect: '/gallery/lists'
			},
			{
				path: 'lists',
				component: () => import('@/views/lists.vue')
			},
			{
				path: 'slides',
				component: () => import('@/views/slides.vue')
			},
		]
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
