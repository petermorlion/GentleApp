function MessageService($rootScope) {
	var messageService = {
		message: '',
		broadcast: function(message) {
			this.message = message;
			$rootScope.$broadcast(message);
		}
	};

	return messageService;
}