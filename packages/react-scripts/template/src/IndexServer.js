import React from 'react'
import { renderToString } from 'react-dom/server'
import StaticRouter from 'react-router-dom/StaticRouter';

import App from './App'

export const GetHtml = function (data){
  let windowData = data;
  let dataObj = JSON.parse(data);
  const markup = renderToString(
    <StaticRouter location={'/'} context={{}}>
      <App data={dataObj} />
    </StaticRouter>
  )

  return `<script>var __initialData__ = ${windowData}</script>
  <div id="root">${markup}</div>`;

};
