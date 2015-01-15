describe('A GentleSite, when creating', function() {
  var gentleSite, drupalClient = null;

  beforeEach(function() {
    drupalClient = {
      systemConnect: function() {
      }
    };

    spyOn(drupalClient, 'systemConnect');

    gentleSite = new GentleSite(drupalClient);
  });

  it('should call the drupalClient', function() {
    expect(drupalClient.systemConnect).toHaveBeenCalledWith(
      jasmine.any(Function),
      jasmine.any(Function),
      jasmine.objectContaining({'Content-Type': 'application/json'}));
  });
});
