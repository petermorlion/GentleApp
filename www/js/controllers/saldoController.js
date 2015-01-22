function SaldoController(gentleSite) {
	var vm = this;

	vm.saldo = "";

	gentleSite.get('saldo/' + gentleSite.uid).then(function(data) {
		vm.saldo = data.total;
	});
}
