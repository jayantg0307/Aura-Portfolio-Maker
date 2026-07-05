function selectTemplate(templateNumber) {
  // Save the chosen template so form.html can read it
  sessionStorage.setItem('aura_template', templateNumber);
  window.location.href = 'form.html';
}
