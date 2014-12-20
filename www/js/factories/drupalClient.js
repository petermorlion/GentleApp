function DrupalClient() {
	var drupal = new Drupal();
	drupal.setRestPath('http://www.gentlesite.be/drupal/', 'api');
	return drupal;
}