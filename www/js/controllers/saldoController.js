function SaldoController(drupalClient) {
	console.log('Creating SaldoController');

	var vm = this;

	vm._headers = {'Content-Type': 'application/json'};
	vm.saldo = "";


	drupalClient.makeAuthenticatedRequest(
		{
            httpMethod:'GET',
            servicePath:'saldo/88',
            contentType:'application/json'
        },
		function(data) {
			debugger;
			vm.saldo = data.total;
		},
		function() {},
		vm._headers);

	console.log('Created SaldoController');
}