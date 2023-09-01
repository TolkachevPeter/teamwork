import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import store from './src/store';
import { RouterProvider } from 'react-router-dom';
import { routerPaths } from '@/routes/paths';

export const render = (url: string) => {
	return renderToString(
		<React.Suspense fallback="Loading...">
			<StaticRouter location={url}>
				<Provider store={store}>
					<RouterProvider router={routerPaths}/>
				</Provider>
			</StaticRouter>
		</React.Suspense>,
	);
};