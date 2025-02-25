//diagramme en batons
const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'],
      datasets: [{
        label: 'nombre de visiteurs',
        data: [12, 19, 5, 20, 10, 30, 12],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });



//diagramme en "toile"
const ctx2 = document.getElementById('myChart2');

    new Chart(ctx2, {
        type : 'line',
        data : {labels: [10, 11, 12, 13,14, 15, 16, 17, 18],
        datasets: [{
          label: 'nombre de visiteurs',
          data: [12, 19, 5, 20, 10, 30,12, 19, 5, 20 ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
            }
        });


// diagramme en pie chart
const ctx3 = document.getElementById('myChart3');

new Chart(ctx3, {
    type : 'pie',
    data : {labels: ['Plein tarif', 'Enfant -16 ans', 'Jeune -26 ans', 'Sénior +65 ans'],
    datasets: [{
      label: 'nombre de visiteurs',
      data: [12,19,30,12],
      borderWidth: 1
    }]
  },
  
    });


// diagramme en baton horizontale 
const ctx4 = document.getElementById('myChart4');

new Chart(ctx4, {
    type : 'bar',
    data : {labels: [1,2, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [{
      label: 'nombre de places par réservation',
      data: [12,19,30,12, 19, 5, 20, 10, 30, 12],
      borderWidth: 1
    }]
  },
  
    });

