/* V2 card text is authored together with executable effects in catalog.js. */
(function(root){'use strict';const api={version:2,apply:D=>{if(D)D.cardCopyVersion=2;return D?.playerCards?.length||0;}};api.appliedCount=api.apply(root.BDData);root.BDCardCopy=api;if(typeof module!=='undefined')module.exports=api;})(typeof window==='undefined'?globalThis:window);
