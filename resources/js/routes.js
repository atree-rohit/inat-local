import Home from './components/Home';
import NotFound from './components/NotFound';

let Upload = () => import('./components/Upload');

export default {
	mode:'history',
	linkActiveClass: 'font-bold',
	routes: [
		{
			path: '*',
			component: NotFound
		}, {
			path: '/',
			component: Home
		}, {
			path: '/upload',
			component: Upload
		}
	]
};
