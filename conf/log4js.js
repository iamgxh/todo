exports.init=function(app,log4js){
	log4js.configure({
		appenders:[
			{ type: 'console' },
			{
				type: 'dateFile',
				filename: LOG+"/access/",
				pattern: "yyyy-MM-dd.log",
				maxLogSize: 1024,
				alwaysIncludePattern: true,
				category: 'normal'
			}
		],
		replaceConsole: true
	});

	var logger = log4js.getLogger('normal');
	logger.setLevel('INFO');
	app.use(log4js.connectLogger(logger, {level:log4js.levels.INFO}));
	
	//全面变量
	initVar.logger=logger;
}