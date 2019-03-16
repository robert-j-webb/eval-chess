import { Telnet } from 'telnet-rxjs';

async function run() {
  const client = Telnet.client('nethack.alt.org:23');

  let connected = false;

  client
    .filter(event => event instanceof Telnet.Event.Connected)
    .subscribe(event => {
      connected = true;
      client.sendln('GET /');
    });

  client.data.subscribe(data => {
    if (!connected) {
      return;
    }
    console.log(data);
  });

  client.connect();
}

export default run;
