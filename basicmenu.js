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
  document.addEventListener('DOMContentLoaded', function () {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            if (this.checked) {
                const imageId = this.value;
                fetchImage(imageId)
                    .then(function (imageUrl) {
                        displayImage(imageUrl);
                        setTimeout(function () {
                            removeImage();
                        }, 2000);
                    })
                    .catch(function (error) {
                        console.error('Error fetching image:', error);
                    });
            }
        });
    });

    function fetchImage(imageId) {
        return new Promise(function (resolve, reject) {
            const imageUrl = `https://th.bing.com/th/id/R.7ae27cbaf69bc9069ec3f2e7f88dc89f?rik=LscW4uL5tvj7tA&riu=http%3a%2f%2fwww.guttans.com%2fwp-content%2fuploads%2f2016%2f08%2fSambar-Kerala.jpg&ehk=Y1dqosyBzt%2fZNdUdvNxBRyeDK7QNwr7gaDpfw1U5by4%3d&risl=&pid=ImgRaw&r=0`;
            resolve(imageUrl);
        });
    }

    function displayImage(imageUrl) {
      const img = document.createElement('img');
      img.src = imageUrl;
      img.style.width = '150px'; 
      img.style.height = '150px'; 
      document.body.appendChild(img);
  }

    function removeImage() {
        const img = document.querySelector('img');
        if (img) {
            img.remove();
        }
    }
});
