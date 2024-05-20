document.getElementById('form2').addEventListener('change', function (e) {
  e.preventDefault();

  calculateTotalPrice().then(totalPrice => {
      const numberOfPeople = parseInt(document.getElementById('item10').value);
      document.getElementById('totalPrice').innerHTML = "Total price for "+ numberOfPeople + " people: "+ totalPrice;
  }).catch(error => {
    const numberOfPeople1 = parseInt(document.getElementById('item10').value);
    document.getElementById('totalPrice').innerHTML = "lakshya foodways will not cater to " + numberOfPeople1 + " people only. the number must be greater than 50";

  });
});

function calculateTotalPrice() {
  return new Promise((resolve, reject) => {
      let totalValue = 0;
      const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
      checkboxes.forEach(checkbox => {
          totalValue += parseInt(checkbox.value);
      });
      const numberOfPeople = parseInt(document.getElementById('item10').value);
      
      if (numberOfPeople>50) {
          const totalPrice = totalValue * numberOfPeople;
          resolve(totalPrice);
      } else {
        const  numberOfPeople1=numberOfPeople;
          reject(numberOfPeople1);
      }
  });
}
/*document.getElementById('btn').onclick = function() {
    var markedCheckboxes = document.getElementsByName('item');
    var total = 0;
    for (var checkbox of markedCheckboxes) {
      if (checkbox.checked) {
        total += parseInt(checkbox.value);
      }
    }
    alert('Total amount: ' + total);
  }*/
 /* document.addEventListener('DOMContentLoaded', function () {
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
});*/
