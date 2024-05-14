document.getElementById('btn').onclick = function() {
    var markedCheckboxes = document.getElementsByName('item');
    var total = 0;
    for (var checkbox of markedCheckboxes) {
      if (checkbox.checked) {
        total += parseInt(checkbox.value);
      }
    }
    alert('Total amount: ' + total);
  }