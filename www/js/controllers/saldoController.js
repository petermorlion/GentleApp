function SaldoController(drupalClient, $scope) {
	console.log('Creating SaldoController');

	var vm = this;

	vm._headers = {'Content-Type': 'application/json'};
	vm.saldo = "";
	vm._scope = $scope;

	drupalClient.makeAuthenticatedRequest(
		{
            httpMethod:'GET',
            servicePath:'saldo/88',
            contentType:'application/json'
        },
		function(data) {
			vm.saldo = data.total;
			$scope.$apply();
		},
		function() {
			//TODO: handle error
		},
		vm._headers);

	console.log('Created SaldoController');
}