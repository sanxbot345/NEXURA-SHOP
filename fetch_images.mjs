async function run() {
  const apps = ['com.activision.callofduty.shooter', 'com.riotgames.league.wildrift', 'com.roblox.client', 'com.supercell.brawlstars', 'com.supercell.clashofclans'];
  for(let id of apps) {
    let res = await fetch('https://play.google.com/store/apps/details?id='+id);
    let text = await res.text();
    let match = text.match(/https:\/\/play-lh\.googleusercontent\.com\/[a-zA-Z0-9_\-]+/g);
      if(match) {
        let uniq = Array.from(new Set(match));
        console.log(id);
        for(let i=0; i<5; i++) {
            console.log('  ' + uniq[i]);
        }
    } else {
        console.log(id + ' not found');
    }
  }
}
run();
