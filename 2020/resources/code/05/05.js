"use strict";

function similarity(s1, s2) {
    let longer = s1;
    let shorter = s2;
    if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
    }
    let longerLength = longer.length;
    if (longerLength == 0) {
        return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
    let costs = new Array();
    for (let i = 0; i <= s1.length; i++) {
        let lastValue = i;
        for (let j = 0; j <= s2.length; j++) {
            if (i == 0)
                costs[j] = j;
            else {
                if (j > 0) {
                    let newValue = costs[j - 1];
                    if (s1.charAt(i - 1) != s2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue),
                            costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0)
            costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}

let websites = [
    {name: '8-tracks', url: 'https://8tracks.com'},
    {name: 'Google play', url: 'https://play.google.com/music/listen#/home'},
    {name: 'Soundcloud', url: 'https://soundcloud.com'},
    {name: 'Tidal', url: 'https://tidal.com'},
    {name: 'LiveXLive', url: 'https://www.livexlive.com'},
    {name: 'Pandora', url: 'https://www.siriusxm.ca/channels/pandora-now'},
    {name: 'Spotify', url: 'https://www.spotify.com/ca-en'},
    {name: 'Deezer', url: 'https://www.deezer.com/en'},
    {name: 'Apple Music', url: 'https://music.apple.com/us/browse'},
    {name: 'Last.fm', url: 'https://www.last.fm'},
    {name: 'Youtube', url: 'https://www.youtube.com'},
    {name: 'Xiami', url: 'https://www.xiami.com'},
    {name: 'QQ Music', url: 'https://y.qq.com'},
    {name: 'Gaana', url: 'https://gaana.com'},
    {name: 'Saavn', url: 'https://www.jiosaavn.com'},
    {name: 'Symfy', url: 'https://www.simfyafrica.com/za/Start/Index_Optout'},
    {name: 'Resonate', url: 'https://resonate.is'},
    {name: 'Potentiam', url: 'http://www.potentiam.io'},
    {name: 'Bitsong', url: 'https://bitsong.io'},
    {name: 'Reaper', url: 'https://www.reaper.fm'},
    {name: 'Ableton Live', url: 'https://www.ableton.com/en'},
    {name: 'GarageBand', url: 'https://www.apple.com/ca/mac/garageband'},
    {name: 'Cakewalk', url: 'http://www.cakewalk.com'},
    {name: 'Logic', url: 'https://www.apple.com/ca/logic-pro'},
    {name: 'Reason', url: 'https://www.reasonstudios.com/shop/product/reason-11'},
    {name: 'Pro Tools', url: 'https://www.avid.com/pro-tools'},
    {name: 'Audacity', url: 'https://www.audacityteam.org'},
    {name: 'Ardour', url: 'https://ardour.org'},
    {name: 'RoseGarden', url: 'https://www.rosegardenmusic.com'},
    {name: 'MuseScore', url: 'https://musescore.org/en'},
    {name: 'Lilypond', url: 'http://lilypond.org'},
    {name: 'Sibelius', url: 'https://www.avid.com/sibelius'},
    {name: 'Finale', url: 'https://www.finalemusic.com'},
    {name: 'Dorico', url: 'https://new.steinberg.net/dorico'},
    {name: 'Fender', url: 'https://shop.fender.com/en/intl/start'},
    {name: 'Gibson', url: 'https://www.gibson.com'},
    {name: 'Yamaha', url: 'https://ca.yamaha.com/en/products/musical_instruments/index.html'},
    {name: 'Parker', url: 'https://en.wikipedia.org/wiki/Parker_Guitars'},
    {name: 'Boesendorfer', url: 'https://www.boesendorfer.com/en'},
    {name: 'Steinway and sons', url: 'https://www.steinway.com'},
    {name: 'Strandberg', url: 'https://strandbergguitars.com'},
    {name: 'Steinberger', url: 'http://www.steinberger.com'},
    {name: 'Ibanez', url: 'https://www.ibanez.com'},
    {name: 'Theremin', url: 'https://en.wikipedia.org/wiki/Theremin'},
    {name: 'Crypt of the necrodancer', url: 'https://braceyourselfgames.com/crypt-of-the-necrodancer'},
    {name: 'Patapon', url: 'https://en.wikipedia.org/wiki/Patapon'},
    {name: 'Guitar hero', url: 'https://en.wikipedia.org/wiki/Guitar_Hero'},
    {name: 'Rock band', url: 'https://en.wikipedia.org/wiki/Rock_Band_(video_game)'},
    {name: 'Pump it up', url: 'https://en.wikipedia.org/wiki/Pump_It_Up_(video_game_series)'},
    {name: 'Dance Dance Revolution', url: 'https://en.wikipedia.org/wiki/Dance_Dance_Revolution'},
    {name: 'Do-Re-Myth', url: 'https://github.com/musicianship-game/ear-training'},
    {name: 'LANDR', url: 'https://www.landr.com'},
    {name: 'Bronze', url: 'https://bronze.ai'}
]

function runAfterLoadingPage() {
    let urlParameters = (new URL(document.location)).searchParams;
    if (urlParameters.has('q')) {
        // This is hiding the search form 
        // (because we know that the user is already searching for something)
        let searchForm = document.getElementById('theform');
        searchForm.hidden = true;
        // Displaying the results instead
        let query = urlParameters.get('q');
        let results = [];
        for (let i = 0; i < websites.length; i++) {
            websites[i].relevance = similarity(query, websites[i].name);
        }
        websites.sort(function (a, b) {
            if (a.relevance > b.relevance) return -1;
            if (b.relevance > a.relevance) return 1;
            return 0;
        });
        let resultsList = document.getElementById('results');
        websites.forEach(function(website) {
            let listItem = document.createElement('li');
            listItem.innerHTML = `<a href=${website.url}>${website.name}</a>`;
            resultsList.append(listItem);
        })
        document.getElementById('theresult').hidden = false;
        console.log(websites);
    }
}

window.onload = runAfterLoadingPage;