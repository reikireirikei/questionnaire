//client process
const passwordHash = require('password-hash');
const form = document.getElementById('login-form');
const create = document.getElementById('register-form');

form.addEventListener('submit', e => {
    const choice =  document.querySelectorAll('input[name="loginname"]:checked');
    const username = choice[0];
    const password = passwordHash.generate(choice[1]);
    const data = { username: username, password: password };

    fetch('https://localhost:3000/login', {
      method: 'post',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
    e.preventDefault();
  });
create.addEventListener('submit', e => {
  const create = document.querySelectorAll('input[name="register"]:checked');
  const name = create[0];
  const newpasswd = passwordHash.generate(create[1]);
  const emAdd = create[2];
  const newdata = { name: name, newpasswd: newpasswd, emAdd: emAdd };

  fetch('https://localhost:3000/register', {
    method: 'post',
    body: JSON.stringify(newdata),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  })
    .then(res => res.json())
    .then(newdata => console.log(newdata))
    .catch(err => console.log(err));
  e.preventDefault();
});

fetch('http://localhost:3000/poll')
  .then(res => res.json())
  .then(data => {
    const votes = data.votes;
    const totalVotes = votes.length;

    //Count vote points - acc/current
    const voteCounts = votes.reduce(
      (acc, vote) =>(
        (acc[vote.os] = (acc[vote.os] || 0) + parseInt(vote.points)), acc
      ),
      {}
    );

    let dataPoints = [
      { label: 'Windows', y: voteCounts.Windows },
      { label: 'MacOS', y: voteCounts.MacOS },
      { label: 'Linux', y: voteCounts.Linux },
      { label: 'Other', y: voteCounts.Other },
    ];

    const chartContainer = document.querySelector('#chartContainer');

    //null?
    if (chartContainer) {
      const chart = new CanvasJS.Chart('chartContainer', {
        animationEnabled: true,
        theme: 'thema1',
        title: {
          text: 'Total Votes' + totalVotes,
        },
        data: [
          {
            type: 'column',
            dataPoints: dataPoints,
          },
        ],
      });
      chart.render();

      // Enable pusher logging - don't include this in production
      Pusher.logToConsole = true;

      var pusher = new Pusher('638143ec28e4652f3c49', {
        cluster: 'ap1',
        encrypted: true,
      });

      var channel = pusher.subscribe('os-poll');//channel-name define
      channel.bind('login', function (data) { //"os-vote" is event
        dataPoints = dataPoints.map(x => {
          if (x.label == data.os) {
            x.y += data.points;
            return x;
          } else {
            return x;
          }
        });
        chart.render();
      });

      //
    }
  });
