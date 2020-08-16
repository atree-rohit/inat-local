import Home from './components/Home';
import Upload from './components/Upload';

import NotFound from './components/NotFound';

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
